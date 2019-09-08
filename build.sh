#!/bin/sh

rm -rf dist/*
npm build
if [ $? != 0 ] ; then
  echo "Build failed!"
  exit 1
fi

cp -r src/html/* dist
cp -r src/css dist/css
