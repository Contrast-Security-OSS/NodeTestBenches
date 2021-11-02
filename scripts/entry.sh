#! /bin/bash -e

PSQL_USER=${PSQL_USER:-"postgres"}
PSQL_DATABASE=${PSQL_DATABASE:-"testdb"}
PSQL_PASSWORD=${PSQL_PASSWORD:-"password"}

service postgresql start
pg_lsclusters
if [ "${PSQL_USER}" != "postgres" ]; then
  sudo -u postgres psql createuser "${PSQL_USER}"
fi
sudo -u postgres psql -U postgres -d postgres -c "alter user \"${PSQL_USER}\" with password '\"${PSQL_PASSWORD}\"';"
sudo -u postgres createdb "${PSQL_DATABASE}"

if [[ -f "/opt/contrast/node-agent.tgz" ]];
then
  npm config set offline

  # agent from mounted volume
  pushd /opt/contrast && tar xzf ./node-agent.tgz && popd
  node --version

  # precompile code using the standalone rewriter
  if [ "$PRECOMPILE" = true ] ; then
    echo "Run npm install"
    npm install /opt/contrast/node-agent.tgz --verbose

    echo "Run npx contrast-transpile"
    DEBUG="contrast:*" npx contrast-transpile server.js
  fi

  # agent configuration from mounted volume or env vars
  HOST=0.0.0.0 node -r /opt/contrast/package/bootstrap .
else
  # 2: agent-less
  echo "Running app in agent-less mode"
  HOST=0.0.0.0 node .
fi
