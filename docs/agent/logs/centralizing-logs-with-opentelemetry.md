

You centralize a log source by running an OpenTelemetry Collector where the logs are produced and pointing it at the
OTLP endpoint of a Netdata Agent. That Agent stores the logs in Netdata's log store, with retention per tenant and
optional offloading to object storage, and shows them in its Logs tab under the `otel-logs` source. Centralize the
sources that must outlive their node, need retention beyond the node's disk, or have no OS log store, such as
Kubernetes; leave the rest managed in place, where they cost nothing extra. See
[Logs Management](/docs/agent/category-overview-pages/working-with-logs) for the decision per source.

Two things to set up:

1. **The receiving Agent.** Any Netdata Agent with the OpenTelemetry plugin (see the availability note in
   [OTLP Ingestion](/docs/agent/opentelemetry/otlp-ingestion)). Bind its OTLP endpoint beyond loopback with TLS or mutual TLS, and enable tenant selection when different
   sender groups need their own retention. See
   [Securing the OTLP Endpoint](/docs/agent/opentelemetry/securing-the-otlp-endpoint) and, for
   retention and offloading to object storage, [Log Storage and Retention](/docs/agent/logs/log-storage-and-retention).
2. **The senders.** One OpenTelemetry Collector per node or cluster, with a persistent queue and the receiver for the
   source. The recipes are in [Collect Logs with OpenTelemetry Collector](/docs/agent/opentelemetry/logs-collection):
   [systemd journal](/docs/agent/opentelemetry/logs-collection#systemd-journal),
   [application log files](/docs/agent/opentelemetry/logs-collection#application-log-files),
   [Windows event channels](/docs/agent/opentelemetry/logs-collection#windows-event-channels),
   [Kubernetes and containers](/docs/agent/opentelemetry/logs-collection#kubernetes-and-containers), and the
   [macOS unified log](/docs/agent/opentelemetry/logs-collection#macos-unified-log). Network devices sending syslog use
   the [syslog receiver](/docs/agent/npm/syslog).

SNMP traps and network flows need no Collector: Netdata receives them directly and writes journal-compatible files on
the receiving node; see [SNMP Trap Logs](/docs/agent/logs/snmp-trap-logs) and [Network Flows](/docs/agent/logs/network-flows).

To normalize or drop records before they reach Netdata, see [Transformations](/docs/agent/opentelemetry/transformations);
to alert on a log pattern, derive a metric with [Logs-to-Metrics](/docs/agent/opentelemetry/logs-to-metrics).
