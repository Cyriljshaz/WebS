FROM python:3.8.13
WORKDIR /app
COPY . .

RUN tar -xzvf geckodriver-v0.31.0-linux32.tar.gz -C /usr/local/bin \
    && pip install -r requirements.txt \
    && tar -jxvf  firefox-101.0.1.tar.bz2 -C /usr/local/bin

CMD [ "python", "./main.py"] 