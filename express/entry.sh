#! /bin/bash -e
# `CONFIG` - name of configuration file in s3
#
# 3 modes:
# 1: agent from artifactory
#  - `AGENT_VERSION` - e.g. 2.11.0
#  - `AGENT_HASH` e.g. 20200220-2232.9aa9d178
# 2: agent from s3 bucket:
#  - `AGENT` - name of .tgz in s3://node-agents
# 3: agent-less
#  - only env var needed is `CONFIG`

if [[ -n "$AGENT" ]];
then
  echo "Downloading Node Agent: $AGENT from s3://node-agents"
  aws s3 cp "s3://node-agents/$AGENT" node-agent.tgz
elif [[ -n "$AGENT_VERSION" && -n "$AGENT_HASH" ]];
then
  AGENT_ARTIFACT_URL=https://contrastsecurity.jfrog.io/contrastsecurity/node-agent-staging/$AGENT_VERSION/$AGENT_HASH/node_contrast-$AGENT_VERSION.tgz
  echo "Downloading Node Agent: $AGENT_ARTIFACT_URL"
  responseCode=$(curl -L --silent \
    --output node-agent.tgz \
    -H "Authorization: Bearer $CONTRAST_ARTIFACTORY_ACCESS_TOKEN" \
    -X GET "$AGENT_ARTIFACT_URL" \
    --write-out "%{http_code}" )

  if [[ ${responseCode} -ne 200 ]];
  then
    echo "Unable to download node agent - response code: $responseCode"
    exit 1
  fi
elif [[ -n "$AGENT_LOCAL" ]]
then
  cp /opt/contrast/node_contrast*.tgz .
else
  echo "Running app in agent-less mode"
  AGENT_LESS=true
fi

if [[ -n "$AGENT_LESS" ]];
then
  HOST=0.0.0.0 node index.js
else
  aws s3 cp "s3://node-agent-configs/$CONFIG" contrast_security.yaml
  npm install node-agent.tgz
  HOST=0.0.0.0 DEBUG="contrast:*" node -r node_contrast/bootstrap index.js
fi
