#!/bin/bash
# Build a Chrome Web Store-ready ZIP of the Page to Markdown extension

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="$ROOT_DIR/dist"
ZIP_NAME="page-to-markdown.zip"

echo "Building Chrome Web Store package..."

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Remove old ZIP if exists
rm -f "$OUTPUT_DIR/$ZIP_NAME"

# Create ZIP with only required extension files
cd "$ROOT_DIR"
zip -r "$OUTPUT_DIR/$ZIP_NAME" \
    manifest.json \
    background.js \
    content.js \
    icons/ \
    lib/ \
    LICENSE \
    THIRD_PARTY_NOTICES.md \
    -x "*.DS_Store" \
    -x "*/.git/*"

echo ""
echo "Package created: $OUTPUT_DIR/$ZIP_NAME"
echo ""
echo "Contents:"
unzip -l "$OUTPUT_DIR/$ZIP_NAME"
echo ""
echo "Size: $(du -h "$OUTPUT_DIR/$ZIP_NAME" | cut -f1)"
