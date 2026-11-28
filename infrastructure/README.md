# Infrastructure

This directory contains the Terraform configuration for the portfolio's production hosting stack. It manages the private S3 origin, CloudFront distribution and OAC, Route 53, ACM, AWS WAF, IAM/OIDC deployment role, CloudWatch alarms, and SNS notifications.

The target architecture is documented in [`../docs/architecture.md`](../docs/architecture.md).
