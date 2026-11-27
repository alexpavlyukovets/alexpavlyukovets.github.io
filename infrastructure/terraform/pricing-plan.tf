resource "aws_pricingplanmanager_subscription" "portfolio" {
  plan_family = "CloudFront"
  plan_tier   = "FREE"

  resource_arns = [
    aws_cloudfront_distribution.portfolio.arn,
    aws_wafv2_web_acl.portfolio.arn,
    aws_route53_zone.portfolio.arn
  ]

  lifecycle {
    prevent_destroy = true
  }
}
