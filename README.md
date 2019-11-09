# ids-ksql
Demo project for (Intrusion Detection System) IDS with KSQL and Kafka


## Start the connector for producing packets
To start the connector that will read the network packets from the JSON files and write it to a Kafka topic, use the following command :
```bash
curl -X POST \
  http://localhost:8083/connectors \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 623' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:8083' \
  -H 'Postman-Token: 81a9a2bd-11e6-4601-9a8e-9ec67d255f6a,3b200420-2923-43cb-a268-5fcd962e4fa2' \
  -H 'User-Agent: PostmanRuntime/7.19.0' \
  -H 'cache-control: no-cache' \
  -d '{
    "name": "network-traffic-connector",
    "config": {
        "name": "network-traffic-connector",
        "connector.class": "com.github.jcustenborder.kafka.connect.spooldir.SpoolDirSchemaLessJsonSourceConnector",
        "tasks.max": "1",
        "input.path": "/data/input",
        "input.file.pattern": "packets-.*",
        "error.path": "/data/error",
        "finished.path": "/data/finished",
        "halt.on.error": false,
        "topic": "network-traffic",
        "value.converter": "org.apache.kafka.connect.storage.StringConverter",
        "empty.poll.wait.ms": 500,
        "batch.size": 1000
    }
}'
```

or you can also use the `Create Network Traffic Connector` request from the Postman collection.
