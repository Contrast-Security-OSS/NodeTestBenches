#! /bin/bash -e
cp ../scripts/entry.sh .

if [[ ! -f "Dockerfile" ]];
then
    cp ../scripts/Dockerfile .
fi

folders=("public" "routes" "uploads" "utils" "view");
if [[ ${PWD##*/} == "fastify3" ]];
then
    cp ../fastify/server.js .
    for folder in "${folders[@]}"; do
    cp -R -n ../fastify/$folder . 
    done
fi