#!/bin/sh

if [ -z $CECTF_SERVER_DOMAIN ]; then
  echo "Assuming default value for CECTF_SERVER_DOMAIN"
  #set "http://localhost:5001"
  set "";
fi

if [ -n "$1" ]; then
  echo "Setting CECTF_SERVER_DOMAIN=$1"
  export CECTF_SERVER_DOMAIN="$1"
else
  echo "env CECTF_SERVER_DOMAIN=$CECTF_SERVER_DOMAIN"
fi

rm -rf dist
mkdir dist
npm run build-dev
if [ $? != 0 ] ; then
  echo "Build failed!"
  exit 1
fi

cp -r src/html/* dist
cp -r src/css dist/css
