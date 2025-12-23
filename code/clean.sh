#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"

find "$ROOT" -type f -name '- - string-*-note-*-fret-*-*.wav' -print0 |
while IFS= read -r -d '' file; do
  dir="$(dirname "$file")"
  base="$(basename "$file")"

  # Must start with "- - "
  [[ "$base" == "- - "* ]] || continue

  new="${base#- - }"
  new="${new//#/x}"

  # no-op guard
  [[ "$base" == "$new" ]] && continue

  # avoid clobbering an existing file
  if [[ -e "$dir/$new" ]]; then
    echo "SKIP (target exists): $file -> $dir/$new" >&2
    continue
  fi

  mv -v -- "$file" "$dir/$new"
done
