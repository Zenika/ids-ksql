FROM alpine:3.10

RUN apk add --no-cache tshark coreutils

COPY run.sh /
RUN chmod +x /run.sh
VOLUME /logs

CMD exec /run.sh

