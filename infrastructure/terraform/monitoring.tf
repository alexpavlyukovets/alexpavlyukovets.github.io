resource "aws_sns_topic" "portfolio_alerts" {
  name = "portfolio-production-alerts"

  tags = {
    Project     = "Portfolio"
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

resource "aws_cloudwatch_metric_alarm" "cloudfront_5xx" {
  alarm_name          = "portfolio-cloudfront-5xx-errors"
  alarm_description   = "CloudFront server error rate exceeds 5 percent"
  namespace           = "AWS/CloudFront"
  metric_name         = "5xxErrorRate"
  statistic           = "Average"
  period              = 300
  evaluation_periods  = 2
  datapoints_to_alarm = 2

  threshold           = 5
  comparison_operator = "GreaterThanOrEqualToThreshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    DistributionId = aws_cloudfront_distribution.portfolio.id
    Region         = "Global"
  }

  alarm_actions = [aws_sns_topic.portfolio_alerts.arn]
  ok_actions    = [aws_sns_topic.portfolio_alerts.arn]

  tags = {
    Project   = "Portfolio"
    ManagedBy = "Terraform"
  }
}

resource "aws_cloudwatch_metric_alarm" "cloudfront_4xx" {
  alarm_name          = "portfolio-cloudfront-4xx-errors"
  alarm_description   = "CloudFront client error rate exceeds 20 percent"
  namespace           = "AWS/CloudFront"
  metric_name         = "4xxErrorRate"
  statistic           = "Average"
  period              = 300
  evaluation_periods  = 2
  datapoints_to_alarm = 2

  threshold           = 20
  comparison_operator = "GreaterThanOrEqualToThreshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    DistributionId = aws_cloudfront_distribution.portfolio.id
    Region         = "Global"
  }

  alarm_actions = [aws_sns_topic.portfolio_alerts.arn]
  ok_actions    = [aws_sns_topic.portfolio_alerts.arn]

  tags = {
    Project   = "Portfolio"
    ManagedBy = "Terraform"
  }
}

output "monitoring_sns_topic_arn" {
  value = aws_sns_topic.portfolio_alerts.arn
}
