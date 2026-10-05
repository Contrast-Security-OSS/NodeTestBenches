# Node Agent Test Benches
This repository contains our library of test bench applications for testing the
Contrast Security Node agent with various supported frameworks.

Vulnerabilities are implemented in a shared module, `test-bench-utils`, which is
then installed and used by each application.

## Applications
- [express4](express4)
- [express5](express5)
- [fastify4](fastify4)
- [hapi20](hapi20)
- [hapi21](hapi21)
- [koa2](koa2)
- [koa3](koa3)
- [test-bench-utils](test-bench-utils) (shared sinks, routes, and views)

## Using [`lerna`](https://lerna.js.org)
`lerna` is a tool for managing multiple packages within a single repository. We
use lerna to handle the installation and version management of
`test-bench-utils` during development.

By default, when running `npm install` in the root of this repo,
`lerna bootstrap` will also be executed. This will install dependencies within
each of the specified package directories, as well as `npm link` shared
dependencies.

When bumping a package version, we will use `lerna publish <patch | minor | major>` instead of
`npm version` inside _test-bench-utils_. This will keep versions in sync between
packages.

Outside of these two commands, development on each application or the
`test-bench-utils` package itself should remain unchanged for the most part.

## Adding new sample app to lerna
 * Add folder name in `lerna.json` and re-run `lerna bootstrap`
 * Add the app (folder name) to `jobs.build-and-push.strategy.matrix.apps` in [.github/workflows/build_v5_screener_imgs.yml](.github/workflows/build_v5_screener_imgs.yml)
 * If the app has a screener image, add it to the `Dockerfile-screener` list in [scripts/copy-scripts.sh](scripts/copy-scripts.sh)
 * Add repository into ecr `aws ecr create-repository --repository-name <app>`

