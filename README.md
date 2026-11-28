# Alex Pavlyukovets — Cloud & DevOps Portfolio

## Project overview

This repository contains the source code and delivery configuration for a static, single-page Cloud & DevOps portfolio. It presents Alex Pavlyukovets' practical development background, current Cloud & DevOps focus, selected public projects, and the production delivery architecture behind the site.

## Technology stack

- React 18 and TypeScript (strict mode)
- Vite static build
- CSS with responsive and reduced-motion support
- ESLint and Prettier
- Vitest and React Testing Library

## Repository structure

```text
.
├── frontend/           # Static React application and test suite
├── infrastructure/     # Terraform-managed AWS delivery infrastructure
├── .github/workflows/  # CI quality gates and production deployment workflow
├── scripts/            # Reserved for project automation
└── docs/
    ├── architecture.md     # Production AWS architecture and responsibility boundaries
    └── frontend-security.md # Frontend CSP and browser-security notes
```

## Local development

```bash
cd frontend
npm ci
npm run dev
```

## Testing

```bash
cd frontend
npm run lint
npm run typecheck
npm run test:ci
```

## Production build

```bash
cd frontend
npm run build
npm run preview
```

The production-ready static output is created in `frontend/dist/`. It has no backend runtime dependency.

## Production AWS architecture

The delivery path is: Developer → GitHub Repository → GitHub Actions → private Amazon S3 origin → Amazon CloudFront → End User. Terraform manages 20 resources for S3, CloudFront, Origin Access Control, Route 53, ACM, AWS WAF, IAM/OIDC, CloudWatch alarms, and SNS notifications. See [the architecture documentation](docs/architecture.md) for boundaries and implementation notes.

## CI/CD workflow

The future GitHub Actions pipeline will run:

```bash
cd frontend
npm ci
npm run lint
npm run typecheck
npm run test:ci
npm run build
```

The workflow runs these checks, authenticates to AWS through GitHub OIDC, uploads `frontend/dist/` to the private S3 origin, and invalidates CloudFront. GitHub Actions are pinned by commit SHA and Dependabot maintains npm and Actions updates.

## Current project status

The portfolio is deployed as a static application. A verified LinkedIn profile and a downloadable CV have not been added because their URLs/files are not present in the repository.
