# Infrastructure

This directory contains Terraform configuration for the existing production delivery environment. It manages 20 AWS resources for the private S3 origin, CloudFront distribution and OAC, Route 53, ACM, AWS WAF, IAM/OIDC deployment role, CloudWatch alarms, SNS topic, and CloudFront Free Flat-Rate Plan.

The configuration is not a generic one-command bootstrap. It represents an existing production environment; the dedicated remote-state bucket and SNS email subscription are managed separately. Always review a saved Terraform plan before any apply.

- [Architecture](../docs/architecture.md)
- [Terraform operations and state](../docs/terraform.md)
- [Security controls](../docs/security.md)
- [Operational runbook](../docs/runbook.md)
