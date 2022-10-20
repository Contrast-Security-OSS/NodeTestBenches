#!/usr/bin/env bash

set -e

# Run PostgreSQL
PGUSER=${PGUSER:-"postgres"}
PGDATABASE=${PGDATABASE:-"testdb"}
PGPASSWORD=${PGPASSWORD:-"password"}

service postgresql start
pg_lsclusters
if [ "${PGUSER}" != "postgres" ]; then
  sudo -u postgres psql createuser "${PGUSER}"
fi
sudo -u postgres psql -U postgres -d postgres -c "alter user ${PGUSER} with password '${PGPASSWORD}';"
sudo -u postgres createdb "${PGDATABASE}"

# Run RethinkDB
rethinkdb --daemon

# Run MySQL (MariaDB)
/etc/init.d/mariadb start
MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-"password"}
MYSQL_DATABASE=${MYSQL_DATABASE:-"testdb"}
mysql --version
mysql -e "SET password for 'root'@'localhost' = PASSWORD('${MYSQL_ROOT_PASSWORD}');"
mysql -uroot -e "drop database if exists $MYSQL_DATABASE"
mysql -uroot -e "create database $MYSQL_DATABASE"
mysql -e "FLUSH PRIVILEGES"

# Run DynamoDB
DYNAMODB_HOME="${DYNAMODB_HOME:=/opt/dynamodb}"
DYNAMODB_LOG=/var/log/dynamodb.log
echo '=========================' >> "${DYNAMODB_LOG}"
date >> "${DYNAMODB_LOG}"
java -Djava.library.path="./${DYNAMODB_HOME}/DynamoDBLocal_lib" -jar "${DYNAMODB_HOME}/DynamoDBLocal.jar" -sharedDb >> "${DYNAMODB_LOG}" &

LOCAL_UTILS=contrast-test-bench-utils-*.tgz
files=( $LOCAL_UTILS )
if compgen -G "$LOCAL_UTILS" > /dev/null; then
  npm install "$files" --verbose
fi

if [[ -f "/opt/contrast/node-agent.tgz" ]];
then
  npm config set offline

  # agent from mounted volume
  pushd /opt/contrast && tar xzf ./node-agent.tgz && popd
  node --version

  # precompile code using the standalone rewriter
  if [ "$PRECOMPILE" = true ] ; then
    ENTRYPOINT=${ENTRYPOINT:-"index.js"}
    echo "Run npm install"
    npm install /opt/contrast/node-agent.tgz --verbose

    echo "Run npx contrast-transpile"
    DEBUG="contrast:*" npx contrast-transpile ${ENTRYPOINT}
  fi

  # agent configuration from mounted volume or env vars
  HOST=0.0.0.0 node -r /opt/contrast/package/bootstrap .
elif [[ -f "/opt/contrast/node-agent-v5.tgz" ]];
then
  # agent from mounted volume
  pushd /opt/contrast && tar xzf ./node-agent-v5.tgz && popd
  node --version

  # agent configuration from mounted volume or env vars
  HOST=0.0.0.0 node -r /opt/contrast/package/protect-agent .
else
  # 2: agent-less
  echo "Running app in agent-less mode"
  HOST=0.0.0.0 node .
fi
