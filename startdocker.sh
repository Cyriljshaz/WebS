#!/bin/bash  
IMG_NAME="seblrd/webscrapper"
PROC_NAME="proc_webscrapper"
PATHTOPROJ="C:\Users\sebas\Documents\WORK\webscrapper"

docker build -t $IMG_NAME .
docker rm -f $IMG_NAME
#docker run --name $IMG_NAME -dp 3000:80 -v "$PATHTOPROJ:/usr/share/nginx/html" $IMG_NAME
docker-compose up -d
#docker ps

