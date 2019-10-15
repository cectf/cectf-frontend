#!/bin/bash

rm -rf dist
mkdir dist

if [[ $1 == "prod" ]]; then
  npm run build-prod
elif [[ $1 == "dev" ]]; then
  npm run build-dev
else
  echo "Assuming prod environment..."
  npm run build-prod
fi

if [ $? != 0 ] ; then
  echo "Build failed!"
  exit 1
fi

cp -r src/html/* dist
#cp -r src/css dist/css
