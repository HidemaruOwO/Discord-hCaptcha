#!/bin/bash

function existsCmd () {
    type -a $1 > /dev/null 2>&1
}

if ! existsCmd yarn; then
  echo "Please install yarn"
  exit 0
fi


read -p "Is this directory the project root? (Y/n): " ISROOT

if [ "${ISROOT,,}" = "y" ]; then
  cd frontend
  yarn install
  cd ..
  cd backend
  yarn install
  cd ..
  echo "Done."
  echo "Please run start.sh"
elif [ "${ISROOT,,}" = "n" ]; then
  echo "Please move the project root"
else
  echo "Please press Y or n"
fi

