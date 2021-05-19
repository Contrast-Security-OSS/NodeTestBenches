#!/usr/bin/env bash

FOLDERS=("public" "routes" "uploads" "utils" "view")

cp -nl ../fastify/server.js .

for folder in "${FOLDERS[@]}"; do
  cp -anl "$(realpath "../fastify/$folder")" .
done
