FROM pykiss/node
MAINTAINER hacknlove

ADD index.js /src/
ADD start.sh /src/

run npm install

WORKDIR /src

CMD start
