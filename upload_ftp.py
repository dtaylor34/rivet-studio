#!/usr/bin/env python3
"""Deploy the React build folder to FTP server.

Usage:
  1. Copy .env.example to .env and fill in your credentials
  2. npm run build
  3. python upload_ftp.py
"""
import os
import sys
from ftplib import FTP
from pathlib import Path


def load_env(filepath=".env"):
    """Load key=value pairs from a .env file into environment variables."""
    env_path = Path(filepath)
    if not env_path.exists():
        print(f"✗ Missing {filepath} — copy .env.example to .env and fill in your credentials.")
        sys.exit(1)
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            key, _, value = line.partition("=")
            os.environ[key.strip()] = value.strip()


def get_required_env(key):
    """Get a required environment variable or exit with an error."""
    value = os.environ.get(key)
    if not value:
        print(f"✗ Missing required env var: {key}")
        sys.exit(1)
    return value


def ensure_remote_path(ftp, remote_path):
    """Create remote path and any parent directories if they don't exist."""
    parts = remote_path.strip("/").split("/")
    for part in parts:
        if not part:
            continue
        try:
            ftp.cwd(part)
        except Exception:
            ftp.mkd(part)
            ftp.cwd(part)


def upload_directory(ftp, local_dir, remote_dir):
    """Recursively upload a local directory to the FTP server."""
    for item in sorted(os.listdir(local_dir)):
        local_path = os.path.join(local_dir, item)
        remote_path = f"{remote_dir}/{item}"

        if os.path.isfile(local_path):
            size_mb = os.path.getsize(local_path) / (1024 * 1024)
            label = f"{item} ({size_mb:.2f} MB)" if size_mb > 1 else item
            print(f"  Uploading: {label}")
            try:
                with open(local_path, "rb") as f:
                    ftp.storbinary(f"STOR {remote_path}", f)
                print(f"    ✓ {item}")
            except Exception as e:
                print(f"    ✗ Error: {e}")
        elif os.path.isdir(local_path):
            try:
                ftp.mkd(remote_path)
            except Exception:
                pass  # directory likely already exists
            upload_directory(ftp, local_path, remote_path)


def main():
    load_env()

    host = get_required_env("FTP_HOST")
    user = get_required_env("FTP_USER")
    password = get_required_env("FTP_PASS")
    remote_path = get_required_env("FTP_REMOTE_PATH")

    build_dir = Path("build")
    if not build_dir.exists():
        print("✗ No build/ folder found. Run 'npm run build' first.")
        sys.exit(1)

    try:
        print(f"Connecting to {host}...")
        ftp = FTP()
        ftp.connect(host, 21, timeout=120)

        print(f"Logging in as {user}...")
        ftp.login(user, password)
        ftp.set_pasv(True)

        print(f"✓ Connected! Current directory: {ftp.pwd()}")
        print(f"\nDeploying to {remote_path}...\n")

        ensure_remote_path(ftp, remote_path)
        upload_directory(ftp, str(build_dir), remote_path)

        ftp.quit()
        print("\n✓ Deploy complete!")

    except Exception as e:
        print(f"\n✗ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
