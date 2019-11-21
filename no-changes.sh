#!/bin/bash

if [ -n "$(git status --porcelain)" ]; then
  echo "There are uncommitted changes";
  exit 1;
else
  echo "No uncommitted changes";
  exit 0;
fi