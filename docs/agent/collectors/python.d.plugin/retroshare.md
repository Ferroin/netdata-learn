---
title: "RetroShare monitoring with Netdata"
custom_edit_url: https://github.com/netdata/netdata/edit/master/collectors/python.d.plugin/retroshare/README.md
---



Monitors application bandwidth, peers and DHT metrics. 

This module will monitor one or more `RetroShare` applications, depending on your configuration.

## Charts

This module produces the following charts:

-   Bandwidth in `kilobits/s`
-   Peers in `peers`
-   DHT in `peers`


## Configuration

Edit the `python.d/retroshare.conf` configuration file using `edit-config` from the your agent's [config
directory](/docs/agent/step-by-step/step-04#find-your-netdataconf-file), which is typically at `/etc/netdata`.

```bash
cd /etc/netdata   # Replace this path with your Netdata config directory, if different
sudo ./edit-config python.d/retroshare.conf
```

Here is an example for 2 servers:

```yaml
localhost:
  url      : 'http://localhost:9090'
  user     : "user"
  password : "pass"

remote:
  url      : 'http://203.0.113.1:9090'
  user     : "user"
  password : "pass"
```
---

