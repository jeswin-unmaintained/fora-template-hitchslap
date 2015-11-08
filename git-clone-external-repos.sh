echo Fetching dev repos related to Fora

runtask() {
    curdir=`pwd`
    proj=$1
    basedir=$2
    if [ ! -d $basedir/$proj/.git ]; then
        echo cloning $basedir/$proj
        echo ----------------------
        rm -rf $basedir/$proj
        git clone https://github.com/jeswin/$proj $basedir/$proj
        cd $basedir/$proj
        npm install
        ./build.sh
        cd $curdir
    else
        echo $basedir/$proj is already a git repo
    fi
}

echo =========
echo Git Clone
echo =========

runtask "isotropy" "node_modules"

runtask "isotropy-router" "node_modules/isotropy/node_modules"
