

Netdata receives SNMP traps from network devices and writes them, decoded, into journal-compatible files on the node
that runs the trap collector: the systemd journal file format, produced by Netdata's own writer, without
`systemd-journald`. They appear in the Logs tab as **SNMP Trap Logs** (`snmp:traps`), with the same field filters,
full-text search, histograms, and live tail as every other source.

- **Where they are stored:** `traps/<job>/<machine-id>/` under the Netdata log directory (`/var/log/netdata` by
  default), one directory per collector job.
- **Retention:** per job, `retention.max_size` (`10GB` by default) and an optional `max_duration`; see
  [Log Storage and Retention](/docs/agent/logs/log-storage-and-retention#journals-written-by-netdata).
- **Command line and SIEM:** on Linux with systemd 252 or later, `journalctl --directory=<dir>` reads the files, and
  so do SIEM agents that ingest journal files. Netdata reads them on every platform it writes them on.
- **Forwarding:** traps can also be sent over OTLP to any OpenTelemetry backend.

The collector, its configuration, the trap fields, and the query workflows are documented under Network Performance
Monitoring:

- [SNMP Traps](/docs/agent/npm/snmp-traps) — setup and overview.
- [Journal and Querying](/docs/agent/npm/snmp-traps/journal-and-querying) — paths, `journalctl` commands, export.
- [Forwarding to SIEM](/docs/agent/npm/snmp-traps/forwarding-to-siem) — journal shippers and OTLP forwarding.
- [Configuration](/docs/agent/npm/snmp-traps/configuration) — listeners, decoding, retention.
