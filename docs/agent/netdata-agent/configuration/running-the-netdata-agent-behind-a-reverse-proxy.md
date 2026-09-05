

:::tip Simpler Alternative for Netdata Cloud Users

If you use Netdata Cloud (free or paid), consider [Bearer Token Protection](/docs/agent/netdata-agent/configuration/secure-your-netdata-agent-with-bearer-token) instead. With a single setting (`bearer token protection = yes`), you get:

- **Cloud SSO authentication** - Users sign in through Netdata Cloud
- **Role-based access** - Cloud roles apply to direct agent access
- **No proxy setup required** - No nginx, Apache, or htpasswd configuration

Reverse proxy setup is still valuable if you need custom authentication, don't use Netdata Cloud, or require offline access.

:::

You can improve security and capabilities by running your Netdata Agent behind another web server in production environments. This approach lets you secure access to the dashboard with SSL, user authentication, and firewall rules while providing more robustness and capabilities than the Agent's [internal web server](/docs/agent/src/web).

## Supported Reverse Proxy Solutions

We have documented configuration guides for these web servers:

- [nginx](/docs/agent/netdata-agent/configuration/running-the-netdata-agent-behind-a-reverse-proxy/running-behind-nginx)
- [Apache](/docs/agent/netdata-agent/configuration/running-the-netdata-agent-behind-a-reverse-proxy/running-behind-apache)
- [HAProxy](/docs/agent/netdata-agent/configuration/running-the-netdata-agent-behind-a-reverse-proxy/running-behind-haproxy)
- [Lighttpd](/docs/agent/netdata-agent/configuration/running-the-netdata-agent-behind-a-reverse-proxy/running-behind-lighttpd)
- [Caddy](/docs/agent/netdata-agent/configuration/running-the-netdata-agent-behind-a-reverse-proxy/running-behind-caddy)
- [H2O](/docs/agent/netdata-agent/configuration/running-the-netdata-agent-behind-a-reverse-proxy/running-behind-h2o)

:::tip

If you prefer a different web server, we suggest you follow the nginx documentation and tell us how you did it by adding your own "Running behind webserverX" document.

:::

## Secure Direct Access to Netdata

After setting up your reverse proxy, you should firewall protect all your Netdata servers so that only the web server IP can directly access Netdata.

### Method 1: Using Firewall Rules

You can use iptables to block direct access. Run this on each of your servers (or use your firewall manager):

```bash
PROXY_IP="1.2.3.4"
iptables -t filter -I INPUT -p tcp --dport 19999 \! -s ${PROXY_IP} -m conntrack --ctstate NEW -j DROP
```

This prevents anyone except your web server from accessing a Netdata dashboard running on the host.

### Method 2: Using Netdata Configuration

You can also configure access control in `netdata.conf`:

```text
[web]
    allow connections from = localhost 1.2.3.4
```

You can add more IPs as needed to this setting.
