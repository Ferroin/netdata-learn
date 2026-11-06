

This document provides a comprehensive comparison of IBM i monitoring solutions and their capabilities.

## Solutions Overview

### 1. Netdata IBM.d AS400 Module
**Repository**: https://github.com/netdata/netdata
**Language**: Go
**Connection**: ODBC (unixODBC + IBM i Access ODBC Driver)
**Architecture**: Direct ODBC connection with configurable reset statistics
**IBM i Version**: 7.2+ (enhanced features for 7.3+, 7.4+)
**Unique Features**:
- Real-time, high-resolution metrics
- Statistics reset control
- Cardinality management
- Extensive network, disk health, and HTTP server monitoring

### 2. Datadog IBM i Integration
**Repository**: https://github.com/DataDog/integrations-core/tree/master/ibm_i
**Language**: Python
**Connection**: ODBC (IBM i Access ODBC Driver)
**Architecture**: Subprocess-based query execution with connection pooling
**IBM i Version**: 7.2+ (enhanced support for 7.3+)
**Unique Features**:
- Message queue monitoring with severity filtering
- Job queue detail breakdown (released, scheduled, held)
- Normalized CPU metrics
- Job queue duration tracking

### 3. Prometheus JDBC Exporter (ThePrez)
**Repository**: https://github.com/ThePrez/prometheus-exporter-jdbc
**Language**: Java
**Connection**: JDBC (IBM JT400 bundled)
**Architecture**: Multi-threaded metric collection
**IBM i Version**: Any version with JDBC support
**Unique Features**:
- Custom SQL queries
- Multi-row/single-row modes
- Service Commander integration
- Interval-based or point-in-time collection

### 4. IBM i Remote Prometheus Monitoring (Chadys)
**Repository**: https://github.com/Chadys/ibmi-remote-prometeus-monitoring
**Language**: Python
**Connection**: ODBC (pyodbc)
**Architecture**: Prometheus client library with continuous refresh
**IBM i Version**: 7.2+ (gracefully handles version differences)
**Unique Features**:
- Prometheus-compliant naming
- Automatic unit conversion
- Graceful downtime handling
- Multi-server support

### 5. Check_AS400 Nagios Plugin
**Repository**: https://github.com/cjt74392/check_as400
**Language**: Java
**Connection**: Telnet (optionally SSL/TLS)
**Architecture**: Command-line plugin for Nagios
**IBM i Version**: 5.3+ (adaptations up to 7.3)
**Unique Features**:
- Multi-language support (EN/FR/DE/IT)
- iCluster/MIMIX high availability monitoring
- Job-specific checks and troubleshooting
- Problem management integration

### 6. IBM Nagios for i (Official) - ARCHIVED
**Repository**: https://github.com/IBM/nagios-for-i *(No longer maintained)*
**Language**: Java
**Connection**: JDBC (IBM JT400)
**Architecture**: Daemon server or standalone process
**IBM i Version**: 7.1+ (DiskConfig not supported in 7.5+)
**Unique Features**:
- SQL Services based monitoring
- Daemon mode for efficiency
- HMC monitoring support
- Nagios XI wizard integration

### 7. New Relic AS/400 Integration
**Repository**: https://github.com/newrelic-experimental/nri-as400
**Language**: Java
**Connection**: JT400 native APIs
**Architecture**: 5 separate OHI for New Relic Infrastructure
**IBM i Version**: Any version supporting JT400
**Unique Features**:
- Message queue checkpoint management
- Separate OHI components for modular deployment
- Detailed job-level monitoring with MSGW status
- Storage pool thread transition metrics

### 8. Uptime Infrastructure Monitor AS/400 Plugin
**Repository**: https://github.com/uptimesoftware/ibm-as400-monitor
**Language**: Java
**Connection**: JT400 native APIs with program calls
**Architecture**: Plugin for Uptime Infrastructure Monitor (v7.3-7.7)
**IBM i Version**: Any version supporting JT400
**Unique Features**:
- PTF (Program Temporary Fix) monitoring
- Multiple specialized monitor types
- Custom command execution (DRIFT/RTVASPPERC)
- Simple plugin-based deployment

### 9. Zabbix AS/400 Templates
**Repositories**:
- https://github.com/zabbix/community-templates
- https://github.com/muutech/zabbix-templates
**Language**: N/A (template configurations)
**Connection**: SNMP or Agent emulator (requires external implementation)
**Architecture**: Templates for Zabbix monitoring system (v3.0+)
**IBM i Version**: Depends on SNMP support or agent emulator
**Unique Features**:
- Process discovery
- Output queue monitoring
- SNMP-based memory monitoring
- *Note: Templates only - requires separate implementation*

## Metrics Comparison

### Legend
- ✅ = Fully supported
- ⚠️ = Partial support
- ❌ = Not supported
- 🔧 = Configurable/Custom
- 📊 = With performance data

### System & CPU Metrics

| Metric | Netdata | Datadog | Prometheus | Chadys | check_as400 | IBM Nagios | New Relic | Uptime | Zabbix |
|--------|---------|---------|------------|--------|-------------|------------|-----------|---------|--------|
| CPU Utilization | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️¹ |
| CPU Configuration | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| CPU Capacity | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| CPU Rate/Activity | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Min/Max CPU | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Per-Job CPU | ✅ | ✅ | 🔧 | ❌ | ✅ | ✅ | ✅ | ❌ | ⚠️¹ |
| Top CPU Jobs | ✅² | ❌ | 🔧 | ❌ | ✅ | ❌ | ❌ | ❌ | ⚠️¹ |

¹ *Depends on agent emulator implementation*
² *Enable `collect_active_jobs` to capture top CPU jobs*

### Memory & Storage Metrics

| Metric | Netdata | Datadog | Prometheus | Chadys | check_as400 | IBM Nagios | New Relic | Uptime | Zabbix |
|--------|---------|---------|------------|--------|-------------|------------|-----------|---------|--------|
| Memory Pools | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ⚠️¹ |
| Pool Threads | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Main Storage | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ⚠️² |
| Temp Storage | ✅ | ⚠️ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Storage Buckets | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Address Usage | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

¹ *Depends on agent emulator*
² *SNMP version supports via HOST-RESOURCES-MIB*

### Disk & ASP Metrics

| Metric | Netdata | Datadog | Prometheus | Chadys | check_as400 | IBM Nagios | New Relic | Uptime | Zabbix |
|--------|---------|---------|------------|--------|-------------|------------|-----------|---------|--------|
| Disk Busy | ✅ | ✅ | 🔧 | ❌ | ✅ | ❌ | ❌ | ❌ | ⚠️¹ |
| Disk I/O | ✅ | ✅ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️¹ |
| Disk Space | ✅ | ✅ | 🔧 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Disk Health | ✅ | ❌ | 🔧 | ❌ | ✅ | ⚠️² | ❌ | ❌ | ✅ |
| SSD Metrics | ✅ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ASP Usage | ✅ | ✅ | 🔧 | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ |
| ASP Storage | ✅ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

¹ *Depends on agent emulator*
² *Not supported in 7.5+*

### Job & Workload Metrics

| Metric | Netdata | Datadog | Prometheus | Chadys | check_as400 | IBM Nagios | New Relic | Uptime | Zabbix |
|--------|---------|---------|------------|--------|-------------|------------|-----------|---------|--------|
| Active Jobs | ✅ | ✅ | 🔧 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Job by Type | ✅ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Job Status | ✅ | ✅ | 🔧 | ❌ | ✅ | ✅ | ✅ | ✅ | ⚠️¹ |
| Job Queues | ✅ | ✅ | 🔧 | ❌ | ✅ | ❌ | ✅ | ✅ | ⚠️¹ |
| Subsystems | ✅ | ✅ | 🔧 | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Job Temp Storage | ✅ | ✅ | 🔧 | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Job Threads | ✅ | ❌ | 🔧 | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

¹ *Depends on agent emulator*

### Network & Messaging

| Metric | Netdata | Datadog | Prometheus | Chadys | check_as400 | IBM Nagios | New Relic | Uptime | Zabbix |
|--------|---------|---------|------------|--------|-------------|------------|-----------|---------|--------|
| Network Connections | ✅ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Network Interfaces | ✅ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| HTTP Servers | ✅ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Message Queues | ✅ | ✅ | 🔧 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Output Queues | ✅ | ❌ | 🔧 | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Message Checkpoints | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

### Special Features

| Feature | Netdata | Datadog | Prometheus | Chadys | check_as400 | IBM Nagios | New Relic | Uptime | Zabbix |
|---------|---------|---------|------------|--------|-------------|------------|-----------|---------|--------|
| HA Monitoring | ❌ | ❌ | ❌ | ❌ | ✅¹ | ❌ | ❌ | ❌ | ❌ |
| PTF Monitoring | ❌ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| System Values | ❌ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Plan Cache | ✅ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Custom SQL | ❌ | ⚠️ | ✅ | ⚠️ | ❌ | ✅ | ❌ | ⚠️² | ❌ |
| Problem Detection | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Long Running SQL | ❌ | ❌ | 🔧 | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Login Test | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |

¹ *MIMIX and iCluster support*
² *Custom commands like DRIFT/RTVASPPERC*

## Implementation Comparison

| Aspect | Netdata | Datadog | Prometheus | Chadys | check_as400 | IBM Nagios | New Relic | Uptime | Zabbix |
|--------|---------|---------|------------|--------|-------------|------------|-----------|---------|--------|
| **Deployment** | Plugin | Agent | Standalone | Standalone | Nagios Plugin | Nagios Plugin | NR OHI | Plugin | Template |
| **Multi-Server** | ✅ | ✅ | ❌¹ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️² |
| **Statistics Reset** | ✅ | ❌ | ✅ | ✅ | N/A | N/A | ✅ | ✅ | ⚠️² |
| **Auto-adapt Version** | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ⚠️² |
| **Daemon Mode** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ⚠️² |
| **Security** | 🔒 | 🔒 | 🔒 | 🔒 | ⚠️³ | 🔒 | 🔒 | 🔒 | ⚠️² |
| **Maintenance** | ✅ Active | ✅ Active | ✅ Active | ✅ Active | ✅ Active | ❌ Archived | ⚠️ Experimental | ❓ Unknown | N/A⁴ |

¹ *One remote server at a time*
² *Depends on agent emulator implementation*
³ *Telnet unencrypted by default, SSL/TLS optional*
⁴ *Template only, requires implementation*
🔒 *Encrypted connection*

## SQL Services & APIs Used

| Service/API | Netdata | Datadog | Prometheus | Chadys | check_as400 | IBM Nagios | New Relic | Uptime | Zabbix |
|-------------|---------|---------|------------|--------|-------------|------------|-----------|---------|--------|
| SYSTEM_STATUS() | ✅ | ✅ | 🔧 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| SYSTEM_ACTIVITY_INFO() | ✅ | ❌ | 🔧 | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| ACTIVE_JOB_INFO() | ✅ | ✅ | 🔧 | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| MEMORY_POOL() | ✅ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| MEMORY_POOL_INFO | ❌ | ✅ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| SYSDISKSTAT | ✅ | ✅ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| MESSAGE_QUEUE_INFO | ❌ | ✅ | 🔧 | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| NETSTAT_INFO | ✅ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| HTTP_SERVER_INFO | ✅ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| SYSTMPSTG | ✅ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| QWCRSSTS API | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| QUSRJOBI API | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Telnet/Screen Scraping | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| SNMP | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️¹ |

¹ *SNMP version available*
🔧 *Configurable via custom SQL*

## Unique Capabilities by Solution

**Netdata**:
- Network interface and HTTP server monitoring (exclusive)
- SSD health and age monitoring
- Comprehensive temporary storage tracking with buckets
- Plan cache monitoring
- Message and output queue metrics with cardinality safeguards
- Built-in cardinality limits to prevent metric explosion
- Statistics reset control

**Datadog**:
- Message severity filtering
- Job queue duration tracking
- Normalized CPU metrics

**Prometheus JDBC**:
- Full custom SQL support
- Multi-row/single-row collection modes
- Service Commander integration

**Chadys**:
- Automatic unit conversion to Prometheus standards
- Graceful downtime handling

**check_as400**:
- HA monitoring (MIMIX/iCluster)
- Problem detection and management
- Multi-language support (EN/FR/DE/IT)
- Login test capability

**New Relic**:
- Binary message queue checkpointing
- Storage pool thread transition metrics

**Uptime**:
- PTF (Program Temporary Fix) monitoring (exclusive)
- Custom command execution (DRIFT/RTVASPPERC)

**Zabbix**:
- Template-based configuration
- Process discovery
- SNMP support option

## Notes on IBM i Version Compatibility

All solutions adapt functionality based on IBM i version:
- **7.2**: Basic functionality for all solutions
- **7.3+**: Enhanced queries, active job info, subsystem monitoring
- **7.4+**: Full SYSTEM_STATUS() detailed info (Netdata)
- **Legacy (5.3-7.1)**: Only check_as400 fully supports
