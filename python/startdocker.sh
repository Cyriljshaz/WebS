#!/bin/bash  
IMG_NAME="seblrd/webscrap_python"
PROC_NAME="webscrap_python"
PATHTOPROJ="C:/Users/sebas/Documents/WORK/webscrapper/python"
export DOCKER_BUILDKIT=0
export COMPOSE_DOCKER_CLI_BUILD=0
# docker build -t $IMG_NAME .
# docker rm -f $IMG_NAME
docker run --name $PROC_NAME --rm -it -v /mnt/c/Users/sebas/Documents/WORK/webscrapper/python:/app $IMG_NAME bash
