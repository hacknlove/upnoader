FROM pykiss/node
MAINTAINER hacknlove

VOLUME /uploads

ADD package.json /src/
ADD index.js /src/
ADD start.sh /src/
WORKDIR /src

RUN cd /src && npm install 


CMD /src/start.sh
