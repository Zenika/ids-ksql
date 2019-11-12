-- Adminer 4.7.3 PostgreSQL dump

CREATE DATABASE "testdebezium";

\connect "testdebezium";

DROP TABLE IF EXISTS "employee";
DROP SEQUENCE IF EXISTS employee_id_seq;
CREATE SEQUENCE employee_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."employee" (
    "id" integer DEFAULT nextval('employee_id_seq') NOT NULL,
    "name" character varying(120) NOT NULL,
    "firstname" character varying(120) NOT NULL
) WITH (oids = false);


-- 2019-09-27 09:46:19.113277+00
