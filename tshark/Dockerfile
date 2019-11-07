FROM alpine:3.10

RUN apk add --no-cache tshark coreutils

VOLUME /logs

CMD exec tshark -l -n -T ek | grep -v '^{"index":' | split -l 100 - /logs/packets-

