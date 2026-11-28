# Operational runbook

This runbook covers the existing static production environment. Follow the repository's branch protection and change-review process; do not make unreviewed direct production changes.

## HTTPS availability and redirect

```bash
curl --fail --silent --show-error --head https://alexpav.click/
curl --silent --show-error --head http://alexpav.click/
```

The HTTPS request should succeed. The HTTP request should redirect to HTTPS through CloudFront. If it does not, check the Route 53 aliases, CloudFront distribution status, ACM certificate, and viewer protocol policy before changing anything.

## Private S3 origin verification

Confirm the S3 bucket's public access block, ownership controls, encryption, and distribution-scoped policy through the AWS console or approved AWS CLI profile. Direct public S3 object access should not be the delivery path; CloudFront should serve the content through OAC.

Do not relax Block Public Access or add a wildcard public-read policy to diagnose an incident.

## Failed GitHub Actions deployment

1. Open the failed `Portfolio CI/CD` workflow run and identify the failed step.
2. Confirm that `Test and Build` passed and that the deployment was a non-PR push to `main`.
3. For an artifact failure, confirm `frontend/dist/` was uploaded by CI.
4. For upload or invalidation failures, inspect the deployment role and AWS service response; do not substitute long-lived credentials.
5. Correct the cause in a recovery branch, open a pull request, and let required CI pass before merge.
6. Verify the workflow smoke test and public HTTPS response after recovery.

## IAM/OIDC authentication failure

Check the `configure-aws-credentials` and `aws sts get-caller-identity` steps. Validate that:

- the workflow is running from `main`, not a pull request or feature branch;
- the OIDC audience is `sts.amazonaws.com`;
- the token subject matches the repository and `refs/heads/main`;
- the deployment role and allowed account are correct; and
- the workflow has `id-token: write` permission.

Do not add static AWS credentials to GitHub secrets as a workaround.

## CloudFront cache invalidation

The deployment workflow invalidates `/*` and waits for completion. If a verified deployment still serves stale files, inspect the invalidation status and the browser cache first. Create a manual invalidation only through an approved, audited operational change using the deployment role; retain evidence of the change.

## CloudWatch and SNS alarm investigation

| Alarm | Threshold | Evaluation | Missing data | Notifications |
| --- | ---: | --- | --- | --- |
| `4xxErrorRate` | `>= 20%` | Two five-minute periods | Non-breaching | SNS on ALARM and OK |
| `5xxErrorRate` | `>= 5%` | Two five-minute periods | Non-breaching | SNS on ALARM and OK |

For an alarm:

1. Check the CloudWatch alarm history and the CloudFront distribution metrics for the affected period.
2. For 4xx increases, investigate invalid paths, missing assets, client behavior, WAF actions, and recently deployed links.
3. For 5xx increases, investigate CloudFront distribution status, origin access policy/OAC, S3 object availability, and recent deployments.
4. Review SNS delivery status and notify the responsible operator through the approved incident channel.
5. Record the cause, mitigation, and verification result.

These passive CloudFront error-rate alarms are not an independent uptime probe. A successful alarm state does not prove that every visitor path is available.

## AWS WAF investigation

Review AWS WAF sampled requests and CloudWatch metrics for the web ACL and its managed rule groups. Correlate timestamps with CloudFront 4xx metrics. Treat rule exclusions or overrides as reviewed security changes; do not disable a managed group simply to clear a short-term false positive.

## Frontend rollback

1. Identify the last known-good commit and deployment.
2. Create a recovery branch from that commit.
3. Revert only the faulty frontend change, preserving unrelated production controls.
4. Open a pull request, obtain review, and pass `Test and Build`.
5. Merge through the protected `main` branch to trigger the normal deployment.
6. Verify HTTPS delivery, asset loading, CloudFront invalidation completion, and the production smoke test.

## Terraform drift detection

Run from `infrastructure/terraform` with the approved production identity:

```bash
terraform init
terraform validate
terraform plan -detailed-exitcode
```

Exit code `0` indicates no drift; `2` indicates a proposed change; `1` indicates an error. Treat drift as an investigation. Save and review the plan before any apply, and never use `-auto-approve`.

## Production recovery verification

After any recovery, verify:

1. `https://alexpav.click/` returns successfully.
2. HTTP redirects to HTTPS.
3. CloudFront, WAF, ACM, Route 53, and the S3 origin report healthy expected state.
4. The latest deployment workflow and smoke test succeeded.
5. CloudWatch error-rate alarms return to expected state and SNS notifications are accounted for.
