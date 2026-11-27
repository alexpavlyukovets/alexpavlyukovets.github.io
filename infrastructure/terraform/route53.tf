resource "aws_route53_zone" "portfolio" {
  name          = "alexpav.click"
  comment       = "HostedZone created by Route53 Registrar"
  force_destroy = false

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_route53_record" "acm_validation" {
  zone_id = aws_route53_zone.portfolio.zone_id
  name    = "_4dc3cb1e7a592b9eedd621962ddea623.alexpav.click"
  type    = "CNAME"
  ttl     = 300

  records = [
    "_066e7a34c6fef900441c128de527c9cf.wzccmgtwzk.acm-validations.aws."
  ]

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_route53_record" "ipv4" {
  zone_id = aws_route53_zone.portfolio.zone_id
  name    = aws_route53_zone.portfolio.name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.portfolio.domain_name
    zone_id                = aws_cloudfront_distribution.portfolio.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "ipv6" {
  zone_id = aws_route53_zone.portfolio.zone_id
  name    = aws_route53_zone.portfolio.name
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.portfolio.domain_name
    zone_id                = aws_cloudfront_distribution.portfolio.hosted_zone_id
    evaluate_target_health = false
  }
}
