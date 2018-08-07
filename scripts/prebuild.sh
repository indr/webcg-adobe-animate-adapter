#!/usr/bin/env bash

mkdir -p dist
rm -rf dist/*
cp node_modules/webcg-framework/dist/webcg-devtools.umd.js dist/
cp adobe-animate/* dist/
