resource "aws_wafv2_web_acl" "portfolio" {
  name  = "CreatedByCloudFront-45436e54"
  scope = "CLOUDFRONT"

  default_action {
    allow {}
  }

  dynamic "rule" {
    for_each = {
      AWSManagedRulesAmazonIpReputationList = 0
      AWSManagedRulesCommonRuleSet          = 1
      AWSManagedRulesKnownBadInputsRuleSet  = 2
    }

    content {
      name     = "AWS-${rule.key}"
      priority = rule.value

      override_action {
        none {}
      }

      statement {
        managed_rule_group_statement {
          name        = rule.key
          vendor_name = "AWS"
        }
      }

      visibility_config {
        cloudwatch_metrics_enabled = true
        sampled_requests_enabled   = true
        metric_name                = "AWS-${rule.key}"
      }
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    sampled_requests_enabled   = true
    metric_name                = "CreatedByCloudFront-45436e54"
  }

  lifecycle {
    prevent_destroy = true
  }
}
