#!/bin/bash

function existsCmd () {
    type -a $1 > /dev/null 2>&1
}

if ! existsCmd screen; then
    echo "Please install screen"
    exit 0
fi

{ cd frontend && yarn start; cd backend && yarn start; } &
