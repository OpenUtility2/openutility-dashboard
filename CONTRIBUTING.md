# Contributing to OpenUtility Dashboard

Thanks for helping improve OpenUtility Dashboard!

## Before editing

1. Open the page or script you plan to change.
2. Search for related IDs, class names, function names, and file paths before renaming anything.
3. Keep the dashboard compatible with static hosting. There is no required build step.
4. Never add Discord bot tokens, OAuth client secrets, session secrets, or other private credentials to frontend files.

## File guide

| File or folder | Purpose |
| --- | --- |
| `index.html` | Main website homepage |
| `dashboard-core.html` | Main dashboard interface |
| `bot-profile.html` | Bot identity studio |
| `api-config.js` | Backend API base URL |
| `dashboard-hardening.js` | Dashboard hardening helpers |
| `dashboard-polish.js` | Visual and interaction polish |
| `dashboard-reliability.js` | Reliability helpers |
| `shared-discord-theme.css` | Shared theme styles |
| `discord-theme.js` | Shared Discord-style interactions |
| `*/index.html` | Individual content pages and clean routes |
| Root-level `*.html` redirects | Compatibility for older URLs |

## Formatting

The repository includes .editorconfig and .prettierrc.json to keep formatting consistent.

If Node.js is installed, format the files you changed with Prettier:

```bash
npx --yes prettier --write "index.html" "dashboard-core.html" "*.css" "*.js"
```

For a page inside a folder, pass its path explicitly, for example:

```bash
npx --yes prettier --write "about/index.html"
```

Formatting a large HTML file can create a large diff. Keep formatting-only changes separate from behavior changes where possible, and review the result before committing.

## Test your changes

- Run the site through a local HTTP server, for example `python -m http.server 8080`.
- Open the changed page at desktop and mobile widths.
- Check the browser console for errors.
- If you touched authentication, API configuration, dashboard permissions, or sync behavior, test the relevant flow against a safe environment.
- Confirm that links, forms, navigation, and old redirect URLs still work.

## Pull requests

Describe what changed, why it changed, and how you tested it. Include screenshots for visible UI changes when useful.
