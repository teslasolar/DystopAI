# DystopAI Local Server Options

## Quick Start

### Option 1: Python (Recommended)
If you have Python installed, just double-click `start_server.bat` or run:
```
python -m http.server 8000
```
Then open http://localhost:8000 in your browser.

### Option 2: Node.js
If you have Node.js installed:
```
npx http-server
```

### Option 3: VS Code
Install the "Live Server" extension, then right-click any HTML file and select "Open with Live Server"

## Why is this needed?

Modern browsers block loading local files via JavaScript for security reasons. The `fetch()` function in the story pages needs a web server to work properly.

## Alternative: Standalone Files

I've created `index_standalone.html` in Chapter 6, Scene 1 as an example. This version has the story content embedded directly in the HTML and will work without a server.

If you need all scenes converted to standalone versions, let me know!