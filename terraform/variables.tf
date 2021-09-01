variable "stage" {
  type        = string
  default     = "dev"
  description = "Stage being deployed to (ie. dev or prod)."
}

variable "region" {
  description = "AWS Deployment region.."
  default = "us-east-1"
}

variable "cidr_block" {
  description = "CIDR block for the VPC"
  default = "10.0.0.0/16"
}

variable "rds_master_username" {
  type = string
  description = "Master username for RDS cluster"
  sensitive = true
}

variable "rds_master_password" {
  type = string
  description = "Master password for RDS cluster"
  sensitive = true
}

variable "environment" {
  description = "Vantou Environment"
  default = "vantou-production"
}

variable "availability_zones" {
  description = "Region availability zones"
  default = ["us-east-1a", "us-east-1b"]
}

variable "public_subnets_cidr" {
  description = "Public subnet CIDR ips"
  sensitive = true
}

variable "private_subnets_cidr" {
  description = "Private subnet CIDR ips"
  sensitive = true
}