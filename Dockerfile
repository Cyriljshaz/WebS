FROM nginx:stable-perl
COPY . /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
