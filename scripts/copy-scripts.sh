#!/usr/bin/env bash

set -e

cp ../scripts/install-dynamodb-local.sh .
cp ../scripts/entry.sh .

if [[ ! -f "Dockerfile" ]]; then
  cp ../scripts/Dockerfile .
  cp ../scripts/docker-compose.yml .
fi

project="${PWD##*/}"
if [[ "$project" == "fastify3" || "$project" == "fastify4" || "$project" == "koa" || "$project" == "express4" || "$project" == "express5" || "$project" == "hapi20" || "$project" == "hapi21" ]]; then
  cp ../scripts/Dockerfile-screener .
fi
