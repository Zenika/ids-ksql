# Build

```
docker build -t tshark .
```

# Run

On default interface (first non-loopback):
```
docker run --net=host  -v $PWD/data/logs:/logs -it --rm --privileged tshark
```

Specify interface
```
docker run --net=host  -v $PWD/data/logs:/logs -e INTERFACE=eth1 -it --rm --privileged tshark
```
