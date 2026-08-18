#!/usr/bin/env python3
"""
Batch-generates all German audio clips for the Root app from the
exported checklist CSV. Run this on your own computer (needs Python +
a GPU is recommended but not required — it just runs slower on CPU).

SETUP (one time):
    pip install TTS

USAGE:
    # Standard German voice, using XTTS's built-in default speaker
    python generate_audio.py root-audio-checklist.csv --dialect Germany

    # Austrian/Swiss accent via voice cloning: point at a short (6+ sec)
    # clean speech sample of an Austrian or Swiss German speaker and
    # XTTS will clone that voice/accent for every clip in that dialect
    python generate_audio.py root-audio-checklist.csv --dialect Austria --speaker-wav austrian_sample.wav
    python generate_audio.py root-audio-checklist.csv --dialect Switzerland --speaker-wav swiss_sample.wav

The "filename" column in the CSV is already the exact relative path
the app expects (e.g. audio/de/at/a1-u1-0.mp3) — this script writes
directly to those paths, creating folders as needed. When it's done,
the audio/ folder it created is ready to zip and hand back, or drop
straight into your GitHub repo.

NOTE: XTTS outputs .wav by default; this script converts to .mp3 via
pydub/ffmpeg so file sizes stay small. Install ffmpeg if you don't
have it (e.g. `brew install ffmpeg` on Mac, or download from
ffmpeg.org on Windows) or pass --keep-wav to skip conversion.
"""

import argparse
import csv
import os
import sys


def main():
    parser = argparse.ArgumentParser(description="Batch-generate Root app audio from checklist CSV")
    parser.add_argument("csv_path", help="Path to root-audio-checklist.csv")
    parser.add_argument("--language", default="German", help="Language name as it appears in the CSV (default: German)")
    parser.add_argument("--dialect", required=True, help="Dialect label as it appears in the CSV, e.g. Germany, Austria, Switzerland")
    parser.add_argument("--speaker-wav", default=None, help="Reference audio (6+ sec) to clone a specific voice/accent. Omit to use XTTS's default speaker.")
    parser.add_argument("--type", choices=["sentence", "word", "both"], default="both", help="Generate sentence clips, word clips, or both (default: both)")
    parser.add_argument("--keep-wav", action="store_true", help="Skip mp3 conversion, keep .wav output")
    parser.add_argument("--dry-run", action="store_true", help="Print what would be generated without actually running TTS")
    args = parser.parse_args()

    rows = []
    with open(args.csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["language"] != args.language:
                continue
            if row["dialect"] != args.dialect:
                continue
            if args.type != "both" and row["type"] != args.type:
                continue
            rows.append(row)

    if not rows:
        print(f"No matching rows found for language={args.language!r} dialect={args.dialect!r}. "
              f"Check the exact spelling against your CSV's language/dialect columns.")
        sys.exit(1)

    print(f"Found {len(rows)} clips to generate for {args.language} / {args.dialect}.")

    if args.dry_run:
        for row in rows[:10]:
            print(f"  [{row['type']}] {row['filename']}  <-  {row['text']!r}")
        if len(rows) > 10:
            print(f"  ... and {len(rows) - 10} more")
        return

    try:
        from TTS.api import TTS
    except ImportError:
        print("Missing dependency. Run: pip install TTS")
        sys.exit(1)

    print("Loading XTTS-v2 model (first run downloads it, ~2GB — this can take a while)...")
    tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")

    convert_to_mp3 = not args.keep_wav
    if convert_to_mp3:
        try:
            from pydub import AudioSegment
        except ImportError:
            print("Missing dependency for mp3 conversion. Run: pip install pydub  (and install ffmpeg separately)")
            sys.exit(1)

    for i, row in enumerate(rows, 1):
        out_path = row["filename"]
        os.makedirs(os.path.dirname(out_path), exist_ok=True)

        wav_path = out_path if not convert_to_mp3 else out_path.replace(".mp3", ".wav")
        print(f"[{i}/{len(rows)}] {out_path}  <-  {row['text']!r}")

        kwargs = {"text": row["text"], "language": "de", "file_path": wav_path}
        if args.speaker_wav:
            kwargs["speaker_wav"] = args.speaker_wav
        else:
            kwargs["speaker"] = tts.speakers[0] if tts.speakers else None

        tts.tts_to_file(**kwargs)

        if convert_to_mp3:
            AudioSegment.from_wav(wav_path).export(out_path, format="mp3")
            os.remove(wav_path)

    print(f"\nDone. {len(rows)} files written under audio/{'' if not rows else rows[0]['filename'].split('/')[1]}/")
    print("Zip the audio/ folder and upload it back, or copy it straight into your GitHub repo.")


if __name__ == "__main__":
    main()
