#! /bin/bash -e
folders=("public" "routes" "uploads" "utils" "view");
cp ../fastify/server.js .
for folder in "${folders[@]}"; do
   cp -R -n ../fastify/$folder . 
done