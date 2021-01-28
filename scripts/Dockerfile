ARG node_version=12
FROM node:$node_version

WORKDIR /app
COPY . .
RUN npm ci --production
RUN chmod +x entry.sh
CMD ./entry.sh
