#!/bin/bash  
IMG_NAME="webscrapper"
PROC_NAME="proc_webscrapper"
PATHTOPROJ="C:\Users\sebas\Documents\WORK\webscrapper"

docker build -t $IMG_NAME .
docker rm -f $IMG_NAME
docker run --name $IMG_NAME -dp 3000:80 -v "$PATHTOPROJ:/usr/share/nginx/html" $IMG_NAME

docker ps

