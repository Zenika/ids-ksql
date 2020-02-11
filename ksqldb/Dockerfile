FROM maven:3.6-jdk-8 as BUILDER

RUN apt-get update

RUN apt-get install -y --no-install-recommends git

RUN git clone -b 5.5.x https://github.com/confluentinc/ksql.git

RUN cd ksql && mvn package -DskipTests

RUN cd ksql/ksql-package && mvn package -DskipTests

FROM confluentinc/cp-base-new:5.4.0

COPY --from=BUILDER /ksql/ksql-package/target/*.tgz /

RUN tar xzf ksql-package-5.5.0-SNAPSHOT-package.tgz



