CREATE TABLE connections_per_ip_per_port_per_60sec
AS SELECT
	ip_dest as ip_dest, 
	tcp_port_dest as port_dest, 
	count(*) as count_port_dest,
	WindowStart() as window_start
FROM NETWORK_TRAFFIC_FLAT
WINDOW TUMBLING (SIZE 60 SECONDS)
GROUP BY ip_dest, tcp_port_dest;