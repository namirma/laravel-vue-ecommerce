# Cleanup & polish — what changed and what was left alone

Base audited: `namirma/laravel-vue-ecommerce`, branch `master`,
commit `7ba4bd53d5caa4e90cc06ba9b5c5aebd75ead615`
("fix(admin): resolve infinite loading on products and orders, modernize views and offline fallback",
2026-10-25). This copy was **not** pushed or merged anywhere.

## Audit (versions at the base)

- Laravel `11.37.0` (composer `^11.31`), PHP `^8.2`, Sanctum `4.0.7`
- Admin: Vue `3.5.13`, Vite `6.0.7`, Tailwind `3.4.17`, Vue Router `4.6.4`,
  Vuex `4.1.0`, Chart.js `4.6.1`, vue-chartjs `5.3.2`, axios `1.7.9`,
  Headless UI `1.7.23`, Heroicons `2.2.0`, @vitejs/plugin-vue `5.2.1`
- Root (Blade shell only): Vite `^6.0`, Tailwind `^3.4.13`, axios `^1.7.4`,
  laravel-vite-plugin `^1.0`
- No PHP runtime was available in this environment, so no `composer`
  command, PHP syntax check, migration or test run was performed
  (see "Verification" below).

## Biggest problem found: silent demo mode

The admin shipped as if it were live, but it was not:

- `admin/src/store/state.js` started with a demo token
  (`demo-token-interview-ready`), a named demo user, and full demo
  product/order/customer/user lists.
- Every store action swallowed API errors and returned demo data, and
  `login` succeeded offline with a demo token. A create/update/delete
  that "succeeded" in the UI may never have reached the API.
- The header said "Store Live" and the footer said "API: Connected"
  unconditionally, the sidebar showed hard-coded counts (96 products,
  342 orders), and the dashboard showed fabricated deltas
  (↑14.8%, ↑8.2%, ↑12.0%, "94 Active", "324 fulfilled", "184 Verified")
  that did not match the counts.
- A named person's name and email were hard-coded as the default user
  in state, actions, layout, navbar, sidebar, dashboard and login.

## What was changed (scoped, no new product features)

- `admin/src/demo/demoData.js` (new): the single source for demo rows
  (products, users, customers, orders, countries, one order/customer
  detail) and a generic `Demo Admin` user. Demo data is no longer
  duplicated across state and actions.
- `admin/src/config.js` (new): `isDemoMode` is true only when
  `VITE_DEMO_MODE=true`. Demo mode is off by default.
- `admin/src/store/state.js`: starts empty (token only from
  `sessionStorage`, user `null`, empty lists, totals 0).
- `admin/src/store/actions.js`: API errors now throw in live mode
  (lists are left empty, login shows its error, creates/updates/deletes
  do not fake success). In demo mode the same calls fall back to the
  demo rows, as before, but explicitly. Shared search/sort filtering
  replaced the per-action duplicated filter/sort blocks.
- `admin/src/components/AppLayout.vue`: removed the hard-coded demo-user
  injection on mount and the duplicated `html/body/#app` style block
  (already in `index.css`); footer now uses the current year, no
  connectivity claim, and a "Demo data" label only in demo mode; a
  visible demo banner is shown above the content in demo mode.
- `admin/src/components/Sidebar.vue`: fixed the collapsed sidebar
  (it was translated fully off-screen on desktop instead of becoming
  an icon rail: `-translate-x-full lg:translate-x-0 lg:w-20`); sidebar
  badges now show the real store totals instead of 96/342; user name,
  role and initials come from the signed-in user, falling back to
  "Admin".
- `admin/src/components/Navbar.vue`: removed the non-functional
  search box (with its fake ⌘K hint), the fake notification dot and
  the "Store Live" pill; added a demo-mode badge; user name/role/
  initials come from the signed-in user.
- `admin/src/views/Login.vue`: demo sign-in is shown only in demo
  mode and uses the generic demo user; the login form state is now
  `reactive()`; the failure message no longer points at a demo button
  that may not exist.
- `admin/src/views/Dashboard.vue`: removed the personal name and the
  fabricated KPI deltas/subtexts; KPIs start at 0/$0.00/empty and are
  filled from the API, or from demo rows in demo mode; added
  "No orders yet." / "No customers yet." empty states.
- `admin/src/views/Users/UserModal.vue`: placeholder "e.g. Navid
  Mirtorabi" → "e.g. Jane Doe".
- `admin/index.html`: title "Vite App" → "E-Commerce Admin"; favicon
  `/favicon.ico` (missing) → `/vite.svg` (exists in `admin/public/`).
- `admin/tailwind.config.js`: `require('@tailwindcss/forms')` →
  ESM `import forms` (the package is `"type": "module"`).
- Deleted, provably unimported: `admin/src/style.css` (Vite template
  CSS: dark background, centred `#app`, global button styles — never
  imported by `main.js`, which imports `index.css` only),
  `admin/src/assets/vue.svg`, `admin/src/assets/logo.png`.
- `admin/.env.example`: documented `VITE_API_BASE_URL` and demo mode;
  spacing around `=` tidied.
- `composer.json`: description was the Laravel skeleton text; now
  describes this project.
- `resources/views/welcome.blade.php`: replaced the stock Laravel
  welcome page (with its giant inlined Tailwind fallback and a
  `/dashboard` link that has no route) with a small landing page that
  says what this repo actually is, how to run API + admin, and that
  there is no customer storefront in this repo yet.
- `README.md`: removed the "Customer Storefront" from the architecture
  diagram and documented demo mode.

## Dependency updates (within current major versions)

- `admin/package-lock.json` was refreshed with `npm update`
  (there is no root `package-lock.json`; the root JS is only the
  Blade shell). Updates stayed inside the existing `^` ranges:
  Vue `3.5.13 → 3.5.44`, Vite `6.0.7 → 6.4.5`,
  Tailwind `3.4.17 → 3.4.19`, axios `1.7.9 → 1.21.0`,
  @vitejs/plugin-vue `5.2.1 → 5.2.4`, @tailwindcss/forms
  `0.5.10 → 0.5.11`, autoprefixer `10.4.20 → 10.6.2`,
  postcss `8.5.1 → 8.5.32`. Vue Router `4.6.4`, Vuex `4.1.0`,
  Chart.js `4.6.1`, vue-chartjs `5.3.4`, Heroicons `2.2.0` and
  Headless UI `1.7.23` were already the latest in their ranges.
  No major-version jump was made. `node_modules/` was deliberately
  not left in this copy (see "Verification" for the separate build
  test). Composer dependencies were **not** updated: with no PHP/
  Composer runtime, `composer update` could not be verified.

## Verification actually run

- Re-read every changed file after editing.
- `grep` confirmed no remaining hard-coded personal name/email,
  demo token, `style.css`/`vue.svg`/`logo.png` reference, "Store Live"
  or "API: Connected" in `admin/src`, `app/`, `routes/` or `resources/`.
- Admin production build verified in a **separate throwaway copy**
  (not in this folder, to keep it free of `node_modules/`):
  `npm ci` then `npm run build` in `admin/`, run twice — once
  normally and once with `VITE_DEMO_MODE=true`. Both builds passed
  (846 modules transformed; `dist/assets/index-*.js` ~525 kB,
  with Vite's usual >500 kB chunk-size warning only — pre-existing,
  caused by bundling Chart.js/Vue in one chunk, not a failure).
  The throwaway copy was deleted afterwards.
- Node `v24.22.1` / npm `10.9.4` were available. PHP and Composer
  were **not** available, so no PHP lint, `composer validate`,
  migration, test or Laravel boot was run. The PHP files were not
  changed except `welcome.blade.php` (plain HTML/Blade, no new
  directives) and `composer.json` (description text only).

## Deliberately NOT changed / blocked (needs a decision)

1. **Major upgrades — blocked, needs your call.** Laravel 11 → 12,
   Vite 6 → 7/8, Tailwind 3 → 4 (CSS-first config, breaking),
   Vue Router 4 → 5, laravel-vite-plugin 1 → 3, concurrently 9 → 10.
   These are real upgrades, but without a PHP runtime and a running
   API they cannot be verified here; doing them blind risks breaking
   the test app. Question: do you want a Laravel 12 / Vite 7 /
   Tailwind 4 upgrade attempted as a separate, tested step?
2. **Dashboard charts are still static sample series.** The revenue
   line chart and orders-by-country doughnut have no matching API
   endpoint, so they were left as sample visuals rather than invented
   as live data. Wiring them to real endpoints is a feature, not a
   cleanup.
3. **Unused web (Breeze) controllers were documented, not deleted.**
   `routes/web.php` only serves `/`, so the web `Auth/*`,
   `CartController`, `CheckoutController`, web `ProductController`,
   `OrderController` and `ProfileController` are currently unrouted,
   as are `app/Models/Api/*` (duplicates of the main models).
   Deleting PHP code without a PHP runtime to test against was judged
   riskier than leaving it; delete them only if you confirm the
   storefront/Breeze flow is abandoned.
4. **Tests are still only the Laravel example tests** (`tests/Feature/ExampleTest.php`,
   `tests/Unit/ExampleTest.php`). No admin (Vitest) tests exist.
   Adding a test suite was out of scope for a cleanup pass.
5. **No secrets were found in the repo** (`.env.example` files contain
   placeholders only). The demo token is a local preview constant,
   not a real credential, and it is only used in demo mode.
