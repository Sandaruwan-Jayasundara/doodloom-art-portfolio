# Doodloom Art Portfolio

This a single page HTML, CSS, and vanilla JavaScript illustration portfolio. It loads artwork from `gallery.json` and displays each item in a responsive grid.

## Folder structure

```text
project-root/
├── index.html
├── gallery.json
├── README.md
├── styles/
│   └── main.css
├── scripts/
│   └── gallery.js
└── images/
    ├── avatar.jpg
    ├── artwork-01.jpg
    ├── artwork-02.jpg
    └── ...
```


## How to add artwork

1. Add a `.jpg` or `.png` image to the `images/` folder.
2. Keep each image `300 KB` or smaller.
3. Keep the longest image edge `1600px` or smaller.
4. Open `gallery.json`.
5. Add a new item:

```json
{
  "file": "images/my-new-artwork.jpg",
  "title": "My New Artwork",
  "caption": "Short description of the artwork."
}
```