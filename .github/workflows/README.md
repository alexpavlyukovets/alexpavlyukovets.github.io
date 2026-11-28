# GitHub Actions workflows

[`portfolio.yml`](portfolio.yml) implements the portfolio CI/CD workflow.

- CI runs on all branch pushes, pull requests to `main`, and manual dispatch.
- The `Test and Build` job runs `npm ci`, linting, TypeScript checking, tests, build, and a high-severity npm audit. It uploads `frontend/dist/` as a seven-day artifact.
- Deployment runs only after CI for a non-pull-request push to `main`. It uses GitHub OIDC and temporary AWS STS credentials, uploads assets without deleting existing S3 objects, uploads `index.html` last, invalidates CloudFront, and runs a production smoke test.
- Actions are pinned by commit SHA; Dependabot reviews npm and GitHub Actions updates weekly.

See [CI/CD documentation](../../docs/cicd.md) for control boundaries and troubleshooting.
