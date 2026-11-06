

The Netdata Agent receives OpenTelemetry telemetry over OTLP: gRPC on port 4317, and HTTP on port 4318 when you turn
the HTTP listener on. Metrics become
Netdata charts. Logs and traces are stored and indexed on the receiving Agent. Send the data through an OpenTelemetry
Collector, with TLS or mutual TLS when the Collector runs on another host. Start with
[OTLP Ingestion](/docs/agent/opentelemetry/otlp-ingestion) for the endpoints, the exporter blocks, and two smoke tests.

## Metrics

Gauges, sums, histograms with explicit buckets, and summaries become charts under `otel.` contexts, with the resource,
scope, and data-point attributes as labels; you attach health alerts to them as to any other chart. Exponential
histograms are not ingested. Mapping files control the dimension attribute and collection interval per instrumentation
scope, and a per-request budget (100 by default) bounds how many new charts one request may create. The receiver
recipes are in [Metrics Collection](/docs/agent/opentelemetry/metrics-collection); every option is in the
[plugin reference](/docs/agent/src/crates/otel-plugin).

## Logs

Logs land in Netdata's log store on the receiving Agent: every field indexed, exact counts, size and age retention, and
optional offloading to S3-compatible object storage with transparent read-back. You explore them in the Logs tab under
the `otel-logs` source. Which sources to centralize at all is a Logs Management decision — see
[Centralizing Logs with OpenTelemetry](/docs/agent/logs/centralizing-logs-with-opentelemetry); the Collector recipes per
source are in [Logs Collection](/docs/agent/opentelemetry/logs-collection), and retention and offloading are in
[Log Storage and Retention](/docs/agent/logs/log-storage-and-retention).

## Traces

Traces land on the receiving Agent too: spans indexed, their own retention settings, and the same optional
offloading to S3-compatible object storage as logs, read back through the download cache both signals share. You
explore them in the Traces tab. Sending traces through a Collector is in
[OTLP Ingestion](/docs/agent/opentelemetry/otlp-ingestion#send-traces); storage, retention, offloading, and sizing are in
[Trace Storage and Retention](/docs/agent/opentelemetry/trace-storage-and-retention).

## Requirements

- Linux native packages install the plugin as a dependency of `netdata`; static builds bundle it (except 32-bit
  ARMv6) and all Docker images include it. macOS kickstart installs provision a Rust toolchain and build it — when no
  adequate toolchain ends up available, the install continues with a warning and without the plugin. Linux source
  builds need `--enable-plugin-otel`. It is not available on Windows or FreeBSD.
- Viewing logs requires signing in with Netdata Cloud, free for community use. Viewing traces also requires a paid
  plan.
- The examples on these pages are validated with OpenTelemetry Collector Contrib 0.157.0.

## In this section

- [OTLP Ingestion](/docs/agent/opentelemetry/otlp-ingestion) — the endpoints, the exporters, smoke tests, troubleshooting.
- [Securing the OTLP Endpoint](/docs/agent/opentelemetry/securing-the-otlp-endpoint) — TLS, mutual TLS, network
  controls, certificate rotation.
- [Metrics Collection](/docs/agent/opentelemetry/metrics-collection) — receiver recipes for hosts and applications.
- [Logs Collection](/docs/agent/opentelemetry/logs-collection) — receiver recipes for journals, files, Windows event
  channels, Kubernetes, macOS, and syslog.
- [Transformations](/docs/agent/opentelemetry/transformations) — parse, enrich, normalize, and drop records before
  export.
- [Logs-to-Metrics](/docs/agent/opentelemetry/logs-to-metrics) — count matching log records and alert on the rate.
- [Trace Storage and Retention](/docs/agent/opentelemetry/trace-storage-and-retention) — how spans are stored, retention,
  offloading, and sizing.
- [Syslog from Network Devices](/docs/agent/npm/syslog) — device syslog through a Collector receiver.
- [OpenTelemetry Plugin Reference](/docs/agent/src/crates/otel-plugin) — every `otel.yaml` option.
