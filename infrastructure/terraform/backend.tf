terraform {
  backend "s3" {
    bucket  = "alexpav-terraform-state-417886991538"
    key     = "portfolio/production/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true

    use_lockfile = true

    allowed_account_ids = ["417886991538"]
  }
}
