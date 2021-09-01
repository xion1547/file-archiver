resource "aws_vpc" "vpc" {
  cidr_block = var.cidr_block
  enable_dns_hostnames = true
  enable_dns_support = true
  tags = {
    Name        = "${var.environment}-vpc"
    Environment = var.environment
  }
}

#EC2 instance
resource "aws_instance" "vantou_instance" {
  ami           = "ami-0aeeebd8d2ab47354"
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.default.id]
  subnet_id = aws_subnet.public_subnet[0].id

  tags = {
    Name = "Vantou"
  }
}

#AWS gateways
resource "aws_internet_gateway" "gateway" {
  vpc_id = aws_vpc.vpc.id
  tags = {
    Name = "${var.environment}-igw"
    Environment = var.environment
  }
}

resource "aws_eip" "nat_eip" {
  vpc = true
  depends_on = [aws_internet_gateway.gateway]
}

//resource "aws_nat_gateway" "nat" {
//  allocation_id = aws_eip.nat_eip.id
//  //count = length(var.public_subnets_cidr)
//  subnet_id = element(aws_subnet.public_subnet.*.id, 0)
//  depends_on = [aws_internet_gateway.gateway]
//  tags = {
//    Name = "Nat Gateway"
//    Environment = var.environment
//  }
//}

#AWS subnets
resource "aws_subnet" "public_subnet" {
  vpc_id = aws_vpc.vpc.id
  count = length(var.public_subnets_cidr)
  cidr_block = element(var.public_subnets_cidr,   count.index)
  availability_zone = element(var.availability_zones,   count.index)
  map_public_ip_on_launch = true
  tags = {
    Name = "${var.environment}-${element(var.availability_zones, count.index)}-public-subnet"
    Environment = var.environment
  }
}

resource "aws_subnet" "private_subnet" {
  vpc_id = aws_vpc.vpc.id
  count = length(var.private_subnets_cidr)
  cidr_block = element(var.private_subnets_cidr, count.index)
  availability_zone = element(var.availability_zones, count.index)
  map_public_ip_on_launch = true
  tags = {
    Name = "${var.environment}-${element(var.availability_zones, count.index)}-private-subnet"
    Environment = var.environment
  }
}

resource "aws_db_subnet_group" "public_subnets" {
  name       = "${var.environment}-public-subnets"
  subnet_ids = [aws_subnet.public_subnet[0].id, aws_subnet.public_subnet[1].id]

  tags = {
    Name = "${var.environment}-public-subnet"
  }
}

#Routing for subnet
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.vpc.id
  tags = {
    Name = "${var.environment}-public-route-table"
    Environment = var.environment
  }
}

//resource "aws_route_table" "private" {
//  vpc_id = aws_vpc.vpc.id
//  tags = {
//    Name = "${var.environment}-private-route-table"
//    Environment = var.environment
//  }
//}

resource "aws_route" "public_internet_gateway" {
  route_table_id = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = aws_internet_gateway.gateway.id
}

//resource "aws_route" "private_nat_gateway" {
//  //count = length(var.public_subnets_cidr)
//  route_table_id = aws_route_table.private.id
//  destination_cidr_block = "0.0.0.0/0"
//  nat_gateway_id = aws_nat_gateway.nat.id
//}

resource "aws_route_table_association" "public" {
  count = length(var.public_subnets_cidr)
  subnet_id = element(aws_subnet.public_subnet.*.id, count.index)
  route_table_id = aws_route_table.public.id
}

//resource "aws_route_table_association" "private" {
//  count = length(var.private_subnets_cidr)
//  subnet_id = element(aws_subnet.private_subnet.*.id, count.index)
//  route_table_id = aws_route_table.private.id
//}

#Security group
resource "aws_security_group" "default" {
  name = "${var.environment}-default-sg"
  description = "A default security group that allows inbound/outbound from the VPC"
  vpc_id = aws_vpc.vpc.id
  depends_on = [aws_vpc.vpc]
  ingress {
    from_port = 0
    protocol = "-1"
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    protocol = "-1"
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Environment = var.environment
  }
}