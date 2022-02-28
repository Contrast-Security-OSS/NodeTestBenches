#!/usr/bin/env bash
set -e
set -x

[ "${DYNAMODB_HOME}" = "" ] && DYNAMODB_HOME=/opt/dynamodb
DYNAMODB_FILE=dynamodb_local_latest.tar.gz
DYNAMODB_URL=http://dynamodb-local.s3-website-us-west-2.amazonaws.com/${DYNAMODB_FILE}
DYNAMODB_JAR=DynamoDBLocal.jar
DYNAMODB_LOG=/var/log/dynamodb.log

mkdir -p ${DYNAMODB_HOME}
pushd ${DYNAMODB_HOME}

curl -L -s ${DYNAMODB_URL} -o ${DYNAMODB_FILE}
tar xzf ${DYNAMODB_FILE}
ls
