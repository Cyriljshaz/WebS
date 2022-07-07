#!/bin/bash
IMG_NAME="seblrd/puppeteer"
PROC_NAME="puppeteer"
PATHTOPROJ="C:/Users/sebas/Documents/WORK/webscrapper/puppeteer"

# docker run -d -p 4444:4444 --shm-size="2g" --rm selenium/standalone-chrome:4.2.2-20220609


docker build -t $IMG_NAME .
# docker rm -f $IMG_NAME
# docker run  -v /mnt/c/Users/sebas/Documents/WORK/webscrapper/puppeteer:/app/puppeteer -it --rm --name $PROC_NAME $IMG_NAME 

#docker run -it --rm -v C:\Users\sebas\Documents\WORK\webscrapper\puppeteer/:/app seblrd/puppeteer index.js