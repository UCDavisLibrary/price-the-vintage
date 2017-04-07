#! /bin/bash

BASEDIR=$(dirname "$0")
browserify $BASEDIR/../login/silent-login.js -o $BASEDIR/../public/js/silent-login.js