terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = var.region
}

resource "aws_rds_cluster" "default" {
  cluster_identifier      = "vantou-cluster-${var.stage}"
  engine                  = "aurora-postgresql"
  engine_mode             = "serverless"
  database_name           = "vantoudb"
  enable_http_endpoint    = true
  master_username         = var.rds_master_username
  master_password         = var.rds_master_password
  backup_retention_period = 1
  vpc_security_group_ids = [aws_security_group.default.id]
  db_subnet_group_name = aws_db_subnet_group.public_subnets.name
  skip_final_snapshot = true

  scaling_configuration {
    auto_pause               = true
    min_capacity             = 2
    max_capacity             = 2
    seconds_until_auto_pause = 300
    timeout_action           = "ForceApplyCapacityChange"
  }
}