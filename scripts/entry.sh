#! /bin/bash -e

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
/etc/init.d/mysql start
MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-"password"}
mysql -e "UPDATE mysql.user SET Password = PASSWORD('${MYSQL_ROOT_PASSWORD}') WHERE User = 'root'"
mysql -e "FLUSH PRIVILEGES"
echo -e "\ny\ny\n${MYSQL_ROOT_PASSWORD}\${MYSQL_ROOT_PASSWORD}\ny\ny\ny\ny" | mysql_secure_installation

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
