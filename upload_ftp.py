#!/usr/bin/env python3
"""Deploy the React build/ folder to the live FTP server.

Usage:
  1. Copy .env.example to .env and fill in your credentials
  2. npm run build
  3. python upload_ftp.py

Notes / history (why this script looks the way it does):
  - Live host is Network Solutions "Basic Windows Hosting" (vDeck), host
    ftp.rabitlearning.com, PLAIN FTP on PORT 21 only. SFTP ports (22/2222/2121)
    are closed. Use plain FTP.
  - rivet-studio.com (add-on domain) serves from the FTP login ROOT ("/").
    So FTP_REMOTE_PATH should be empty (or "/") to deploy to the doc root.
    If the panel's "root folder" mapping changes, update FTP_REMOTE_PATH.
  - Upload method: cwd INTO each target directory and STOR by BARE filename.
    (An earlier version STOR'd the full remote path *after* cwd-ing into it,
    which doubled the path -> 550 "cannot find the path specified". Fixed.)
"""
import os
import sys
from ftplib import FTP, error_perm
from pathlib import Path

FTP_PORT = 21  # plain FTP; SFTP ports are closed on this host


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
    value = os.environ.get(key)
    if not value:
        print(f"✗ Missing required env var: {key}")
        sys.exit(1)
    return value


def ensure_cwd(ftp, remote_dir):
    """Change into remote_dir (absolute from root), creating dirs as needed.

    remote_dir "" or "/" means the login root.
    """
    ftp.cwd("/")
    for part in remote_dir.strip("/").split("/"):
        if not part:
            continue
        try:
            ftp.cwd(part)
        except error_perm:
            ftp.mkd(part)
            ftp.cwd(part)


def upload_directory(ftp, local_dir, remote_dir, stats):
    """Recursively upload local_dir into remote_dir.

    Works by cwd-ing into remote_dir and STOR-ing bare filenames, so the
    server never sees a doubled path.
    """
    for item in sorted(os.listdir(local_dir)):
        local_path = os.path.join(local_dir, item)
        child_remote = f"{remote_dir}/{item}".replace("//", "/")

        if os.path.isfile(local_path):
            size_mb = os.path.getsize(local_path) / (1024 * 1024)
            label = f"{item} ({size_mb:.2f} MB)" if size_mb > 1 else item
            print(f"  Uploading: {label}")
            try:
                ensure_cwd(ftp, remote_dir)  # STOR by bare name from inside the dir
                with open(local_path, "rb") as f:
                    ftp.storbinary(f"STOR {item}", f)
                stats["ok"] += 1
            except Exception as e:
                print(f"    ✗ Error: {e}")
                stats["fail"].append(f"{child_remote}: {e}")
        elif os.path.isdir(local_path):
            upload_directory(ftp, local_path, child_remote, stats)


def main():
    load_env()

    host = get_required_env("FTP_HOST")
    user = get_required_env("FTP_USER")
    password = get_required_env("FTP_PASS")
    # Root docroot -> leave FTP_REMOTE_PATH empty or "/". Default to root.
    remote_path = os.environ.get("FTP_REMOTE_PATH", "").strip()

    build_dir = Path("build")
    if not build_dir.exists():
        print("✗ No build/ folder found. Run 'npm run build' first.")
        sys.exit(1)

    stats = {"ok": 0, "fail": []}
    try:
        print(f"Connecting to {host}:{FTP_PORT} ...")
        ftp = FTP()
        ftp.connect(host, FTP_PORT, timeout=120)

        print(f"Logging in as {user} ...")
        ftp.login(user, password)
        ftp.set_pasv(True)

        dest = remote_path if remote_path and remote_path != "/" else "/ (root)"
        print(f"✓ Connected! Login dir: {ftp.pwd()}")
        print(f"\nDeploying build/ -> {dest}\n")

        upload_directory(ftp, str(build_dir), remote_path, stats)
        ftp.quit()

        print(f"\n✓ Deploy complete! {stats['ok']} files uploaded, {len(stats['fail'])} failed.")
        for f in stats["fail"][:30]:
            print("  FAIL:", f)
        if stats["fail"]:
            sys.exit(1)

    except Exception as e:
        print(f"\n✗ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
