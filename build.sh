#!/bin/sh

rm -rf dist/*
npm build
if [ $? != 0 ] ; then
  echo "Build failed!"
  exit 1
fi

mkdir dist
cp -r src/html/* dist
mkdir dist/css
cp -r src/css dist/css
