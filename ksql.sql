SET 'auto.offset.reset'='earliest';


-- Init a Stream from the topic
CREATE STREAM NETWORK_TRAFFIC_NESTED 
(
	timestamp BIGINT,
	layers STRUCT<
		frame STRUCT<
			frame_frame_time VARCHAR,
			frame_frame_protocols VARCHAR>,
		eth STRUCT<
			eth_eth_src VARCHAR,
			eth_eth_dst VARCHAR>,
		ip STRUCT<
			ip_ip_src VARCHAR,
			ip_ip_src_host VARCHAR,
			ip_ip_dst VARCHAR,
			ip_ip_dst_host VARCHAR,
			ip_ip_flags VARCHAR,
			ip_ip_checksum VARCHAR,
			ip_ip_len VARCHAR,
			ip_ip_proto VARCHAR>,
		tcp STRUCT<
			tcp_tcp_srcport VARCHAR,
			tcp_tcp_dstport VARCHAR,
			tcp_tcp_flags VARCHAR,
			tcp_tcp_ack VARCHAR,
			tcp_flags_tcp_flags_syn VARCHAR,
			tcp_flags_tcp_flags_ack VARCHAR>,
		http STRUCT<
			text_http_response_version VARCHAR,
			text_http_response_code VARCHAR,
			text_http_response_phrase VARCHAR,
			http_http_content_type VARCHAR,
			http_http_response_line array<VARCHAR>,
			http_http_response_for_uri VARCHAR>>
) 
WITH (KAFKA_TOPIC='network-traffic', TIMESTAMP='timestamp', VALUE_FORMAT='JSON');


-- Flatten NETWORK_TRAFFIC_NESTED Stream
CREATE STREAM NETWORK_TRAFFIC_FLAT 
AS SELECT
	timestamp,
	layers->frame->frame_frame_protocols as frame_protocols,
	layers->frame->frame_frame_time as frame_time,
	layers->eth->eth_eth_src as eth_addr_source,
	layers->eth->eth_eth_dst as eth_addr_dest,
	layers->ip->ip_ip_src as ip_source,
	layers->ip->ip_ip_src_host as host_source,
	layers->ip->ip_ip_dst as ip_dest,
	layers->ip->ip_ip_dst_host as host_dest,
	layers->ip->ip_ip_flags as ip_flags,
	layers->ip->ip_ip_checksum as ip_checksum,
	layers->ip->ip_ip_len as ip_length,
	layers->ip->ip_ip_proto as ip_protocol,
	layers->tcp->tcp_tcp_srcport as tcp_port_source,
	layers->tcp->tcp_tcp_dstport as tcp_port_dest,
	layers->tcp->tcp_tcp_flags as tcp_flags,
	layers->tcp->tcp_tcp_ack as tcp_ack,
	layers->tcp->tcp_flags_tcp_flags_syn as tcp_flags_syn,
	layers->tcp->tcp_flags_tcp_flags_ack as tcp_flags_ack,
	layers->http->text_http_response_version as http_response_version,
	layers->http->text_http_response_code as http_response_code,
	layers->http->text_http_response_phrase as http_response_phrase,
	layers->http->http_http_content_type as http_content_type,
	layers->http->http_http_response_line as http_response_line,
	layers->http->http_http_response_for_uri as http_response_for_uri
FROM NETWORK_TRAFFIC_NESTED;


-- Nb connections per ip_source
CREATE table connections_per_ip_source AS
SELECT ip_source, count(*) AS count
FROM NETWORK_TRAFFIC_FLAT
WHERE ip_source IS NOT NULL
GROUP BY ip_source;


-- Nb connections per ip_dest
CREATE TABLE connections_per_ip_dest AS
SELECT ip_dest, count(*) AS count 
FROM NETWORK_TRAFFIC_FLAT 
WHERE ip_dest IS NOT NULL
GROUP BY ip_dest;


-- Nb connection per ip per port per 60 sec
CREATE TABLE connections_per_ip_per_port_per_60sec
AS SELECT
	ip_dest as ip_dest, 
	tcp_port_dest as port_dest, 
	count(*) as count_port_dest,
	WindowStart() as window_start
FROM NETWORK_TRAFFIC_FLAT
WINDOW TUMBLING (SIZE 60 SECONDS)
WHERE ip_dest IS NOT NULL AND tcp_port_dest IS NOT NULL
GROUP BY ip_dest, tcp_port_dest;


-- IPs that are having at least 20 ports scanned within 60 sec
CREATE TABLE potential_port_scan_attacks 
AS SELECT 
	window_start, ip_dest, count(*) AS count_scan 
FROM connections_per_ip_per_port_per_60sec
GROUP BY ip_dest, window_start
HAVING count(*) > 20;





