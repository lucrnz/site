#!/usr/bin/env bash
# This script patches all resources in the public folder with the appropriate license information

ATTRIBUTION="This file is part of lucdev.net - Visit https://github.com/lucrnz/lucsite for the actual source code"
LICENSE_NAME="CC0-1.0"
LICENSE_MAGNET="magnet:?xt=urn:btih:90dc5c0be029de84e523b9b3922520e79e0e6f08&dn=cc0.txt"

patch_file() {
    fpath=$(realpath "$@")
    [ $(basename $fpath) == "fonts.css" ] && return
    test -d "${fpath}" && return
    echo "Patching file ${fpath}"
    mv ${fpath} ${fpath}.tmp && \
    echo "/* @license ${LICENSE_MAGNET} ${LICENSE_NAME} */" >> ${fpath} && \
    echo "/* ${ATTRIBUTION} */" >> ${fpath} && \
    cat ${fpath}.tmp >> ${fpath} && \
    echo -e "\n/* @license-end */" >> ${fpath} && \
    rm ${fpath}.tmp
}

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
mkdir -p "$(realpath ${SCRIPT_DIR}/../public/scripts)"

# Patching JavaScript files
for x in $(find "${SCRIPT_DIR}/../public/scripts" -name "*.js"); do
    patch_file $x
done

# Patching CSS files
for x in $(find "${SCRIPT_DIR}/../public" -name "*.css"); do
    patch_file $x
done
