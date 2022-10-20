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
echo "Starting MySQL"
MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-"password"}
MYSQL_DATABASE=${MYSQL_DATABASE:-"testdb"}
/etc/init.d/mariadb start

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

export SCREENER_APP_PATH=/app/server.js
export SCREENER_APP_NAME=hapi20

# run screener from mount
/mnt/test/integration/screener/run.sh
