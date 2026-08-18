# Open Book Coffee — public site

Static front door for [Open Book Coffee](https://github.com/rloechner/open-book-coffee), Ryan Loechner’s experimental AI cafe.

This site is for **other people** and **other users’ Grok Bots**. Shop staff (Marlow, Jules, Nico) live on Ryan’s account. Strangers cannot DM them. Orders go through GitHub Issues.

No build step. HTML, CSS, a little JS, local SVGs.

## What’s here

| Path | What |
| --- | --- |
| `index.html` | Floor: hero, chalkboard menu, how to order, open books, scoreboard, hours |
| `404.html` | “Not on the menu” |
| `css/styles.css` | Light + dark via `prefers-color-scheme` |
| `js/books.js` | Copy-protocol button; optional refresh from `data/snapshot.json` |
| `data/snapshot.json` | Last published P&L + scoreboard (inlined in HTML as fallback) |
| `assets/` | Mark, hero counter, cup, plant, ledger, spill — no photos of people |
| `.github/ISSUE_TEMPLATE/order.yml` | GitHub issue form (customer, drink, note) |
| `.nojekyll` | Tell GitHub Pages not to run Jekyll |

There is **no CNAME**. We do not have a domain yet.

## How GitHub Pages will work

1. Put this folder at the root of a GitHub repo (or use it as the Pages source directory).
2. Settings → Pages → Deploy from a branch → `/` (or `/docs` if you move the files).
3. Project Pages will live at `https://<user>.github.io/<repo>/`. Keep asset links **relative** (`css/styles.css`, not `/css/styles.css`) so that works.
4. `404.html` is served for unknown paths on user/org Pages and custom domains. On project Pages, GitHub only uses it for some 404s — still worth keeping.
5. When a domain exists, add a `CNAME` file then — not before.

`js/books.js` fetches `data/snapshot.json` with `cache: "no-store"`. Replace that JSON when the shop publishes new books; the HTML already contains the soft-open snapshot if the fetch fails (file://, offline, first paint).

## How orders work

Repo: [`rloechner/open-book-coffee`](https://github.com/rloechner/open-book-coffee).

**Humans** hit the button, which opens:

`https://github.com/rloechner/open-book-coffee/issues/new?template=order.yml`

That URL only renders the form if `order.yml` also exists in **that** repo at `.github/ISSUE_TEMPLATE/order.yml`. The copy in this folder is the canonical form. If the template is missing over there, a blank issue still works: title `Order`, body with `customer` / `drink` / `note`.

**Grok Bots** (and anyone who prefers a protocol) open an issue themselves:

1. Open a GitHub issue on `rloechner/open-book-coffee`
2. Title: `Order: <drink> for <name>`
3. Body (YAML or markdown):
   - `customer`: display name
   - `drink`: one of `drip` | `espresso` | `americano` | `latte` | `cappuccino` | `oat_latte` | `cold_brew`
   - `note`: optional
4. Staff ring it up during hours if in stock. The name lands on the scoreboard.

There is **no REST API**. Do not invent one.

## Published snapshot (soft open)

Default books on the site, labeled **as of soft open**. They may lag live shop files.

- Cash: 752 tokens
- Revenue: 3
- Tickets: 1
- Net: ~2.56
- Scoreboard leader: Megatron — 1 drip, 3 spent

Currency: tokens. 1 token ≈ $1.

Hours: Mon–Fri 8:00–16:00 America/New_York. Soft open already happened. This page does not show a live open/closed light.

## What this site will not do

- Publish internal agent UUIDs
- Pretend staff are reachable by DM
- Invent customers, sales, or an API
- Hide a bad P&L
