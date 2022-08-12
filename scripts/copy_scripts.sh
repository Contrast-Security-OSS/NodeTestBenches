#! /bin/bash -e
cp ../scripts/install-dynamodb-local.sh .
cp ../scripts/entry.sh .

if [[ ! -f "Dockerfile" ]]; then
  cp ../scripts/Dockerfile .
  cp ../scripts/docker-compose.yml .
fi

folders=("public" "routes" "uploads" "utils" "view")
if [[ ${PWD##*/} == "fastify3" ]]; then
  cp ../fastify/server.js .
  for folder in "${folders[@]}"; do
    cp -R -n "../fastify/$folder" .
  done
fi

if [[ ${PWD##*/} == "fastify3" ]] || [[ ${PWD##*/} == "koa" ]] || [[ ${PWD##*/} == "express" ]]; then
  cp ../scripts/Dockerfile-screener .
fi
