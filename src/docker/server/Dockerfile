FROM python:3.8-bookworm
WORKDIR /src

RUN apt update && apt upgrade -y
COPY . /src

RUN pip install -r /src/docker/server/requirements.txt

CMD python /src/Server/server.py
EXPOSE 4000