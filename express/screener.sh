#! /bin/bash -e

# Run MongoDB
mkdir -p ~/log
sudo mongod --fork --logpath ~/log/mongodb.log --dbpath /var/lib/mongodb

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
service mysql start

mysql --version
mysql -uroot -ppassword -e "drop database if exists $MYSQL_DATABASE"
mysql -uroot -ppassword -e "create database $MYSQL_DATABASE"
mysql -uroot -ppassword -e "FLUSH PRIVILEGES"
export MSSQL_USER=root

# Run DynamoDB
DYNAMODB_HOME="${DYNAMODB_HOME:=/opt/dynamodb}"
DYNAMODB_LOG=/var/log/dynamodb.log
echo '=========================' >> "${DYNAMODB_LOG}"
date >> "${DYNAMODB_LOG}"
java -Djava.library.path="./${DYNAMODB_HOME}/DynamoDBLocal_lib" -jar "${DYNAMODB_HOME}/DynamoDBLocal.jar" -sharedDb >> "${DYNAMODB_LOG}" &

export SCREENER_APP_PATH=/app/index.js
export SCREENER_APP_NAME=express

# run screener from mount
/mnt/test/integration/screener/run.sh
