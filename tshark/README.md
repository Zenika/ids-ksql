# Build

```
docker build -t tshark .
```

# Run

```
docker run --net=host  -v $PWD/data/logs:/logs -it --rm --privileged tshark
```
