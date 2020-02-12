CREATE TABLE potential_port_scan_attacks 
AS SELECT 
	window_start, ip_dest, count(*) AS count_scan 
FROM connections_per_ip_per_port_per_60sec
GROUP BY ip_dest, window_start
HAVING count(*) > 20;
