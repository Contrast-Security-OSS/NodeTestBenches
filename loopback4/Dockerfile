ARG node_version=12
FROM node:$node_version

WORKDIR /app
COPY . .

RUN chmod +x entry.sh
RUN npm ci --unsafe-perm
RUN npm run build

CMD ./entry.sh
