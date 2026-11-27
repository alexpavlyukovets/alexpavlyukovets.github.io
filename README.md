# Alex Pavlyukovets — Cloud & DevOps Portfolio

## Project overview

This repository contains the source code for a static, single-page portfolio for Alex Pavlyukovets, focused on Cloud & DevOps Engineering. The site presents a practical development background, current Cloud & DevOps focus, selected public projects, and a clearly labelled planned AWS delivery architecture.

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
├── infrastructure/     # Reserved for future infrastructure-as-code work
├── .github/workflows/  # Reserved for future CI/CD workflows
├── scripts/            # Reserved for project automation
└── docs/
    └── architecture.md # Planned AWS architecture and responsibility boundaries
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

## Planned AWS architecture

The planned delivery path is: Developer → GitHub Repository → GitHub Actions → private Amazon S3 origin → Amazon CloudFront → End User. IAM with GitHub OIDC, Route 53, ACM, infrastructure as code, and CloudWatch are planned supporting components. See [the architecture documentation](docs/architecture.md) for boundaries and implementation notes.

## Planned CI/CD workflow

The future GitHub Actions pipeline will run:

```bash
cd frontend
npm ci
npm run lint
npm run typecheck
npm run test:ci
npm run build
```

It will upload the contents of `frontend/dist/` to S3 through an OIDC-authenticated IAM role. This workflow and the AWS resources are intentionally not implemented in this stage.

## Current project status

The frontend portfolio v2 is complete as a local static application. AWS infrastructure, CI/CD deployment, verified contact-profile additions, and a CV download remain future work.
