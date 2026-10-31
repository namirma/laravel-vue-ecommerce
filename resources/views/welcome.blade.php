<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel &amp; Vue E-Commerce</title>
    <style>
        * { box-sizing: border-box; }
        body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #0f172a; background: #f8fafc; }
        .wrap { max-width: 720px; margin: 0 auto; padding: 64px 24px; }
        h1 { font-size: 2rem; line-height: 1.2; margin: 0 0 8px; }
        p { color: #475569; line-height: 1.6; }
        .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-top: 24px; }
        .card h2 { font-size: 1rem; margin: 0 0 8px; }
        code { background: #f1f5f9; padding: 2px 6px; border-radius: 6px; font-size: 0.85em; }
        ul { color: #334155; line-height: 1.8; padding-left: 20px; }
        a { color: #4f46e5; }
    </style>
</head>
<body>
    <main class="wrap">
        <h1>Laravel &amp; Vue E-Commerce</h1>
        <p>
            A small e-commerce platform: a Laravel 11 REST API on this server and a
            separate Vue 3 admin SPA. This page is only a landing page &mdash; there is
            no customer storefront in this repository yet.
        </p>
        <section class="card">
            <h2>Run it locally</h2>
            <ul>
                <li>API: <code>composer install</code>, then <code>php artisan migrate --seed</code> and <code>php artisan serve</code></li>
                <li>Admin: <code>cd admin &amp;&amp; npm install &amp;&amp; npm run dev</code> (port 3000)</li>
                <li>Admin API base URL: set <code>VITE_API_BASE_URL</code> in <code>admin/.env</code></li>
                <li>Preview without an API: <code>VITE_DEMO_MODE=true npm run dev</code> in <code>admin/</code> (sample data, clearly labelled)</li>
            </ul>
            <p>Admin API endpoints live under <code>/api</code> and are protected by Laravel Sanctum.</p>
        </section>
    </main>
</body>
</html>
