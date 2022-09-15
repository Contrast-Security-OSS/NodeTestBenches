#!/usr/bin/env bash

set -e

cp ../scripts/install-dynamodb-local.sh .
cp ../scripts/entry.sh .

if [[ ! -f "Dockerfile" ]]; then
  cp ../scripts/Dockerfile .
  cp ../scripts/docker-compose.yml .
fi

project="${PWD##*/}"
if [[ "$project" == "fastify" || "$project" == "koa" || "$project" == "express" || "$project" == "hapi18" || "$project" == "hapi19" || "$project" == "hapi20" ]]; then
  cp ../scripts/Dockerfile-screener .
fi
