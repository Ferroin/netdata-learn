

This section talks about ways Netdata collects and visualizes logs.

The [systemd journal plugin](/docs/agent/src/collectors/systemd-journal.plugin/) is the core Netdata component for reading systemd journal logs.

For structured logs, Netdata provides tools like [log2journal](/docs/agent/src/collectors/log2journal) and [systemd-cat-native](/docs/agent/src/libnetdata/log/systemd-cat-native) to convert them into compatible systemd journal entries.

You can also find useful guides on how to set up log centralization points in the [Observability Centralization Points](/docs/agent/observability-centralization-points) section of our docs.
