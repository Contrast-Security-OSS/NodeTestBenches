FROM ubuntu:jammy

ARG node_version=24
ARG DEBIAN_FRONTEND=noninteractive

# Update package lists and install dependencies
RUN apt-get update && \
    apt-get install -y curl ca-certificates wget && \
    curl -sL "https://deb.nodesource.com/setup_${node_version}.x" | bash -

# Install Node.js
RUN apt-get install -y nodejs

# Install gnupg2
RUN apt-get update && apt-get install -y gnupg2

RUN apt-get -y install sudo

# Add PostgreSQL repository and install PostgreSQL 11
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ jammy-pgdg main" > /etc/apt/sources.list.d/pgdg.list && \
    curl -sSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - && \
    apt-get update && \
    apt-get install -y postgresql-11 postgresql-contrib-11 postgresql-client

# Configure such that remote connections to the database are possible.
RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/11/main/pg_hba.conf
RUN echo "listen_addresses='*'" >> /etc/postgresql/11/main/postgresql.conf

# Add VOLUMEs to allow backup of config, logs and databases
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]
EXPOSE 5432

# RethinkDB
RUN echo "deb https://download.rethinkdb.com/repository/ubuntu-jammy jammy main" > /etc/apt/sources.list.d/rethinkdb.list
RUN wget -qO- https://download.rethinkdb.com/repository/raw/pubkey.gpg | sudo apt-key add -v - && apt-get update && apt-get install -y rethinkdb
RUN rm -rf /var/lib/apt/lists/*
VOLUME  ["/etc/rethinkdb", "/var/log/rethinkdb", "/var/lib/rethinkdb"]
EXPOSE 28015

# Install MySQL Database (MariaDB from the Ubuntu repos)
RUN apt-get update && apt-get install -y mariadb-server mariadb-client
VOLUME ["/etc/mysql", "/var/lib/mysql"]
EXPOSE 3306

# SQLite DB
RUN apt-get install -y sqlite3
RUN sqlite3 --version

# DynamoDB
# At least Java v8.x is required for DynamoDB
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt install default-jre-headless -y
RUN java -version
EXPOSE 8000

# Install prerequisites
RUN apt-get update && \
    apt-get install -y gnupg curl && \
    curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | apt-key add - && \
    echo "deb http://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-8.0.list && \
    apt-get update

# Install MongoDB
RUN apt-get install -y mongodb-org

# Expose port 27017
EXPOSE 27017

RUN apt-get update && apt-get install -y build-essential libxml2-dev

# Application setup
WORKDIR /app
COPY . .
RUN chmod +x install-dynamodb-local.sh
RUN ./install-dynamodb-local.sh
RUN npm ci
RUN npm rebuild

ENTRYPOINT ["./screener.sh"]
