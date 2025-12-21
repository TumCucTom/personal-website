# Interactive CV Website

This is an interactive version of Thomas Bale's CV. The website matches the CV PDF layout exactly, but with clickable sections that expand to show detailed information.

## Attribution

You are welcome to use and modify this website template. Please attribute the original design to Thomas Bale when using it.

## Features

- **Exact CV Layout**: Matches the original CV PDF layout and formatting
- **Interactive Sections**: Click on any experience, education, project, or skills item to expand/collapse details
- **Clean Design**: Simple, professional design that mirrors a traditional CV
- **Responsive**: Works on desktop and mobile devices
- **Print Friendly**: When printed, all sections are automatically expanded

## Usage

Simply open `index.html` in a web browser. No build process or dependencies required - it's pure HTML, CSS, and JavaScript.

### Local Development

You can use any local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling to match CV appearance
- `script.js` - Interactive expand/collapse functionality
- `README.md` - This file

## Sections

1. **Header**: Name and contact information
2. **Experience**: 5 professional experiences (click to expand details)
3. **Education**: 2 educational qualifications (click to expand details)
4. **Technical Projects**: 1 project highlight (click to expand details)
5. **Technologies and Skills**: Skills organized by category (click to expand)

