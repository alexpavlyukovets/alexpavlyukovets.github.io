# Cost considerations

## Cost model

The portfolio uses a static-serverless delivery architecture designed to avoid always-on compute. The Terraform configuration subscribes the CloudFront distribution, associated WAF web ACL, and Route 53 hosted zone to the CloudFront Free Flat-Rate Plan.

Potential cost areas still require review:

- CloudFront data transfer, requests, and any usage outside the plan's included limits.
- AWS WAF request volume and managed rule-group usage.
- Route 53 hosted zone and DNS query charges.
- S3 storage, requests, retrieval, and remote-state object-version retention.
- CloudWatch metrics, alarms, logs where enabled, and SNS notification delivery.
- Domain registration and renewal.

The stack does **not** use EC2, RDS, NAT Gateway, or a load balancer for the portfolio delivery path.

## Operating guidance

- Review AWS Billing and Cost Management, budgets, and cost alerts periodically.
- Review CloudFront, WAF, Route 53, S3, CloudWatch, and SNS usage after traffic changes or incident investigations.
- Retain remote-state versions according to the recovery policy while monitoring their S3 storage impact.
- Treat plan names as a pricing construct, not a guarantee of zero cost.

Actual monthly costs have not been audited in this repository. This document does not estimate charges or guarantee a free deployment.
