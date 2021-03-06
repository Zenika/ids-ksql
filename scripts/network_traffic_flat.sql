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
	layers->http->http_http_response_for_uri as http_response_for_uri,
	layers->http->http_http_file_data as http_file_data
FROM NETWORK_TRAFFIC_NESTED;

SELECT ip_source, ip_dest FROM network_traffic_flat EMIT CHANGES LIMIT 10;
