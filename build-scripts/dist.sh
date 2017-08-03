#! /bin/bash
# Simple build script for now
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/.."

DIST=$DIR/dist
APP=$DIR/public
DEV_BUILD_ROOT=$DIR/build-scripts
BUNDLE_ROOT=$DIR/build
BUNDLE_FILE=$BUNDLE_ROOT/es5-bundled/public/require.html

CP=("$APP/js" "$APP/webcomponentsjs" "$APP/images" "$APP/silent-login.html" "$APP/offline.html" "$APP/sw.js" "$APP/manifest.json")

echo "Cleaning dist dir..."
rm -rf $DIST
mkdir $DIST

for file in "${CP[@]}"; do
  cp -r $file $DIST
done
cp $APP/index-dist.html $DIST/index.html

# HACKNESS for leaflet images
mkdir -p $DIST/bower_components/leaflet/dist/images
cp -r $APP/bower_components/leaflet/dist/images/* $DIST/bower_components/leaflet/dist/images
cp -r $APP/bower_components/leaflet/dist/leaflet.css $DIST/bower_components/leaflet/dist/leaflet.css

# HACKNESS for leaflet draw images
mkdir -p $DIST/bower_components/leaflet-draw/dist/images
cp -r $APP/bower_components/leaflet-draw/dist/images/* $DIST/bower_components/leaflet-draw/dist/images
cp $APP/bower_components/leaflet-draw/dist/leaflet.draw.css $DIST/bower_components/leaflet-draw/dist/leaflet.draw.css

# bundle Polymer 2.0
echo 'Bundling polymer elements'
polymer build -q --preset es5-bundled --entrypoint $APP/require.html
mv $BUNDLE_FILE $DIST/require.html

# bundle js lib for es2015
echo 'Bundling js client lib'
node $DEV_BUILD_ROOT/browserify.js $DIST/js/lib.js

rm -rf $BUNDLE_ROOT

echo "Done."