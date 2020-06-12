DROP TABLE IF EXISTS potential_port_scan_attacks;

CREATE TABLE potential_port_scan_attacks
AS SELECT
   ip_source,
   COUNT_DISTINCT(ip_dest + tcp_port_dest)
FROM NETWORK_TRAFFIC_FLAT
WINDOW TUMBLING (SIZE 60 SECONDS)
GROUP BY ip_source
HAVING COUNT_DISTINCT(ip_dest + tcp_port_dest) > 1000;
