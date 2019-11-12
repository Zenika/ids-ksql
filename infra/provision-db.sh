#!/bin/sh

apt-get update -qq
apt-get install -qy avahi-daemon
apt-get install -qy postgresql

sed -i.bak "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/10/main/postgresql.conf
cp /vagrant/db/pg_hba.conf /etc/postgresql/10/main/pg_hba.conf
systemctl restart postgresql

su postgres -c 'psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "postgres" --file "/vagrant/db/init.sql"'
