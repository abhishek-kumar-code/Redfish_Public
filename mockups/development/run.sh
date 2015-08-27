#!/bin/sh

if command -v node > /dev/null; then
  node server.js
else
  echo "Install nodejs from http://nodejs.org"
fi
