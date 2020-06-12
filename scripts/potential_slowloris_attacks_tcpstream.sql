DROP TABLE IF EXISTS network_open_tcp_stream;
CREATE TABLE network_open_tcp_stream
AS SELECT
  COLLECT_SET(ip_source) as ip_source,
  COLLECT_SET(ip_dest) as ip_dest,
  tcp_stream,
  count(*) as packet_count,
  sum(CAST(tcp_flags_reset as INTEGER)) + sum(CAST(tcp_flags_fin as INTEGER)) as tcp_flag_reset_fin
FROM NETWORK_TRAFFIC_FLAT
WINDOW SESSION (60 SECONDS)
GROUP BY tcp_stream;

SELECT * FROM network_open_tcp_stream EMIT CHANGES LIMIT 10;

SELECT ip_source[1] as ip_source, count(*) as open_tcp_stream
FROM network_open_tcp_stream
WHERE tcp_flag_reset_fin = 0
GROUP BY ip_source[1] EMIT CHANGES;
