#! /bin/bash -e
# 2 modes:
# 1: agent from mounted volume
#  - `CONFIG` - which config from s3://node-agent-configs to use
# 2: agent-less

if [[ -f "/opt/contrast/node-agent.tgz" ]];
then
  pushd /opt/contrast && tar xzf ./node-agent.tgz && popd
  aws s3 cp "s3://node-agent-configs/$CONFIG" contrast_security.yaml
  npm install node-agent.tgz
  HOST=0.0.0.0 DEBUG="contrast:*" node -r /opt/contrast/package/bootstrap server.js
else
  echo "Running app in agent-less mode"
  HOST=0.0.0.0 node server.js
fi

