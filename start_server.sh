#!/bin/sh

# change to 766

cp -f .env.dev .env.local

docker-compose down --rmi all
docker-compose up -d --build

docker volume prune -f
