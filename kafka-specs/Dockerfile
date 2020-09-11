FROM gradle:5.6.2-jdk11 AS BUILD

WORKDIR /tmp
RUN cd /tmp \
  && git clone --branch v0.1.0 https://github.com/streamthoughts/kafka-specs.git \
  && cd kafka-specs \
  && gradle distTar

FROM openjdk:8
COPY --from=BUILD /tmp/kafka-specs/build/distributions/kafka-specs-*.tar /
RUN tar xf kafka-specs-*.tar
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh .
COPY update-specs.sh .
RUN chmod +x wait-for-it.sh
ENTRYPOINT [ "./update-specs.sh" ]
