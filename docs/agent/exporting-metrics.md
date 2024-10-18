

Netdata allows you to export metrics to external time-series databases with the [exporting
engine](/docs/agent/src/exporting). This system uses a number of **connectors** to initiate connections to [more than
thirty](#supported-databases) supported databases, including InfluxDB, Prometheus, Graphite, ElasticSearch, and much
more.

The exporting engine resamples Netdata's thousands of per-second metrics at a user-configurable interval, and can export
metrics to multiple time-series databases simultaneously.

Based on your needs and resources you allocated to your external time-series database, you can configure the interval
that metrics are exported or export only certain charts with filtering. You can also choose whether metrics are exported
as-collected, a normalized average, or the sum/volume of metrics values over the configured interval.

Exporting is an important part of Netdata's effort to be interoperable
with other monitoring software. You can use an external time-series database for long-term metrics retention, further
analysis, or correlation with other tools, such as application tracing.

## Supported databases

Netdata supports exporting metrics to the following databases through several
[connectors](/docs/agent/src/exporting#features). Once you find the connector that works for your database, open its
documentation and the [enabling a connector](/docs/agent/exporting-metrics/enable-an-exporting-connector) doc for details on enabling it.

- **AppOptics**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **AWS Kinesis**: [AWS Kinesis Data Streams](/docs/agent/src/exporting/aws_kinesis)
- **Azure Data Explorer**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **Azure Event Hubs**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **Blueflood**: [Graphite](/docs/agent/src/exporting/graphite)
- **Chronix**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **Cortex**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **CrateDB**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **ElasticSearch**: [Graphite](/docs/agent/src/exporting/graphite), [Prometheus remote
    write](/docs/agent/src/exporting/prometheus/remote_write)
- **Gnocchi**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **Google BigQuery**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **Google Cloud Pub/Sub**: [Google Cloud Pub/Sub Service](/docs/agent/src/exporting/pubsub)
- **Graphite**: [Graphite](/docs/agent/src/exporting/graphite), [Prometheus remote
    write](/docs/agent/src/exporting/prometheus/remote_write)
- **InfluxDB**: [Graphite](/docs/agent/src/exporting/graphite), [Prometheus remote
    write](/docs/agent/src/exporting/prometheus/remote_write)
- **IRONdb**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **JSON**: [JSON document databases](/docs/agent/src/exporting/json)
- **Kafka**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **KairosDB**: [Graphite](/docs/agent/src/exporting/graphite), [OpenTSDB](/docs/agent/src/exporting/opentsdb)
- **M3DB**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **MetricFire**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **MongoDB**: [MongoDB](/docs/agent/src/exporting/mongodb)
- **New Relic**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **OpenTSDB**: [OpenTSDB](/docs/agent/src/exporting/opentsdb), [Prometheus remote
    write](/docs/agent/src/exporting/prometheus/remote_write)
- **PostgreSQL**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
    via [PostgreSQL Prometheus Adapter](https://github.com/CrunchyData/postgresql-prometheus-adapter)
- **Prometheus**: [Prometheus scraper](/docs/agent/src/exporting/prometheus)
- **TimescaleDB**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write),
    [netdata-timescale-relay](/docs/agent/src/exporting/timescale)
- **QuasarDB**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **SignalFx**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **Splunk**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **TiKV**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **Thanos**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **VictoriaMetrics**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)
- **Wavefront**: [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)

Can't find your preferred external time-series database? Ask our [community](https://community.netdata.cloud/) for
solutions, or file an [issue on
GitHub](https://github.com/netdata/netdata/issues/new?assignees=&labels=bug%2Cneeds+triage&template=BUG_REPORT.yml).
