#!/usr/bin/env sh

test -d dist && rm -rf dist

pnpm exec astro build && \
test -d dist && \
find dist/_astro -name "*.js" -type f -exec bash -c '
    js_license_header="// @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat"
    js_license_footer="// @license-end"

    for js_file do
        file_name=$(basename "$js_file")
        { echo -e "$js_license_header"; cat "$js_file"; } > "$js_file.tmp"
        echo -e "$js_license_footer" >> "$js_file.tmp"
        mv "$js_file.tmp" "$js_file"
    done
' bash {} + && \
cp public/.domains dist/
