<!--startmeta
custom_edit_url: "https://github.com/netdata/netdata/edit/master/src/health/notifications/messagebird/README.md"
meta_yaml: "https://github.com/netdata/netdata/edit/master/src/health/notifications/messagebird/metadata.yaml"
sidebar_label: "MessageBird"
learn_status: "Published"
learn_rel_path: "Alerts & Notifications/Notifications/Agent Dispatched Notifications"
message: "DO NOT EDIT THIS FILE DIRECTLY, IT IS GENERATED BY THE NOTIFICATION'S metadata.yaml FILE"
endmeta-->




<img src="https://netdata.cloud/img/messagebird.svg" width="150"/>


Send notifications to MessageBird using Netdata's Agent alert notification feature, which supports dozens of endpoints, user roles, and more.



<img src="https://img.shields.io/badge/maintained%20by-Netdata-%2300ab44" />

## Setup

### Prerequisites

#### 

- An access key under 'API ACCESS (REST)' (you will want a live key), you can read more [here](https://developers.messagebird.com/quickstarts/sms/test-credits-api-keys/).
- Access to the terminal where Netdata Agent is running



### Configuration

#### File

The configuration file name for this integration is `health_alarm_notify.conf`.


You can edit the configuration file using the [`edit-config`](https://github.com/netdata/netdata/blob/master/docs/netdata-agent/configuration/README.md#edit-a-configuration-file-using-edit-config) script from the
Netdata [config directory](https://github.com/netdata/netdata/blob/master/docs/netdata-agent/configuration/README.md#the-netdata-config-directory).

```bash
cd /etc/netdata 2>/dev/null || cd /opt/netdata/etc/netdata
sudo ./edit-config health_alarm_notify.conf
```
#### Options

The following options can be defined for this notification

<details open><summary>Config Options</summary>

| Name | Description | Default | Required |
|:----|:-----------|:-------|:--------:|
| SEND_MESSAGEBIRD | Set `SEND_MESSAGEBIRD` to YES | YES | yes |
| MESSAGEBIRD_ACCESS_KEY | Set `MESSAGEBIRD_ACCESS_KEY` to your API key. |  | yes |
| MESSAGEBIRD_NUMBER | Set `MESSAGEBIRD_NUMBER` to the MessageBird number you want to use for the alert. |  | yes |
| DEFAULT_RECIPIENT_MESSAGEBIRD | Set `DEFAULT_RECIPIENT_MESSAGEBIRD` to the number you want the alert notification to be sent as an SMS. You can define multiple recipients like this: +15555555555 +17777777777. |  | yes |

##### DEFAULT_RECIPIENT_MESSAGEBIRD

All roles will default to this variable if left unconfigured.

You can then have different recipients per role, by editing `DEFAULT_RECIPIENT_MESSAGEBIRD` with the number you want, in the following entries at the bottom of the same file:
```text
role_recipients_messagebird[sysadmin]="+15555555555"
role_recipients_messagebird[domainadmin]="+15555555556"
role_recipients_messagebird[dba]="+15555555557"
role_recipients_messagebird[webmaster]="+15555555558"
role_recipients_messagebird[proxyadmin]="+15555555559"
role_recipients_messagebird[sitemgr]="+15555555550"
```


</details>

#### Examples

##### Basic Configuration



```yaml
#------------------------------------------------------------------------------
# Messagebird (messagebird.com) SMS options

SEND_MESSAGEBIRD="YES"
MESSAGEBIRD_ACCESS_KEY="XXXXXXXX"
MESSAGEBIRD_NUMBER="XXXXXXX"
DEFAULT_RECIPIENT_MESSAGEBIRD="+15555555555"

```


## Troubleshooting

### Test Notification

You can run the following command by hand, to test alerts configuration:

```bash
# become user netdata
sudo su -s /bin/bash netdata

# enable debugging info on the console
export NETDATA_ALARM_NOTIFY_DEBUG=1

# send test alarms to sysadmin
/usr/libexec/netdata/plugins.d/alarm-notify.sh test

# send test alarms to any role
/usr/libexec/netdata/plugins.d/alarm-notify.sh test "ROLE"
```

Note that this will test _all_ alert mechanisms for the selected role.

