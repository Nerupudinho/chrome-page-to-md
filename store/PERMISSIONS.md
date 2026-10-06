# Chrome Web Store Permission Justifications

## Single Purpose Statement

Page to Markdown converts the current webpage to a downloadable Markdown file when the user clicks the extension icon.

---

## Permissions

### activeTab

**Justification:** Required to read the content of the webpage in the current tab when the user clicks the extension icon. Access is granted only for that single interaction and only for the currently active tab. The extension does not request broad host permissions.

### scripting

**Justification:** Required to inject the content extraction scripts (Readability and Turndown libraries, plus the conversion logic) into the active tab when the user clicks the extension icon. This allows the extension to extract article content and convert it to Markdown format locally within the page context.
