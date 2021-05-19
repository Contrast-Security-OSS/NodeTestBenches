#!/usr/bin/env bash
cp ../scripts/entry.sh .

if [[ ! -f "Dockerfile" ]]; then
  cp ../scripts/Dockerfile .
  cp ../scripts/docker-compose.yml .
fi

if [[ ${PWD##*/} == "fastify3" ]]; then
  FOLDERS=("public" "routes" "uploads" "utils" "view")
  cp ../fastify/server.js .
  for folder in "${FOLDERS[@]}"; do
    cp -R -n "../fastify/$folder" .
  done
fi
