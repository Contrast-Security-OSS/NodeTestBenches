#! /bin/bash -e

if [[ -f "/opt/contrast/node-agent.tgz" ]];
then
  # agent from mounted volume
  pushd /opt/contrast && tar xzf ./node-agent.tgz && popd
  # agent configuration is done via env vars or mounted contrast_security.yaml
  HOST=0.0.0.0 node -r /opt/contrast/package/bootstrap .
else
  # 2: agent-less
  echo "Running app in agent-less mode"
  HOST=0.0.0.0 node .
fi
