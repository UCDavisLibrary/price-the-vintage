#! /bin/bash

BASEDIR=$(dirname "$0")
watchify --debug -v -t bulkify $BASEDIR/glob.js -t [ babelify --presets [ es2015 ] ] -o $BASEDIR/../public/js/lib.js

if [ $? != 0 ]; then
  printf "\n\nCOMPILE ERROR\n\n";

  node $BASEDIR/glob.js
fi