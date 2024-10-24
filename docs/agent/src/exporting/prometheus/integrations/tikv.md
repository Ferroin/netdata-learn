<!--startmeta
custom_edit_url: "https://github.com/netdata/netdata/edit/master/src/exporting/prometheus/integrations/tikv.md"
meta_yaml: "https://github.com/netdata/netdata/edit/master/src/exporting/prometheus/metadata.yaml"
sidebar_label: "TiKV"
learn_status: "Published"
learn_rel_path: "Exporting Metrics"
message: "DO NOT EDIT THIS FILE DIRECTLY, IT IS GENERATED BY THE EXPORTER'S metadata.yaml FILE"
endmeta-->




<img src="https://netdata.cloud/img/tikv.png" width="150"/>


Use the Prometheus remote write exporting connector to archive your Netdata metrics to the external storage provider of your choice for long-term storage and further analysis.


<img src="https://img.shields.io/badge/maintained%20by-Netdata-%2300ab44" />

## Limitations

The remote write exporting connector does not support buffer on failures.


## Setup

### Prerequisites

#### 

- Netdata and the external storage provider of your choice, installed, configured and operational.
- `protobuf` and `snappy` libraries installed.
- Netdata reinstalled after the libraries.



### Configuration

#### File

The configuration file name for this integration is `exporting.conf`.


You can edit the configuration file using the [`edit-config`](https://github.com/netdata/netdata/blob/master/docs/netdata-agent/configuration/README.md#edit-a-configuration-file-using-edit-config) script from the
Netdata [config directory](https://github.com/netdata/netdata/blob/master/docs/netdata-agent/configuration/README.md#the-netdata-config-directory).

```bash
cd /etc/netdata 2>/dev/null || cd /opt/netdata/etc/netdata
sudo ./edit-config exporting.conf
```
#### Options

The following options can be defined for this exporter.

<details open><summary>Config options</summary>

| Name | Description | Default | Required |
|:----|:-----------|:-------|:--------:|
| enabled | Enables or disables an exporting connector instance (yes/no). | no | yes |
| destination | Accepts a space separated list of hostnames, IPs (IPv4 and IPv6) and ports to connect to. Netdata will use the first available to send the metrics. | no | yes |
| username | Username for HTTP authentication | my_username | no |
| password | Password for HTTP authentication | my_password | no |
| data source | Selects the kind of data that will be sent to the external database. (as collected/average/sum) |  | no |
| hostname | The hostname to be used for sending data to the external database server. | [global].hostname | no |
| prefix | The prefix to add to all metrics. | netdata | no |
| update every | Frequency of sending sending data to the external database, in seconds. | 10 | no |
| buffer on failures | The number of iterations (`update every` seconds) to buffer data, when the external database server is not available. | 10 | no |
| timeout ms | The timeout in milliseconds to wait for the external database server to process the data. | 20000 | no |
| send hosts matching | Hosts filter. Determines which hosts will be sent to the external database. The syntax is [simple patterns](https://github.com/netdata/netdata/tree/master/src/libnetdata/simple_pattern#simple-patterns). | localhost * | no |
| send charts matching | One or more space separated patterns (use * as wildcard) checked against both chart id and chart name. | * | no |
| send names instead of ids | Controls the metric names Netdata should send to the external database (yes/no). |  | no |
| send configured labels | Controls if host labels defined in the `[host labels]` section in `netdata.conf` should be sent to the external database (yes/no). |  | no |
| send automatic labels | Controls if automatically created labels, like `_os_name` or `_architecture` should be sent to the external database (yes/no). |  | no |

##### destination

The format of each item in this list, is: [PROTOCOL:]IP[:PORT].
- PROTOCOL can be udp or tcp. tcp is the default and only supported by the current exporting engine.
- IP can be XX.XX.XX.XX (IPv4), or [XX:XX...XX:XX] (IPv6). For IPv6 you can to enclose the IP in [] to separate it from the port.
- PORT can be a number of a service name. If omitted, the default port for the exporting connector will be used.

Example IPv4:
  ```yaml
  destination = 10.11.14.2:2003 10.11.14.3:4242 10.11.14.4:2003
  ```
Example IPv6 and IPv4 together:
```yaml
destination = [ffff:...:0001]:2003 10.11.12.1:2003
```
When multiple servers are defined, Netdata will try the next one when the previous one fails.


##### update every

Netdata will add some randomness to this number, to prevent stressing the external server when many Netdata servers
send data to the same database. This randomness does not affect the quality of the data, only the time they are sent.


##### buffer on failures

If the server fails to receive the data after that many failures, data loss on the connector instance is expected (Netdata will also log it).


##### send hosts matching

Includes one or more space separated patterns, using * as wildcard (any number of times within each pattern).
The patterns are checked against the hostname (the localhost is always checked as localhost), allowing us to
filter which hosts will be sent to the external database when this Netdata is a central Netdata aggregating multiple hosts.

A pattern starting with `!` gives a negative match. So to match all hosts named `*db*` except hosts containing `*child*`,
use `!*child* *db*` (so, the order is important: the first pattern matching the hostname will be used - positive or negative).


##### send charts matching

A pattern starting with ! gives a negative match. So to match all charts named apps.* except charts ending in *reads,
use !*reads apps.* (so, the order is important: the first pattern matching the chart id or the chart name will be used,
positive or negative). There is also a URL parameter filter that can be used while querying allmetrics. The URL parameter
has a higher priority than the configuration option.


##### send names instead of ids

Netdata supports names and IDs for charts and dimensions. Usually IDs are unique identifiers as read by the system and names
are human friendly labels (also unique). Most charts and metrics have the same ID and name, but in several cases they are
different : disks with device-mapper, interrupts, QoS classes, statsd synthetic charts, etc.


</details>

#### Examples

##### Example configuration

Basic example configuration for Prometheus remote write.

```yaml
[prometheus_remote_write:my_instance]
    enabled = yes
    destination = 10.11.14.2:2003
    remote write URL path = /receive

```
##### Example configuration with HTTPS and HTTP authentication

Add `:https` modifier to the connector type if you need to use the TLS/SSL protocol. For example: `remote_write:https:my_instance`.

```yaml
[prometheus_remote_write:https:my_instance]
    enabled = yes
    destination = 10.11.14.2:2003
    remote write URL path = /receive
    username = my_username
    password = my_password

```
