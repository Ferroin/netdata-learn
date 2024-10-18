

Netdata can be installed:

- [As a DEB/RPM package](/docs/agent/packaging/installer/methods/packages)
- [As a static binary](/docs/agent/packaging/makeself)
- [From a git checkout](/docs/agent/packaging/installer/methods/manual)
- [As a docker container](/docs/agent/packaging/docker)

The [one line installer kickstart.sh](/docs/agent/packaging/installer/methods/kickstart)
picks the most appropriate method out of the first three for any system
and is the recommended installation method, if you don't use containers.

`kickstart.sh` can also be used for [offline installation](/docs/agent/packaging/installer/methods/offline), suitable for air-gapped systems.
