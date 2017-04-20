#! /bin/bash
# Simple build script for now
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../"

DIST=$DIR/dist
APP=$DIR/public

CP=("$APP/js" "$APP/images" "$APP/silent-login.html" "$APP/index.html" "$APP/offline.html" "$APP/sw.js" "$APP/manifest.json")

echo "Cleaning dist dir..."
rm -rf $DIST
mkdir $DIST

for file in "${CP[@]}"; do
  cp -r $file $DIST
done

# build non-source map version of app
echo "Building js lib..."
browserify -t [ bulkify ] -t [ babelify --presets [ es2015 ] ] $DIR/build/glob.js | uglifyjs > $DIST/js/lib.js

# HACKNESS for leaflet images
mkdir -p $DIST/bower_components/leaflet/dist/images
cp -r $APP/bower_components/leaflet/dist/images/* $DIST/bower_components/leaflet/dist/images

# HACKNESS for leaflet draw images
mkdir -p $DIST/bower_components/leaflet-draw/dist/images
cp -r $APP/bower_components/leaflet-draw/dist/images/* $DIST/bower_components/leaflet-draw/dist/images

echo "Bundling polymer elements..."
vulcanize --inline-scripts --inline-css $APP/require.html > $DIST/require.html

# This is failing right now...
# echo "Splitting polymer html and js..."
# crisper --source $DIST/require.html --html $DIST/tmp.html --js $DIST/require.js

# # echo "Minifiying html..."
# html-minifier --remove-comments $DIST/tmp.html > $DIST/require.html

# # echo "Compressing polymer js..."
# browserify -t [ babelify --presets [ es2015 ] ] $DIST/require.js > $DIST/require.min.js

# # echo "Cleanup"
# rm $DIST/tmp.html
# mv $DIST/require.min.js $DIST/require.js

echo "Done."