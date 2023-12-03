#!/bin/bash

# Get the first argument
OPTIND=1

# If no arguments are provided, print an error message
if [ 1 -ne $# ]; then
  echo "No arguments provided" >&2
  exit 1
fi

cp -r template $1
