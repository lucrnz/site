#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

mkdir -p "$(realpath ${SCRIPT_DIR}/../public/scripts)"

for x in $(find "${SCRIPT_DIR}/../public/scripts" -name "*.js"); do
    f=$(realpath $x)
    echo "Patching file $f"
    mv $f $f.tmp && \
    echo "/* @license magnet:?xt=urn:btih:90dc5c0be029de84e523b9b3922520e79e0e6f08&dn=cc0.txt CC0-1.0 */" >> $f && \
    echo "/* This file is part of lucdev.net - Visit https://github.com/lucrnz/lucsite for the actual source code */" >> $f && \
    cat $f.tmp >> $f && \
    echo "/* @license-end */" >> $f && \
    rm $f.tmp
done
