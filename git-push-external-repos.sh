#This checks if there are uncommitted files in any of the projects associated with fora

runtask() {
    curdir=`pwd`
    proj=$1
    basedir=$2
    echo checking $basedir/$proj
    echo ----------------------
    cd $basedir/$proj
    git push origin master
    cd $curdir
    echo
}

echo ========
echo Git Push
echo ========

runtask "isotropy" "node_modules"

runtask "isotropy-router" "node_modules/isotropy/node_modules"
