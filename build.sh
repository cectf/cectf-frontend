#!/bin/sh

rm -rf dist/*
mkdir dist
echo "Building!"
npm build
echo "Built!"
ls
ls dist
if [ $? != 0 ] ; then
  echo "Build failed!"
  exit 1
fi

mkdir dist
cp -r src/html/* dist
mkdir dist/css
cp -r src/css dist/css
