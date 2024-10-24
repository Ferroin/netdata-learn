

If you need to access a Netdata agent's user interface or API in a production environment we recommend you put Netdata behind
another web server and secure access to the dashboard via SSL, user authentication and firewall rules.

A dedicated web server also provides more robustness and capabilities than the Agent's [internal web server](/docs/agent/src/web).

We have documented running behind
[nginx](/docs/agent/netdata-agent/configuration/running-the-netdata-agent-behind-a-reverse-proxy/running-behind-nginx),
[Apache](/docs/agent/netdata-agent/configuration/running-the-netdata-agent-behind-a-reverse-proxy/running-behind-apache),
[HAProxy](/docs/agent/netdata-agent/configuration/running-the-netdata-agent-behind-a-reverse-proxy/running-behind-haproxy),
[Lighttpd](/docs/agent/netdata-agent/configuration/running-the-netdata-agent-behind-a-reverse-proxy/running-behind-lighttpd),
[Caddy](/docs/agent/netdata-agent/configuration/running-the-netdata-agent-behind-a-reverse-proxy/running-behind-caddy),
and [H2O](/docs/agent/netdata-agent/configuration/running-the-netdata-agent-behind-a-reverse-proxy/running-behind-h2o).
If you prefer a different web server, we suggest you follow the documentation for nginx and tell us how you did it
 by adding your own "Running behind webserverX" document.

When you run Netdata behind a reverse proxy, we recommend you firewall protect all your Netdata servers, so that only the web server IP will be allowed to directly access Netdata. To do this, run this on each of your servers (or use your firewall manager):

```sh
PROXY_IP="1.2.3.4"
iptables -t filter -I INPUT -p tcp --dport 19999 \! -s ${PROXY_IP} -m conntrack --ctstate NEW -j DROP
```

The above will prevent anyone except your web server to access a Netdata dashboard running on the host.

You can also use `netdata.conf`:

```text
[web]
    allow connections from = localhost 1.2.3.4
```

Of course, you can add more IPs.
