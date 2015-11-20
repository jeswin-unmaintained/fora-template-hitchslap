help() {
    echo "Run Fora Template Application
        options:
        -h, --help              show brief help
        -p, --port=PORT         Run the server at a specific port
        -d, --debug             Start debugger
        --no-build              Do not build the app. Just run or debug.
        --no-run                Do not run the app.
        --build-dep             Build child modules. Useful when modules are being developed together.
        --no-source-maps        Do not make source maps
        --dep-status            Check git status of dependencies"
}

if [ "$(whoami)" == "root" ]; then
	echo "Running as root is a bad idea. Anyway, not stopping you."
fi

port=1950
run=true
debug=false
build=true
build_dep=false
dep_status=false
source_maps=true

while :
do
    case $1 in
        -h | --help | -\?)
            help
            exit 0      # This is not an error, User asked help. Don't do "exit 1"
            ;;
        -p | --port)
            port=$2
            shift 2
            ;;
        -d | --debug)
            debug=true
            shift
            ;;
        --no-build)
            build=false
            shift
            ;;
        --no-run)
            run=false
            shift
            ;;
        --build-dep)
            build_dep=true;
            shift
            ;;
        --no-source-maps)
            source_maps=false;
            shift
            ;;
        --dep-status)
            dep_status=true
            run=false
            build=false
            shift
            ;;
        -*)
            echo "WARN: Unknown option (ignored): $1" >&2
            shift
            ;;
        *)  # no more options. Stop while loop
            break
            ;;
    esac
done

external_depdencies=(
    "isotropy;node_modules"
    "isotropy-mount;node_modules/isotropy/node_modules"
    "isotropy-router;node_modules/isotropy/node_modules"
    "isotropy-static;node_modules/isotropy/node_modules"
)

dep_status_check() {
    for strdep in "${external_depdencies[@]}"
    do
        IFS=';' read -a LOCATION <<< "${strdep}"
        proj=${LOCATION[0]}
        basedir=${LOCATION[1]}
        curdir=`pwd`
        echo checking ------- $basedir/$proj
        cd $basedir/$proj
        git status
        cd $curdir
    done
}

build_dep() {
    for strdep in "${external_depdencies[@]}"
    do
        IFS=';' read -a LOCATION <<< "${strdep}"
        proj=${LOCATION[0]}
        basedir=${LOCATION[1]}
        if [ -f $basedir/$proj/build.sh ]; then
            curdir=`pwd`
            cd $basedir/$proj
            if $source_maps ; then
                ./build.sh --source-maps inline &
            else
                ./build.sh &
            fi
            cd $curdir
        fi
    done
    if $source_maps ; then
        ./build.sh --source-maps inline &
    else
        ./build.sh &
    fi
    wait
}

run() {
    if $debug ; then
        npm run-script debug $port
    else
        npm start $port
    fi
}

if $dep_status ; then
    dep_status_check
fi

if $build ; then
    build_dep
fi

if $run ; then
    run
fi
