# Evie on Mars — UNI Docking

Professional browser game structure for GitHub Pages.

## Upload to GitHub

Upload the full folder contents to the repository root:

```text
index.html
css/style.css
js/game.js
assets/images/*.png
docs/*
```

Do not use the old huge single-file HTML.

## File structure

```text
evie-uni-docking/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── game.js
├── assets/
│   └── images/
│       ├── evie_head.png
│       ├── uni_head.png
│       ├── fox_coin.png
│       ├── earth_real.png
│       ├── moon_real.png
│       └── debris_1.png ... debris_8.png
└── docs/
    ├── UPLOAD_GUIDE.txt
    └── V30_CHANGELOG.txt
```

## Built-in self-test

The game runs a self-test on page load and shows a SELF TEST panel in the top-right.

It checks:

- 9 levels installed
- Earth / Moon / launcher / dock exist
- debris exists
- no debris hidden inside the Moon zone
- launch simulation moves
- Level 4+ orbit dock exists
- Level 7 moving debris exists
- Level 8 reactor debris exists
- Level 9 stronger gravity exists
- internal launch/update/reset works

## Controls

- Drag backward from Earth launcher to launch
- `R` reset
- `N` next level
- `P` previous level
- `1–9` jump to level
