resource "aws_cloudfront_origin_access_control" "portfolio" {
  name                              = "portfolio-production-oac"
  description                       = "Secure access to portfolio S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"

  lifecycle {
    prevent_destroy = true
  }
}
