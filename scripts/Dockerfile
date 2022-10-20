ARG node_version=12
FROM node:${node_version}-bullseye

# Create the file repository configuration, import the repository signing key and install PostgreSQL & sudo
RUN echo "deb [arch=amd64] http://apt.postgresql.org/pub/repos/apt/ bullseye-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN curl -sSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt update
RUN apt install -y postgresql-10 postgresql-contrib-10 postgresql-client-10
RUN apt-get -y install sudo

# Adjust PostgreSQL configuration so that remote connections to the
# database are possible.
RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/10/main/pg_hba.conf
RUN echo "listen_addresses='*'" >> /etc/postgresql/10/main/postgresql.conf

# Expose the PostgreSQL port
EXPOSE 5432

# Add VOLUMEs to allow backup of config, logs and databases
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

# Install RethinkDB
RUN echo "deb https://download.rethinkdb.com/repository/debian-bullseye bullseye main" > /etc/apt/sources.list.d/rethinkdb.list
RUN wget -qO- https://download.rethinkdb.com/repository/raw/pubkey.gpg | sudo apt-key add -v - && apt-get update && apt-get install -y rethinkdb
RUN rm -rf /var/lib/apt/lists/*
VOLUME  ["/etc/rethinkdb", "/var/log/rethinkdb", "/var/lib/rethinkdb"]

EXPOSE 28015

# Install MySQL Database
ENV DEBIAN_FRONTEND="noninteractive"
RUN wget http://repo.mysql.com/mysql-apt-config_0.8.23-1_all.deb
RUN apt update
RUN apt install lsb-base lsb-release ./mysql-apt-config_0.8.23-1_all.deb
RUN apt install mariadb-server mariadb-client -y
VOLUME ["/etc/mysql", "/var/lib/mysql"]

EXPOSE 3306

# Install SQLite DB
RUN apt install sqlite3
RUN sqlite3 --version

## JAVA INSTALLATION - At least Java v8.x is required for DynamoDB
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt install default-jre -y
RUN java -version

WORKDIR /app
COPY . .

RUN chmod +x install-dynamodb-local.sh
RUN ./install-dynamodb-local.sh
EXPOSE 8000

# Use an older NPM version due to issues with the latest ones
RUN npm install -g npm@8.3.1
RUN npm ci
RUN chmod +x entry.sh
CMD ./entry.sh
