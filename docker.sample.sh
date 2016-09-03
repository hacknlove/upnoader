docker stop upnoader
docker rm upnoader
docker run \
  -it \
  --name upnoader \
  -v $PWD:/src \
  -p 127.0.0.1:35194:35194 \
  -e IP='0.0.0.0' \
  -e PORT=35194 \
  -e MAXSIZE=5000mb \
  -v $PWD/files/:/uploads \
  pykiss/node
