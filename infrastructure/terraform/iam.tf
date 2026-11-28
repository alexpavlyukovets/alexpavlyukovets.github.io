# GitHub OIDC Identity Provider
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = ["sts.amazonaws.com"]

  tags = {
    Project   = "Portfolio"
    ManagedBy = "Terraform"
  }
}

# GitHub Actions Deployment Role
resource "aws_iam_role" "github_deploy" {
  name                 = "portfolio-github-deploy"
  max_session_duration = 3600

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }

        Action = "sts:AssumeRoleWithWebIdentity"

        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
            "token.actions.githubusercontent.com:sub" = "repo:alexpavlyukovets/alexpavlyukovets.github.io:ref:refs/heads/main"
          }
        }
      }
    ]
  })

  tags = {
    Project     = "Portfolio"
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

# Least Privilege Deployment Permissions
resource "aws_iam_role_policy" "github_deploy" {
  name = "portfolio-deployment-policy"
  role = aws_iam_role.github_deploy.id

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Sid    = "ListPortfolioBucket"
        Effect = "Allow"

        Action = [
          "s3:ListBucket",
          "s3:GetBucketLocation"
        ]

        Resource = aws_s3_bucket.portfolio.arn
      },
      {
        Sid    = "ManagePortfolioObjects"
        Effect = "Allow"

        Action = [
          "s3:GetObject",
          "s3:PutObject",
        ]

        Resource = "${aws_s3_bucket.portfolio.arn}/*"
      },
      {
        Sid    = "InvalidateCloudFrontCache"
        Effect = "Allow"

        Action = [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation"
        ]

        Resource = aws_cloudfront_distribution.portfolio.arn
      }
    ]
  })
}

output "github_deploy_role_arn" {
  value = aws_iam_role.github_deploy.arn
}
