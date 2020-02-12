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