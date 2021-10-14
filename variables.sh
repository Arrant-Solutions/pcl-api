#!/bin/bash

heroku config:set DATABASE_URL=postgres://nctdoqvbfwdsfo:ce79098213f552d87731f23befe05e26867a519c1cad671b849f81f7723c996d@ec2-54-90-211-192.compute-1.amazonaws.com:5432/dd8hk4b1uh70sh
heroku config:set HOST=ec2-54-90-211-192.compute-1.amazonaws.com
heroku config:set DATABASE_NAME=dd8hk4b1uh70sh
heroku config:set USER=nctdoqvbfwdsfo
heroku config:set PASSWORD=ce79098213f552d87731f23befe05e26867a519c1cad671b849f81f7723c996d
heroku config:set PG_PORT=5432
heroku config:set API_VERSION=v1.0
heroku config:set ENV=production
heroku config:set env=production
heroku config:set environment=production

heroku config:set PORT=9000

heroku config:set JWT_SECRET_KEY='g4+[!(G]NNK_akGkEj/)8gPJy*g);fDfY=kh~`fq/NgQk`>9)3^MVBaEUQt~\`y-'
heroku config:set JWT_EXPIRY='90d'

PUBLIC_KEY=`cat keys/public-key.pem`
heroku config:set PUBLIC_KEY="$PUBLIC_KEY"

PRIVATE_KEY=`cat keys/private-key.pem` 
heroku config:set PRIVATE_KEY="$PRIVATE_KEY"

heroku config:set GOOGLE_APPLICATION_CREDENTIALS=/Users/willymilimo/Workspace/pcl-api/keys/pcl-service.json