#! /bin/bash -e
cp ../scripts/install-dynamodb-local.sh .
cp ../scripts/entry.sh .

if [[ ! -f "Dockerfile" ]]; then
  cp ../scripts/Dockerfile .
  cp ../scripts/docker-compose.yml .
fi

project="${PWD##*/}"
if [[ "$project" == "fastify3" || "$project" == "koa" || "$project" == "express" ]]; then
  cp ../scripts/Dockerfile-screener .
fi
