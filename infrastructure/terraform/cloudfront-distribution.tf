locals {
  s3_origin_id = "alexpav.click.s3.us-east-1.amazonaws.com-mwzhpm2scx4"
}

resource "aws_cloudfront_distribution" "portfolio" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront CDN for Cloud & DevOps Portfolio"
  default_root_object = "index.html"
  price_class         = "PriceClass_All"
  http_version        = "http2and3"

  aliases = ["alexpav.click"]

  tags = {
    Name = "portfolio-production"
  }

  web_acl_id = aws_wafv2_web_acl.portfolio.arn

  origin {
    domain_name              = aws_s3_bucket.portfolio.bucket_regional_domain_name
    origin_id                = local.s3_origin_id
    origin_access_control_id = aws_cloudfront_origin_access_control.portfolio.id

    connection_attempts = 3
    connection_timeout  = 10

  }

  default_cache_behavior {
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    compress        = true
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.portfolio.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  lifecycle {
    prevent_destroy = true
  }
}
