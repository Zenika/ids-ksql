CREATE TABLE potential_slowloris_attacks
AS SELECT
	ip_source, 
	count(*) as count_connection_reset
FROM NETWORK_TRAFFIC_FLAT
WINDOW TUMBLING (SIZE 60 SECONDS)
WHERE tcp_flags_ack = '1' AND tcp_flags_reset = '1'
GROUP BY ip_dest
HAVING count(*) > 100;