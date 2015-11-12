cd ~/repos/fora-template-hitchslap/node_modules/isotropy/node_modules/isotropy-router/ && ./build.sh &
cd ~/repos/fora-template-hitchslap/node_modules/isotropy && ./build.sh &
cd ~/repos/fora-template-hitchslap && ./build.sh &
wait
npm start
