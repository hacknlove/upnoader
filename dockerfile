FROM pykiss/node
MAINTAINER hacknlove

ADD node_modules /src/
ADD index.js /src/

ADD start.sh /src/

WORKDIR /src

CMD start
