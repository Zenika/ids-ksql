#!/bin/sh

apt-get update -qq
apt-get install -qy avahi-daemon
apt-get install -qy openjdk-11-jdk-headless nginx
