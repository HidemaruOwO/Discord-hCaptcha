#!/bin/bash

function existsCmd () {
    type -a $1 > /dev/null 2>&1
}

if ! existsCmd yarn; then
  echo "Please install yarn"
  exit 0
fi

read -p 'Did you set values in "project_root/config/token.json, config.json"? (Y/n): ' IS_SET_VALUE

if [ "${IS_SET_VALUE,,}" = "y" ]; then
  read -p "Is this directory the project root? (Y/n): " IS_ROOT
  if [ "${IS_ROOT,,}" = "y" ]; then
    cd frontend
    yarn install
    yarn build
    cd ..
    cd backend
    cp -rf ../config ./src
    yarn install
    yarn build
    cd ..
    echo "Done."
  elif [ "${IS_ROOT,,}" = "n" ]; then
    echo "Please move the project root"
  else
    echo "Please press Y or n"
  fi
elif [ "${IS_SET_VALUE,,}" = "n" ]; then
  echo "Please set values in project_root/config/token.json, config.json"
else
  echo "Please press Y or n"
fi
