# Frontend security notes

## Current browser-facing surface

The static frontend has no runtime API, forms, authentication, analytics, third-party scripts, or external font requests. User-initiated links point to GitHub and a `mailto:` address and use `rel="noreferrer"` when opened in a new tab.

The document includes one non-executable JSON-LD `Person` data block for search engines. The production CloudFront response already supplies HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and XSS protection headers.

## Recommended Content Security Policy

Validate the following policy in a report-only rollout before applying it at CloudFront:

```text
default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; img-src 'self' data:; font-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; manifest-src 'self'; upgrade-insecure-requests
```

This policy matches the current static build: assets are first-party, the Vite module is first-party, and no inline executable scripts or styles are used. Reassess it before adding analytics, embedded content, remote fonts, or an API.
