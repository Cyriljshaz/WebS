FROM ubuntu
ENV DEBIAN_FRONTEND=noninteractive
RUN mkdir app
WORKDIR /app


RUN apt-get update
# RUN apt-get install apache2 -y
# RUN apt-get install apache2-utils -y

RUN apt install nodejs -y
RUN apt install npm -y
RUN npm i axios
COPY "./" "./site/"
EXPOSE 82