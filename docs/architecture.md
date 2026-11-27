# Planned AWS architecture

## Purpose

The portfolio is a client-side React single-page application. It is built into static assets and does not require a backend, database, server-side rendering, or a permanently running Node.js process.

## Target delivery path

```text
Developer
    ↓
GitHub Repository
    ↓
GitHub Actions
    ↓
Amazon S3 (private static origin)
    ↕
Amazon CloudFront (CDN, HTTPS, OAC)
    ↕
End User
```

Route 53 will resolve the public domain. AWS Certificate Manager (ACM) will provide the TLS certificate for CloudFront. A CloudFront Origin Access Control (OAC) will restrict S3 origin reads to CloudFront.

## Security and operations

- GitHub Actions will use GitHub OIDC to assume a least-privilege IAM role instead of storing long-lived AWS access keys.
- S3 Block Public Access will remain enabled; CloudFront is the only planned public delivery path.
- CloudWatch will collect relevant CloudFront and pipeline monitoring signals.
- Terraform or CloudFormation will define the future AWS resources and permissions.
- Secrets, tokens, private keys, and production credentials must not be stored in this repository.

## Responsibility boundaries

| Area | Responsibility |
| --- | --- |
| Frontend | React source, static build, accessibility, SEO metadata, and client-side section navigation. |
| Infrastructure | S3, CloudFront, OAC, Route 53, ACM, IAM/OIDC, monitoring, and infrastructure-as-code state. |
| CI/CD | Quality checks, production build, OIDC authentication, static asset upload, and cache invalidation policy. |

## Static hosting considerations

The current application navigates with fragment links, so it does not require SPA route fallback rules. If client-side path routing is added later, configure a CloudFront custom error response or rewrite so application routes serve `index.html`, while missing static assets continue to return their actual error status.

## Out of scope in this stage

No AWS resources, GitHub Actions deployment workflow, DNS records, certificates, or production deployments are created by the frontend implementation.
