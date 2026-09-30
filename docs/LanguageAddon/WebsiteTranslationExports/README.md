# Website UI translation hand-off

## File to edit

Import `website-ui-translation-template.csv` into Google Sheets.

Luca's team should complete only the `french`, `german` and `spanish` columns. Do not edit:

- `translation_key`
- `english`
- `italian_reference`

## Translation rules

- Keep placeholders exactly as written, for example `{count}`, `{current}` and `{total}`.
- Do not translate product names, model numbers, EN/ISO standards, URLs, email addresses or units.
- Preserve Markdown, punctuation, line breaks and any HTML-like formatting.
- Keep wording concise where possible, as longer text can affect the website layout.
- Empty target-language cells will intentionally fall back to English on the website.

## Files in this folder

- `en.json`: source English UI text.
- `it.json`: existing Italian reference.
- `website-ui-translation-template.csv`: the safe spreadsheet format for translation.

Do not edit the JSON files directly. Jack will validate the completed spreadsheet and generate the final language JSON files.
