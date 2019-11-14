#!/usr/bin/env bash

dpkg --purge metricbeat || true
curl -s -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-7.4.2-amd64.deb
dpkg -i metricbeat-7.4.2-amd64.deb

cp /lib/systemd/system/metricbeat.service /etc/systemd/system/
sed -i \
    "/\[Service\]/a Environment=\"BEATS_ENV_OPTS=-E HOSTNAME=$(hostname)\"" \
    /etc/systemd/system/metricbeat.service
sed -i \
    's!^\(ExecStart=/usr/share/metricbeat/bin/metricbeat $BEAT_LOG_OPTS $BEAT_CONFIG_OPTS $BEAT_PATH_OPTS\).*$!\1 $BEATS_ENV_OPTS!' \
    /etc/systemd/system/metricbeat.service

cat<<EOF >> /etc/metricbeat/metricbeat.yml
# File output
output.file:
  path: "/vagrant/data/metrics"
  filename: 'metricbeat-${HOSTNAME}'

EOF

sed -i 's/^\(output.elasticsearch\)/#\1/; s/\(  hosts: \["localhost:9200"\]\)/#\1/' /etc/metricbeat/metricbeat.yml
sed -i 's/\(add_host_metadata:\).*$/\1/' /etc/metricbeat/metricbeat.yml
sed -i '/add_host_metadata:/a \      netinfo.enabled: true' /etc/metricbeat/metricbeat.yml



systemctl daemon-reload
systemctl restart metricbeat
