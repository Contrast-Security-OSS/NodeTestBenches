# @contrast/express-test4-bench
An intentionally vulnerable `nextjs` application.

## Running Locally
Make sure you have [Node.js](http://nodejs.org/) installed or install a version
of Node from [nvm](https://github.com/creationix/nvm).

```sh
git clone https://github.com/Contrast-Security-OSS/NodeTestBenches.git # or clone your own fork
cd NodeTestBenches/express
npm install

# run in development mode
npm run dev

# or build and run in production mode
npm run build && npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Running Locally Using Docker
Build the Docker container with the following CLI command:

```sh
docker build . -t <container name>
```

Run the container by running:

```sh
docker run -p 3000:3000 <container name>
```