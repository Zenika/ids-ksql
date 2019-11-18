SET 'auto.offset.reset'='earliest';


-- Init a Stream from the topic
CREATE STREAM NETWORK_TRAFFIC_NESTED 
(
	timestamp BIGINT,
	layers STRUCT<
		frame STRUCT<
			frame_frame_time VARCHAR,
			frame_frame_protocols VARCHAR
		>,
		eth STRUCT<
			eth_eth_src VARCHAR,
			eth_eth_dst VARCHAR
		>,
		ip STRUCT<
			ip_ip_src VARCHAR,
			ip_ip_src_host VARCHAR,
			ip_ip_dst VARCHAR,
			ip_ip_dst_host VARCHAR,
			ip_ip_flags VARCHAR,
			ip_ip_checksum VARCHAR,
			ip_ip_len VARCHAR,
			ip_ip_proto VARCHAR
		>,
		tcp STRUCT<
			tcp_tcp_stream VARCHAR,
			tcp_tcp_srcport VARCHAR,
			tcp_tcp_dstport VARCHAR,
			tcp_tcp_flags VARCHAR,
			tcp_tcp_ack VARCHAR,
			tcp_flags_tcp_flags_res VARCHAR,
			tcp_flags_tcp_flags_ns VARCHAR,
			tcp_flags_tcp_flags_cwr VARCHAR,
			tcp_flags_tcp_flags_ecn VARCHAR,
			tcp_flags_tcp_flags_urg VARCHAR,
			tcp_flags_tcp_flags_ack VARCHAR,
			tcp_flags_tcp_flags_push VARCHAR,
			tcp_flags_tcp_flags_reset VARCHAR,
			tcp_flags_tcp_flags_syn VARCHAR,
			tcp_flags_tcp_flags_fin VARCHAR,
			tcp_flags_tcp_flags_str VARCHAR
		>,
		http STRUCT<
			http_http_host VARCHAR,
			http_http_request_full_uri VARCHAR,
			text_http_request_method VARCHAR,
			text_http_request_version VARCHAR,
			http_http_authorization VARCHAR,
			http_http_user_agent VARCHAR,

			text_http_response_version VARCHAR,
			text_http_response_code VARCHAR,
			text_http_response_phrase VARCHAR,
			http_http_content_type VARCHAR,
			http_http_response_line array<VARCHAR>,
			http_http_response_for_uri VARCHAR,
			http_http_file_data VARCHAR
		>
	>
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

	layers->tcp->tcp_tcp_stream as tcp_stream,
	layers->tcp->tcp_tcp_srcport as tcp_port_source,
	layers->tcp->tcp_tcp_dstport as tcp_port_dest,
	layers->tcp->tcp_tcp_flags as tcp_flags,
	layers->tcp->tcp_tcp_ack as tcp_ack,
	layers->tcp->tcp_flags_tcp_flags_res as tcp_flags_res,
	layers->tcp->tcp_flags_tcp_flags_ns as tcp_flags_ns,
	layers->tcp->tcp_flags_tcp_flags_cwr as tcp_flags_cwr,
	layers->tcp->tcp_flags_tcp_flags_ecn as tcp_flags_ecn,
	layers->tcp->tcp_flags_tcp_flags_urg as tcp_flags_urg,
	layers->tcp->tcp_flags_tcp_flags_ack as tcp_flags_ack,
	layers->tcp->tcp_flags_tcp_flags_push as tcp_flags_push,
	layers->tcp->tcp_flags_tcp_flags_reset as tcp_flags_reset,
	layers->tcp->tcp_flags_tcp_flags_syn as tcp_flags_syn,
	layers->tcp->tcp_flags_tcp_flags_fin as tcp_flags_fin,
	layers->tcp->tcp_flags_tcp_flags_str as tcp_flags_str,

	layers->http->http_http_host as http_host,
	layers->http->http_http_request_full_uri as http_request_full_uri,
	layers->http->text_http_request_method as http_request_method,
	layers->http->text_http_request_version as http_request_version,
	layers->http->http_http_authorization as http_authorization,
	layers->http->http_http_user_agent as http_user_agent,

	layers->http->text_http_response_version as http_response_version,
	layers->http->text_http_response_code as http_response_code,
	layers->http->text_http_response_phrase as http_response_phrase,
	layers->http->http_http_content_type as http_content_type,
	layers->http->http_http_response_line as http_response_line,
	layers->http->http_http_response_for_uri as http_response_for_uri,
	layers->http->http_http_file_data as http_file_data
FROM NETWORK_TRAFFIC_NESTED;


-- Nb connections per protocol
CREATE table connections_per_protocols AS
SELECT frame_protocols, count(*) AS count
FROM NETWORK_TRAFFIC_FLAT
GROUP BY frame_protocols;


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


-- Detect Slowloris attacks
CREATE TABLE potential_slowloris_attacks
AS SELECT
	ip_dest, count(*) as count_connection_reset
FROM NETWORK_TRAFFIC_FLAT
WINDOW TUMBLING (SIZE 60 SECONDS)
WHERE tcp_flags_ack = '1' AND tcp_flags_reset = '1'
GROUP BY ip_dest
HAVING count(*) > 100;