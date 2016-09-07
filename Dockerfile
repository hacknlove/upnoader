FROM pykiss/node
MAINTAINER hacknlove

ADD index.js /src/
ADD start.sh /src/

run npm install

VOLUME /uploads
WORKDIR /src

CMD /src/start.sh
