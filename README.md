# ids-ksql
Demo project for (Intrusion Detection System) IDS with KSQL and Kafka


## Start the connector for producing packets
To start the connector that will read the network packets from the JSON files and write it to a Kafka topic, use the following command :
```bash
curl -X POST \
  http://localhost:8083/connectors \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "network-traffic-connector",
    "config": {
        "name": "network-traffic-connector",
        "connector.class": "com.github.jcustenborder.kafka.connect.spooldir.SpoolDirSchemaLessJsonSourceConnector",
        "tasks.max": "1",
        "input.path": "/data/logs",
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
