# Production AWS architecture

## Purpose

The portfolio is a client-side React single-page application. It is built into static assets and does not require a backend, database, server-side rendering, or a permanently running Node.js process.

## Delivery path

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

Route 53 resolves the public domain. AWS Certificate Manager (ACM) provides the TLS certificate for CloudFront. A CloudFront Origin Access Control (OAC) restricts S3 origin reads to CloudFront.

## Security and operations

- GitHub Actions uses GitHub OIDC and AWS STS to assume a least-privilege IAM role instead of storing long-lived AWS access keys.
- S3 Block Public Access is enabled; CloudFront is the public delivery path.
- CloudWatch alarms monitor CloudFront 4xx and 5xx error rates, with SNS email notifications.
- Terraform manages 20 AWS resources, including encrypted S3 remote state and state locking.
- AWS WAF is associated with the CloudFront distribution; CloudFront uses managed security response headers.
- GitHub Actions are SHA-pinned and Dependabot maintains npm and Actions updates.
- Secrets, tokens, private keys, and production credentials must not be stored in this repository.

## Responsibility boundaries

| Area | Responsibility |
| --- | --- |
| Frontend | React source, static build, accessibility, SEO metadata, and client-side section navigation. |
| Infrastructure | S3, CloudFront, OAC, Route 53, ACM, IAM/OIDC, monitoring, and infrastructure-as-code state. |
| CI/CD | Quality checks, production build, OIDC authentication, static asset upload, and cache invalidation policy. |

## Static hosting considerations

The current application navigates with fragment links, so it does not require SPA route fallback rules. If client-side path routing is added later, configure a CloudFront custom error response or rewrite so application routes serve `index.html`, while missing static assets continue to return their actual error status.

## Frontend boundary

The frontend remains a static artifact. It does not create, mutate, or require AWS resources at runtime; infrastructure and deployment changes belong to their respective Terraform and GitHub Actions areas.
