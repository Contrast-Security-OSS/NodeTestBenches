#! /bin/bash -e
# `CONFIG` - name of configuration file in s3
#
# 2 modes:
# 1: agent from mounted volume
#  - `AGENT` - boolean, will mount a dir to `/opt/contrast` to copy agent
#  - `CONFIG` - which config from s3://node-agent-configs to use
# 2: agent-less

if [[ -n "$AGENT" ]];
then
  cp /opt/contrast/node_contrast*.tgz ./node-agent.tgz
  aws s3 cp "s3://node-agent-configs/$CONFIG" contrast_security.yaml
  npm install node-agent.tgz
  HOST=0.0.0.0 DEBUG="contrast:*" node -r node_contrast/bootstrap index.js
else
  echo "Running app in agent-less mode"
  HOST=0.0.0.0 node index.js
fi

