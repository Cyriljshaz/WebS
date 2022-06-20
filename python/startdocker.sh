#!/bin/bash  
IMG_NAME="seblrd/webscrap_python"
PROC_NAME="webscrap_python"
PATHTOPROJ="C:/Users/sebas/Documents/WORK/webscrapper/python"

# docker run -d -p 4444:4444 --shm-size="2g" --rm selenium/standalone-chrome:4.2.2-20220609


docker rm -f $IMG_NAME
docker build -t $IMG_NAME .
docker run -it --rm --name $PROC_NAME $IMG_NAME 

# docker run -it --rm --name webscrap_python seblrd/webscrap_python