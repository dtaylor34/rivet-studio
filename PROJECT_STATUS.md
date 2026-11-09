# Project Status — rivet-studio-v5

_Last updated: 2026-11-09_

## TL;DR / where we left off
All code work is **done and pushed to GitHub** (`main` @ `5fa0b6f`). The **only** remaining
task is **deploying the built site to the live server**, which is blocked on getting the
**correct FTP credentials from Network Solutions**. The build is ready to go.

---

## ✅ Done (committed + pushed to GitHub `main`)
Commits:
- `6b58e03` — RivetTrade case study, Natura Kingdom polish, home-page spacing (+ pre-existing pending changes)
- `df22bb8` — IIS `web.config` (SPA deep-link routing + static MIME types)
- `5fa0b6f` — client-gate password hidden behind a SHA-256 hash

Highlights of what changed vs. what's currently live (the live site is an old **Feb 16, 2026** build):
- **New RivetTrade project page** (`/project/rivettrade`, was "covered-calls-manager"): hero, interactive
  decision-chip diagram, cropped chart walkthroughs, captioned figures, Material-based "Design system" section.
- **Natura Kingdom** page: section restructure, captions, copy/voice pass.
- **HomePage**: reduced oversized vertical spacing.
- **Client gate** on `/ai-examples`: password now stored as a **SHA-256 hash** (`src/config/access.js` +
  `src/utils/sha256.js`); plaintext no longer in the code/bundle. Same credentials (`Admin` / unchanged password).
- Added `public/web.config` because the live host is **IIS** (ignores `.htaccess`).

Working tree is clean; local == `origin/main`.

---

## 🚧 Blocker: deploying to the live server
### What we learned (the hard way)
- **Live site host:** `rivet-studio.com` is hosted at **Network Solutions**, on the **"Basic Windows Hosting"
  (rabitlearning.com)** package — Windows/IIS/Plesk-style (`X-Powered-By-Plesk: PleskWin`).
  rivet-studio.com is an **add-on domain**; its web root is **`httpdocs/rivet-studio`**.
- **Natura Kingdom** is on a **different** package ("Starter Hosting - Unix", naturakingdom.com) — that's why
  the usual Natura deploy process does NOT apply to rivet-studio.
- **The repo's deploy script is stale/wrong:** `upload_ftp.py` + `.env` point to
  `ftp.ReadyHosting.com` (plain FTP :21) and `FTP_REMOTE_PATH=/rivet-studio` — this is an **old host** and does
  NOT update the live site. (`.env` is gitignored, so it only exists on this Mac.)
- **Old FileZilla SFTP site** (`ftp.rabitlearning.com:2222`) is **dead/unreachable** (times out from this Mac
  and from the AI sandbox) — leftover from before the Network Solutions move.
- A **VPN** was running during attempts and may have contributed to timeouts/upload failures.
- **Network Solutions File Manager** upload of the build zip **failed** (likely a size cap and/or the VPN).

### Build artifacts are ready
- `build/` folder (fresh `npm run build`, includes `web.config`).
- Desktop zips: `~/Desktop/rivet-studio-build.zip` (full) and `~/Desktop/rivet-studio-build-slim.zip` (no source maps).

---

## ▶️ Next steps to go live (pick one)
**Option A — Give the AI the FTP login (preferred; AI does it):**
1. Network Solutions → Hosting → **FTP Management**: note/set the **FTP username + password**.
2. **Server Information**: get the **FTP host/server** (and port, usually 21).
3. Paste host + username + password to the AI. FTP :21 is reachable from the AI sandbox, so it can push
   `build/` → `httpdocs/rivet-studio` with no size limit.
   - To fix the repo too: update `.env` (`FTP_HOST`, `FTP_USER`, `FTP_PASS`, `FTP_REMOTE_PATH=httpdocs/rivet-studio`)
     and then `npm run build && python upload_ftp.py`.

**Option B — Network Solutions File Manager (do it yourself, VPN OFF):**
1. File Manager → open `httpdocs/rivet-studio`.
2. Upload `~/Desktop/rivet-studio-build-slim.zip` → **Extract** into that folder → **Overwrite** all.
3. Delete the zip. Refresh `rivet-studio.com` (no cache — updates instantly).

**Option C — FileZilla / Terminal:** only if Network Solutions gives working SFTP/FTP details for the CURRENT
host (the old `rabitlearning:2222` is dead).

After deploy: confirm `rivet-studio.com/project/rivettrade` loads (the `web.config` enables that deep link on IIS).

---

## 🔎 How the user's recent (easy) updates were done — investigated 2026-11-09
The user says they updated the site "last week" easily. Local evidence says the method is the
**Network Solutions File Manager (browser)**:
- zsh history has **no** `scp`/`sftp`/`rsync`/`ftp`/deploy commands ever → not a CLI deploy.
- FileZilla transfer log (`~/.config/filezilla/queue.sqlite3`) + recent-servers are from **Jul 2025**,
  untouched → not recent FileZilla transfers.
- No other FTP client installed (no Transmit/Cyberduck/ForkLift).

**Likely why it's harder now than last week:** (1) this is a **full-site** upload (~10 MB zip) vs. probably
a few **small file edits** last week — big uploads can hit the File Manager's size cap; and (2) a **VPN** is
running now (wasn't a factor before).

**On restart, confirm + use the easy method:**
1. Ask the user exactly what they did last week (File Manager? which page/files?).
2. Turn **VPN off**, open NetSol **File Manager → `httpdocs/rivet-studio`**, and either upload the slim zip
   and Extract, or upload just the changed files/folders (`index.html`, `static/`, `web.config`).
3. If the full upload exceeds the size cap, use **FTP Management** creds and let the AI push it (no cap),
   or split into smaller uploads.

## 📝 Follow-ups (nice-to-have, not blocking)
- Fix `upload_ftp.py` + `.env.example` to the correct Network Solutions host/path so future deploys are one command.
- RivetTrade page: fill in real **Outcome & what's next** metrics when available.
- (Acknowledged, not doing) The old plaintext client password still exists in git history (`6b58e03`); password
  is unchanged so it's discoverable there. Rotate or scrub history only if it ever matters.
