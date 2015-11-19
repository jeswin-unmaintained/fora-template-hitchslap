help() {
    echo "Run Fora Template Application
        options:
        -h, --help              show brief help
        -p, --port=PORT         Run the server at a specific port
        -d, --debug             Start debugger
        --no-build              Do not build the app. Just run or debug.
        --no-run              Do not run the app.
        --build-dep             Build child modules. Useful when modules are being developed together.
        --dep-status            Check git status of dependencies"
}

if [ "$(whoami)" == "root" ]; then
	echo "Running as root is a bad idea. Anyway, not stopping you."
fi

port=3000
run=true
debug=false
build=true
build_dep=false
dep_status=false

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

dep_status_check() {
    curdir=`pwd`
    proj=$1
    basedir=$2
    echo checking ------- $basedir/$proj
    cd $basedir/$proj
    git status
    cd $curdir
    echo
}

if $dep_status ; then
    dep_status_check "isotropy" "node_modules"
    dep_status_check "isotropy-mount" "node_modules/isotropy/node_modules"
    dep_status_check "isotropy-router" "node_modules/isotropy/node_modules"
    dep_status_check "isotropy-static" "node_modules/isotropy/node_modules"
    exit 0
fi

if $build ; then
    if $build_dep ; then
        curdir=`pwd`
        cd node_modules/isotropy/node_modules/isotropy-mount/ && ./build.sh --source-maps inline &
        cd $curdir
        cd node_modules/isotropy/node_modules/isotropy-router/ && ./build.sh --source-maps inline &
        cd $curdir
        cd node_modules/isotropy/node_modules/isotropy-static/ && ./build.sh --source-maps inline &
        cd $curdir
        cd node_modules/isotropy && ./build.sh --source-maps inline &
        cd $curdir
    fi
    if $debug ; then
        ./build.sh --source-maps inline &
    else
        ./build.sh &
    fi
    wait
fi

if $run ; then
    if $debug ; then
        npm run-script debug $port
    else
        npm start $port
    fi
fi
