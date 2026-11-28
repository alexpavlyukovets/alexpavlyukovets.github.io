# Security controls

## Origin and edge protection

| Control | Implementation |
| --- | --- |
| Private origin | S3 Block Public Access is enabled. CloudFront is the public delivery path. |
| Object ownership | `BucketOwnerEnforced` disables ACL-based ownership ambiguity. |
| Encryption | S3 defaults to SSE-S3 (`AES256`), with SSE-C blocked. |
| Origin authorization | CloudFront OAC signs S3 origin requests with SigV4. |
| Bucket policy | Only the CloudFront service principal can read objects, scoped to the distribution ARN. |
| Edge firewall | AWS WAF attaches Amazon IP reputation, common rule set, and known bad inputs managed groups to CloudFront. |
| TLS | ACM DNS-validated RSA-2048 certificate, SNI-only, and CloudFront `TLSv1.2_2021` minimum protocol policy. |
| Browser transport | CloudFront redirects HTTP to HTTPS and supports HTTP/2, HTTP/3, and IPv6. |
| Response headers | CloudFront uses a managed security response headers policy. |

## Identity and delivery

- GitHub Actions uses OIDC and AWS STS for temporary credentials.
- The deployment role trusts only the configured repository and `main` branch subject.
- The role follows least privilege: scoped S3 list/location/object access and CloudFront invalidation permissions only.
- GitHub Actions are full-SHA pinned; checkout does not persist credentials.
- Main-branch protection requires the `Test and Build` check. Dependabot proposes weekly npm and GitHub Actions updates.

## Dependency and frontend security

The CI workflow runs `npm audit --audit-level=high`. At the verified frontend QA run for commit `bb334ba`, `npm audit` reported zero known vulnerabilities.

The static frontend has no runtime API, authentication flow, analytics, or third-party executable script. External links opened in new tabs use `rel="noreferrer"`. Details and the application-specific Content Security Policy recommendation are in [frontend-security.md](frontend-security.md).

> The Content Security Policy is a documented recommendation only. It is not currently enforced at CloudFront.

## Terraform state security

Terraform uses a separate encrypted, versioned S3 backend with native S3 locking and production-account restrictions. State can contain sensitive infrastructure identifiers and must not be committed, copied into tickets, or exposed in logs. The backend bucket is pre-provisioned and intentionally outside this Terraform configuration.

## Security change checklist

Before approving a security-related change:

1. Review the saved Terraform plan or workflow diff.
2. Confirm the deployment role, bucket policy, WAF rules, TLS policy, and headers remain least-privilege.
3. Run frontend checks and the security audit.
4. Validate the change on a feature branch and through a pull request.
5. Verify production delivery and CloudWatch metrics after a main-branch deployment.
