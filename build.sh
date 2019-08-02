#!/bin/sh

rm -rf dist/*
npx webpack --config webpack.config.js

cp -r src/admin/html/* dist/admin
cp -r src/app/html/* dist/app
cp -r src/login/html/* dist/login

cp -r src/admin/css dist/admin/css
cp -r src/app/css dist/app/css
cp -r src/login/css dist/login/css
