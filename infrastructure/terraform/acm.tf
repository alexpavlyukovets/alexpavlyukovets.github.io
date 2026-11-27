resource "aws_acm_certificate" "portfolio" {
  domain_name               = "alexpav.click"
  subject_alternative_names = ["*.alexpav.click"]
  validation_method         = "DNS"
  key_algorithm             = "RSA_2048"

  lifecycle {
    prevent_destroy = true
  }
}
