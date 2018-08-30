#!/usr/bin/env bash

mkdir -p dist
rm -rf dist/*
cp node_modules/webcg-devtools/dist/webcg-devtools.umd.js dist/
cp adobe-animate/* dist/
