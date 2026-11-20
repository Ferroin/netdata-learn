

Netdata natively provides long-term metrics retention through its tiered database design. This architecture delivers significantly longer retention (months to years) and faster queries (typically 20+ times faster) compared to other common time-series databases.

For integration with other observability tools, Netdata includes exporters that copy metrics to third-party time-series databases for additional analysis or integration with other tools.

## Exporting Capabilities

The exporting engine provides these key features:

- **Multi-database support**: Export to [more than thirty](#supported-databases) databases including InfluxDB, Prometheus, Graphite, ElasticSearch, and more
- **Downsampling**: Configure export intervals from Netdata's per-second metrics (e.g., per minute)
- **Simultaneous exports**: Send metrics to multiple time-series databases at once
- **Flexible data processing**: Export metrics as-collected, normalized averages, or sum/volume over configured intervals
- **Selective exporting**: Filter specific charts based on your needs and allocated resources

## Supported Databases

Netdata exports metrics to the following databases through various [connectors](/docs/agent/src/exporting#supported-connectors). Each connector includes documentation with [enabling instructions](/docs/agent/exporting-metrics/enable-an-exporting-connector).

|         Database         |                                                                             Supported Connectors                                                                              |
|:------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|      **AppOptics**       |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|     **AWS Kinesis**      |                                                       [AWS Kinesis Data Streams](/docs/agent/src/exporting/aws_kinesis)                                                        |
| **Azure Data Explorer**  |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|   **Azure Event Hubs**   |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|      **Blueflood**       |                                                                 [Graphite](/docs/agent/src/exporting/graphite)                                                                 |
|       **Chronix**        |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|        **Cortex**        |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|       **CrateDB**        |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|    **ElasticSearch**     |                          [Graphite](/docs/agent/src/exporting/graphite), [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                           |
|       **Gnocchi**        |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|   **Google BigQuery**    |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
| **Google Cloud Pub/Sub** |                                                        [Google Cloud Pub/Sub Service](/docs/agent/src/exporting/pubsub)                                                        |
|       **Graphite**       |                          [Graphite](/docs/agent/src/exporting/graphite), [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                           |
|       **InfluxDB**       |                          [Graphite](/docs/agent/src/exporting/graphite), [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                           |
|        **IRONdb**        |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|         **JSON**         |                                                           [JSON document databases](/docs/agent/src/exporting/json)                                                            |
|        **Kafka**         |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|       **KairosDB**       |                                         [Graphite](/docs/agent/src/exporting/graphite), [OpenTSDB](/docs/agent/src/exporting/opentsdb)                                          |
|         **M3DB**         |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|      **MetricFire**      |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|       **MongoDB**        |                                                                  [MongoDB](/docs/agent/src/exporting/mongodb)                                                                  |
|      **New Relic**       |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|       **OpenTSDB**       |                          [OpenTSDB](/docs/agent/src/exporting/opentsdb), [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                           |
|      **PostgreSQL**      | [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write) via [PostgreSQL Prometheus Adapter](https://github.com/CrunchyData/postgresql-prometheus-adapter) |
|      **Prometheus**      |                                                           [Prometheus scraper](/docs/agent/src/exporting/prometheus)                                                           |
|     **TimescaleDB**      |                      [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write), [netdata-timescale-relay](/docs/agent/src/exporting/timescale)                      |
|       **QuasarDB**       |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|       **SignalFx**       |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|        **Splunk**        |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|         **TiKV**         |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|        **Thanos**        |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|   **VictoriaMetrics**    |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |
|      **Wavefront**       |                                                  [Prometheus remote write](/docs/agent/src/exporting/prometheus/remote_write)                                                  |

:::tip

**Can't find your preferred external time-series database?** Ask our [community](https://community.netdata.cloud/) for solutions, or file an [issue on GitHub](https://github.com/netdata/netdata/issues/new?assignees=&labels=bug%2Cneeds+triage&template=BUG_REPORT.yml).

:::
