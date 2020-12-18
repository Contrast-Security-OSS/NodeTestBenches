ARG node_version=12
FROM node:$node_version
RUN apt-get update && apt-get install -y python3
RUN curl -sO https://bootstrap.pypa.io/get-pip.py
RUN python3 get-pip.py

RUN pip install awscli

WORKDIR /app
COPY . .
RUN npm ci --unsafe-perm
RUN npm run build
RUN chmod +x entry.sh
CMD ./entry.sh
