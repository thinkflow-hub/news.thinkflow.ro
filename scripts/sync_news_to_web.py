"""sync_news_to_web.py — Copy news data from OpenClaw _data/news/ to news.thinkflow.ro

Usage:
    python scripts/sync_news_to_web.py [--days 7] [--git-push]

Reads from: M:\\thinkflow\\openclaw\\_data\\news\\*.json
Writes to:  public/data/news/*.json + metadata.json

Dependencies: none (stdlib only).
"""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import re
from datetime import datetime, timezone, timedelta
from pathlib import Path

HERE = Path(__file__).resolve().parent
PROJECT = HERE.parent
PUBLIC_NEWS = PROJECT / "public" / "data" / "news"

OPENCLAW_NEWS = Path(r"M:\thinkflow\openclaw\_data\news")


def main() -> int:
    days = 7
    git_push = False

    args = sys.argv[1:]
    for a in args:
        if a.startswith("--days="):
            days = int(a.split("=")[1])
        elif a == "--git-push":
            git_push = True

    if not OPENCLAW_NEWS.exists():
        print(f"[ERROR] OpenClaw news dir not found: {OPENCLAW_NEWS}")
        return 1

    PUBLIC_NEWS.mkdir(parents=True, exist_ok=True)

    # Collect all JSON files (except seen.db)
    all_files = sorted(
        [f for f in OPENCLAW_NEWS.iterdir() if f.suffix == ".json"],
        key=lambda f: f.stem,
        reverse=True,
    )

    if not all_files:
        print("[ERROR] No news files found in OpenClaw _data/news/")
        return 1

    print(f"[SYNC] Found {len(all_files)} daily files in OpenClaw")

    # Copy last N days
    to_copy = all_files[:days]
    copied = 0
    for src in to_copy:
        dst = PUBLIC_NEWS / src.name
        shutil.copy2(src, dst)
        copied += 1
        print(f"  Copied: {src.name}")

    # Generate metadata.json
    dates = sorted([f.stem for f in PUBLIC_NEWS.iterdir() if f.suffix == ".json"],
                   reverse=True)

    # Collect all categories from copied files
    categories = set()
    for f in to_copy:
        try:
            with open(f, "r", encoding="utf-8") as fh:
                data = json.load(fh)
            for item in data.get("items", []):
                cat = item.get("category", "")
                if cat:
                    categories.add(cat)
        except Exception as e:
            print(f"  [WARN] Error reading {f.name}: {e}")

    metadata = {
        "dates": dates,
        "categories": sorted(categories),
        "last_synced": datetime.now(timezone.utc).isoformat(),
        "total_files": copied,
    }

    meta_path = PUBLIC_NEWS / "metadata.json"
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)
    print(f"\n[SYNC] Metadata written: {len(dates)} dates, {len(categories)} categories")

    # Git operations
    if git_push:
        print("\n[GIT] Committing and pushing...")
        try:
            subprocess.run(["git", "add", "-A"], cwd=str(PROJECT), check=True,
                           capture_output=True)
            date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
            subprocess.run(
                ["git", "commit", "-m", f"news update {date_str}"],
                cwd=str(PROJECT), check=True, capture_output=True,
            )
            subprocess.run(["git", "push"], cwd=str(PROJECT), check=True,
                           capture_output=True)
            print(f"[GIT] Pushed: news update {date_str}")
        except subprocess.CalledProcessError as e:
            print(f"[WARN] Git operation failed: {e.stderr.decode()[:200] if e.stderr else 'unknown'}")

    print(f"\n[SYNC] Done. {copied} files copied.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
