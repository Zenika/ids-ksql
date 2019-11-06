FROM ubuntu:18.04

RUN apt-get -qq update \
  && DEBIAN_FRONTEND=noninteractive apt-get -q -y install tshark daemontools pcaputils \
  && setcap 'CAP_NET_RAW+eip CAP_NET_ADMIN+eip' /usr/bin/dumpcap

VOLUME /logs

CMD exec tshark -l -n -T ek | multilog s131072 n1000 /logs

