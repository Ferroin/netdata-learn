<!--startmeta
custom_edit_url: "https://github.com/netdata/go.d.plugin/edit/master/modules/phpdaemon/README.md"
meta_yaml: "https://github.com/netdata/go.d.plugin/edit/master/modules/phpdaemon/metadata.yaml"
sidebar_label: "phpDaemon"
learn_status: "Published"
learn_rel_path: "Collecting Metrics/APM"
most_popular: False
message: "DO NOT EDIT THIS FILE DIRECTLY, IT IS GENERATED BY THE COLLECTOR'S metadata.yaml FILE"
endmeta-->




<img src="https://netdata.cloud/img/php.svg" width="150"/>


Plugin: go.d.plugin
Module: phpdaemon

<img src="https://img.shields.io/badge/maintained%20by-Netdata-%2300ab44" />

## Overview

This collector monitors phpDaemon instances.




This collector is supported on all platforms.

This collector supports collecting metrics from multiple instances of this integration, including remote instances.


### Default Behavior

#### Auto-Detection

This integration doesn't support auto-detection.

#### Limits

The default configuration for this integration does not impose any limits on data collection.

#### Performance Impact

The default configuration for this integration is not expected to impose a significant performance impact on the system.


## Metrics

Metrics grouped by *scope*.

The scope defines the instance that the metric belongs to. An instance is uniquely identified by a set of labels.



### Per phpDaemon instance

These metrics refer to the entire monitored application.

This scope has no labels.

Metrics:

| Metric | Dimensions | Unit |
|:------|:----------|:----|
| phpdaemon.workers | alive, shutdown | workers |
| phpdaemon.alive_workers | idle, busy, reloading | workers |
| phpdaemon.idle_workers | preinit, init, initialized | workers |
| phpdaemon.uptime | time | seconds |



## Alerts

There are no alerts configured by default for this integration.


## Setup

### Prerequisites

#### Enable phpDaemon's HTTP server

Statistics expected to be in JSON format.

<details>
<summary>phpDaemon configuration</summary>

Instruction from [@METAJIJI](https://github.com/METAJIJI).

To enable `phpd` statistics on http, you must enable the http server and write an application.
Application is important, because standalone application [ServerStatus.php](https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/Applications/ServerStatus.php) provides statistics in html format and unusable for `netdata`.

```php
// /opt/phpdaemon/conf/phpd.conf

path /opt/phpdaemon/conf/AppResolver.php;
Pool:HTTPServer {
    privileged;
    listen '127.0.0.1';
    port 8509;
}
```

```php
// /opt/phpdaemon/conf/AppResolver.php

<?php

class MyAppResolver extends \PHPDaemon\Core\AppResolver {
    public function getRequestRoute($req, $upstream) {
        if (preg_match('~^/(ServerStatus|FullStatus)/~', $req->attrs->server['DOCUMENT_URI'], $m)) {
            return $m[1];
        }
    }
}

return new MyAppResolver;
```

```php
/opt/phpdaemon/conf/PHPDaemon/Applications/FullStatus.php

<?php
namespace PHPDaemon\Applications;

class FullStatus extends \PHPDaemon\Core\AppInstance {
    public function beginRequest($req, $upstream) {
        return new FullStatusRequest($this, $upstream, $req);
    }
}
```

```php
// /opt/phpdaemon/conf/PHPDaemon/Applications/FullStatusRequest.php

<?php
namespace PHPDaemon\Applications;

use PHPDaemon\Core\Daemon;
use PHPDaemon\HTTPRequest\Generic;

class FullStatusRequest extends Generic {
    public function run() {
        $stime = microtime(true);
        $this->header('Content-Type: application/javascript; charset=utf-8');

        $stat = Daemon::getStateOfWorkers();
        $stat['uptime'] = time() - Daemon::$startTime;
        echo json_encode($stat);
    }
}
```

</details>



### Configuration

#### File

The configuration file name for this integration is `go.d/phpdaemon.conf`.


You can edit the configuration file using the `edit-config` script from the
Netdata [config directory](https://github.com/netdata/netdata/blob/master/docs/netdata-agent/configuration.md#the-netdata-config-directory).

```bash
cd /etc/netdata 2>/dev/null || cd /opt/netdata/etc/netdata
sudo ./edit-config go.d/phpdaemon.conf
```
#### Options

The following options can be defined globally: update_every, autodetection_retry.


<details><summary>Config options</summary>

| Name | Description | Default | Required |
|:----|:-----------|:-------|:--------:|
| update_every | Data collection frequency. | 1 | no |
| autodetection_retry | Recheck interval in seconds. Zero means no recheck will be scheduled. | 0 | no |
| url | Server URL. | http://127.0.0.1:8509/FullStatus | yes |
| timeout | HTTP request timeout. | 2 | no |
| username | Username for basic HTTP authentication. |  | no |
| password | Password for basic HTTP authentication. |  | no |
| proxy_url | Proxy URL. |  | no |
| proxy_username | Username for proxy basic HTTP authentication. |  | no |
| proxy_password | Password for proxy basic HTTP authentication. |  | no |
| method | HTTP request method. | GET | no |
| body | HTTP request body. |  | no |
| headers | HTTP request headers. |  | no |
| not_follow_redirects | Redirect handling policy. Controls whether the client follows redirects. | no | no |
| tls_skip_verify | Server certificate chain and hostname validation policy. Controls whether the client performs this check. | no | no |
| tls_ca | Certification authority that the client uses when verifying the server's certificates. |  | no |
| tls_cert | Client TLS certificate. |  | no |
| tls_key | Client TLS key. |  | no |

</details>

#### Examples

##### Basic

A basic example configuration.

<details><summary>Config</summary>

```yaml
jobs:
  - name: local
    url: http://127.0.0.1:8509/FullStatus

```
</details>

##### HTTP authentication

HTTP authentication.

<details><summary>Config</summary>

```yaml
jobs:
  - name: local
    url: http://127.0.0.1:8509/FullStatus
    username: username
    password: password

```
</details>

##### HTTPS with self-signed certificate

HTTPS with self-signed certificate.

<details><summary>Config</summary>

```yaml
jobs:
  - name: local
    url: http://127.0.0.1:8509/FullStatus
    tls_skip_verify: yes

```
</details>

##### Multi-instance

> **Note**: When you define multiple jobs, their names must be unique.

Collecting metrics from local and remote instances.


<details><summary>Config</summary>

```yaml
jobs:
  - name: local
    url: http://127.0.0.1:8509/FullStatus

  - name: remote
    url: http://192.0.2.1:8509/FullStatus

```
</details>



## Troubleshooting

### Debug Mode

To troubleshoot issues with the `phpdaemon` collector, run the `go.d.plugin` with the debug option enabled. The output
should give you clues as to why the collector isn't working.

- Navigate to the `plugins.d` directory, usually at `/usr/libexec/netdata/plugins.d/`. If that's not the case on
  your system, open `netdata.conf` and look for the `plugins` setting under `[directories]`.

  ```bash
  cd /usr/libexec/netdata/plugins.d/
  ```

- Switch to the `netdata` user.

  ```bash
  sudo -u netdata -s
  ```

- Run the `go.d.plugin` to debug the collector:

  ```bash
  ./go.d.plugin -d -m phpdaemon
  ```

