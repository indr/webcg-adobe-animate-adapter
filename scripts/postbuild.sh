#!/usr/bin/env bash

cp dist/*.umd.js docs/
cd dist
zip webcg-adobe-animate-adapter-$npm_package_version.zip *.js
cd ..
