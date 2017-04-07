#! /bin/bash
# Simple build script for now
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

DIST=$DIR/dist
APP=$DIR/public

CP=("$APP/js" "$APP/images" "$APP/silent-login.html" "$APP/index.html" "$APP/manifest.json")

rm -rf $DIST
mkdir $DIST

for file in "${CP[@]}"; do
  cp -r $file $DIST
done

# HACKNESS for leaflet images
mkdir -p $DIST/bower_components/leaflet/dist/images
cp -r $APP/bower_components/leaflet/dist/images/* $DIST/bower_components/leaflet/dist/images

# HACKNESS for leaflet draw images
mkdir -p $DIST/bower_components/leaflet-draw/dist/images
cp -r $APP/bower_components/leaflet-draw/dist/images/* $DIST/bower_components/leaflet-draw/dist/images

vulcanize --inline-scripts --inline-css $APP/require.html > $DIST/require.html
# vulcanize --inline-scripts --inline-css $APP/admin/require.html > $DIST/admin/require.html