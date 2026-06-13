#!/usr/bin/env python3
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / '_data'
FOLDERS = ['artwork', 'photography']
IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif'}

DATA_DIR.mkdir(exist_ok=True)

for folder in FOLDERS:
    folder_path = ROOT / folder
    data_path = DATA_DIR / f'{folder}.yml'
    lines = []

    if folder_path.is_dir():
        for image_path in sorted(folder_path.iterdir(), key=lambda p: p.name.lower()):
            if image_path.is_file() and image_path.suffix.lower() in IMAGE_EXTENSIONS:
                rel_path = quote(str(image_path.relative_to(ROOT).as_posix()), safe='/')
                name = image_path.stem.replace('"', '\\"')
                lines.append(f'- path: "{rel_path}"\n  name: "{name}"\n')

    data_path.write_text(''.join(lines), encoding='utf-8')
