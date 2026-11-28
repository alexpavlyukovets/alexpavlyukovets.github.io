# Terraform operations and state

## Scope and versions

The Terraform configuration in [`infrastructure/terraform`](../infrastructure/terraform) manages an existing production environment. It is deliberately not a generic one-command bootstrap: the production services already exist and are represented in Terraform state.

| Component | Constraint |
| --- | --- |
| Terraform CLI | `>= 1.17.0, < 2.0.0` |
| AWS provider | `hashicorp/aws ~> 6.0` |
| AWS region | `us-east-1` |
| Account guard | Provider and backend restrict work to the production AWS account configured in the repository. |

## Managed resources

The configuration contains **20 `resource` blocks**, verified from the `.tf` files.

| Resource group | Count | Purpose |
| --- | ---: | --- |
| S3 origin and controls | 4 | Bucket, Block Public Access, ownership controls, SSE-S3 encryption. |
| CloudFront delivery | 2 | Distribution and Origin Access Control. |
| Route 53 | 4 | Hosted zone, ACM validation CNAME, A alias, and AAAA alias. |
| IAM and identity | 3 | GitHub OIDC provider, deployment role, and inline least-privilege policy. |
| ACM | 1 | DNS-validated RSA-2048 certificate. |
| AWS WAF | 1 | CloudFront-scoped web ACL. |
| S3 access policy | 1 | Distribution-scoped CloudFront read policy. |
| Monitoring | 3 | SNS topic plus CloudWatch 4xx and 5xx alarms. |
| CloudFront plan | 1 | Free Flat-Rate Plan subscription. |

Existing production resources were imported into Terraform state when the configuration was adopted. There are no ongoing `import` blocks: normal changes must be reviewed through the usual plan/apply flow.

## Remote state

State is stored in a dedicated, pre-provisioned S3 backend outside this configuration. The backend uses encryption, versioning, native S3 locking (`use_lockfile = true`), and an allowed-account restriction.

- The state bucket is not bootstrapped by this project to avoid a state-management circular dependency.
- State objects are sensitive operational records. Never commit state, plans containing secrets, `.terraform/`, or backend credentials.
- SNS email subscriptions are also managed separately from this Terraform configuration; Terraform manages the SNS topic and its alarm integrations only.
- S3 object versioning provides a recovery path for state objects. Restore state only with a reviewed, incident-specific procedure.

## Safe workflow

Run Terraform from `infrastructure/terraform` with authenticated AWS credentials for the allowed production account.

```bash
terraform init
terraform fmt -check
terraform validate
terraform plan -out=tfplan
terraform show tfplan
```

`terraform apply tfplan` is permitted only after a mandatory human review of the saved plan. Review additions, replacements, destroys, permission changes, ACM/DNS changes, and CloudFront/WAF effects before approval.

Do not run `terraform apply` without a reviewed plan, use `-auto-approve`, force unlock a state lock without confirming the owning operation is stopped, or use the configuration as a fresh-environment bootstrap.

## Lifecycle protection and recovery

Critical resources use `prevent_destroy`, including the S3 bucket, CloudFront distribution, OAC, hosted zone, ACM certificate, WAF ACL, and CloudFront plan subscription. A destroy or replacement request for one of these resources is a stop-and-investigate event, not a routine change.

If state recovery is required:

1. Stop concurrent Terraform operations and identify the latest known-good state version.
2. Obtain change approval and record the incident context.
3. Restore only the intended S3 state-object version through the approved AWS procedure.
4. Run `terraform init`, then `terraform plan` to confirm the recovered state matches the expected infrastructure.
5. Document the outcome and any resulting drift remediation.

See the [runbook](runbook.md) for operational drift and recovery verification.
