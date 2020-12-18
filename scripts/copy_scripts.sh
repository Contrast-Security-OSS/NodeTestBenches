#! /bin/bash -e
cp ../scripts/entry.sh .

if [[ ! -f "Dockerfile" ]];
then
    cp ../scripts/Dockerfile .
fi