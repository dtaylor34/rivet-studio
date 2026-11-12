# Deploying rivet-studio.com

The site is a Create React App build hosted on **Network Solutions "Basic Windows
Hosting" (vDeck / IIS)**. Deploy = upload the `build/` folder to the live server over
**plain FTP**.

## One-command deploy (normal case)

```bash
npm run build
python upload_ftp.py
```

`upload_ftp.py` reads credentials from `.env` (gitignored) and uploads `build/` to the
live document root. After it finishes, **hard-refresh** the browser (⌘⇧R) — the host
serves updates instantly but your browser caches the old HTML/JS.

## Connection facts (learned the hard way — 2026-11-10)

| Thing | Value |
|---|---|
| Protocol | **Plain FTP** (not SFTP) |
| Host | `ftp.rabitlearning.com` |
| Port | **21** (SFTP ports 22 / 2222 / 2121 are CLOSED) |
| Username | from **NetSol → Hosting → FTP Management** (currently `admin34`) |
| Password | set/reset in **FTP Management**; put the exact string in `.env` |
| Banner | `220 vDeck` (confirms the right Network Solutions server) |
| Doc root | the **FTP login root `/`** — `rivet-studio.com` is an add-on domain mapped there |

### `.env` (local only, never committed)

```
FTP_HOST=ftp.rabitlearning.com
FTP_USER=admin34
FTP_PASS=<from FTP Management>
FTP_REMOTE_PATH=            # empty = deploy to root (the live doc root)
```

If the NetSol panel's **"root folder"** mapping changes so the site serves from a
subfolder again (e.g. `httpdocs/rivet-studio`), set `FTP_REMOTE_PATH=httpdocs/rivet-studio`
(no leading slash).

## Gotchas / history

- **`530 User cannot log in`** → wrong username/password. The credentials live in
  **FTP Management**; old saved logins (`rabit`, `dfunk`) are dead after a NetSol FTP
  update. Reset the password there and copy it into `.env`.
- **FileZilla can't connect** → it's probably set to SFTP or port 2222/2121. Use
  **FTP, host `ftp.rabitlearning.com`, port 21**.
- **Uploaded but site doesn't change / new assets 404** → you uploaded to the wrong
  folder. The live doc root is the FTP **login root `/`**, not `/httpdocs/rivet-studio`.
  Deploy with `FTP_REMOTE_PATH=` (empty).
- **`550 cannot find the path specified` on every file** → old path-doubling bug;
  the current `upload_ftp.py` fixes it (cwd into each dir, STOR bare filename).
- `web.config` (IIS SPA routing) must be at the doc root so deep links like
  `/project/rivettrade` work. It's included in `build/` and uploaded automatically.

## Verify a deploy (plain HTTP works even where HTTPS is restricted)

```bash
# homepage should reference the current main.<hash>.js from build/index.html
curl -s http://rivet-studio.com/ | grep -oE '/static/js/main\.[a-z0-9]+\.js'
grep -oE '/static/js/main\.[a-z0-9]+\.js' build/index.html   # must match
```
