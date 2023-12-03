#!/bin/bash

if [ 1 -ne $# ]; then
  echo "No arguments provided" >&2
  exit 1
fi

cp -r template $1
