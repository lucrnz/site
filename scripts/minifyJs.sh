#!/usr/bin/env bash
# This script minifies all JavaScript files

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

minify_js() {  
  input_fpath=$(realpath $1)
  ecma_version=$2
  test -f $input_fpath || return 1
  directory=$(dirname "$input_fpath")
  filename=$(basename "$input_fpath")
  extension="${filename##*.}"
  filename="${filename%.*}"

  [ "$extension" != "js" ] && \
    { echo "File is not a JavaScript file" && return 1; }

  test -f "${SCRIPT_DIR}/../tsconfig.json" || \
    { echo "No TypeScript config file found" && return 1; }

  output_filepath="${directory}/${filename}.min.${extension}"

  # Minify the file
  pnpm exec terser \
    --ecma $ecma_version \
    --compress \
    --mangle \
    --output $output_filepath $input_fpath
  
  [ $? -ne 0 ] && \
    { echo "Failed to minify file" && return 1; }

  test -f "$output_filepath" || \
    { echo "Failed to minify file" && return 1; }

  # Remove the original file
  rm $input_fpath
  mv $output_filepath $input_fpath
}

# Get ECMA version from TypeScript config
ecma_version=$(node -e "console.log(require('./tsconfig.json').compilerOptions.target.toLowerCase())")
ecma_version=${ecma_version##*es}

for x in $(find "${SCRIPT_DIR}/../public/scripts" -name "*.js"); do
  minify_js $x $ecma_version
done
