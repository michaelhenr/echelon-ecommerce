#!/bin/bash

# Echelon Ecommerce Deployment Script
# This script automates the deployment process for the Echelon Ecommerce application

set -e

echo "🚀 Starting Echelon Ecommerce Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    print_status "Checking Docker installation..."
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    print_success "Docker is installed"
}

# Check if Docker Compose is installed
check_docker_compose() {
    print_status "Checking Docker Compose installation..."
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    print_success "Docker Compose is installed"
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    mkdir -p echelon-ecommerce-backend/uploads
    mkdir -p logs
    print_success "Directories created"
}

# Build and start services
deploy_services() {
    print_status "Building and starting services..."
    
    # Stop existing containers
    print_status "Stopping existing containers..."
    docker-compose down || true
    
    # Build and start services
    print_status "Building Docker images..."
    docker-compose build --no-cache
    
    print_status "Starting services..."
    docker-compose up -d
    
    print_success "Services started successfully"
}

# Wait for services to be ready
wait_for_services() {
    print_status "Waiting for services to be ready..."
    
    # Wait for MongoDB
    print_status "Waiting for MongoDB..."
    timeout=60
    while ! docker-compose exec mongodb mongosh --eval "db.runCommand('ping')" &> /dev/null; do
        sleep 2
        timeout=$((timeout - 2))
        if [ $timeout -le 0 ]; then
            print_error "MongoDB failed to start within 60 seconds"
            exit 1
        fi
    done
    print_success "MongoDB is ready"
    
    # Wait for Backend
    print_status "Waiting for Backend API..."
    timeout=60
    while ! curl -f http://localhost:5000/health &> /dev/null; do
        sleep 2
        timeout=$((timeout - 2))
        if [ $timeout -le 0 ]; then
            print_error "Backend API failed to start within 60 seconds"
            exit 1
        fi
    done
    print_success "Backend API is ready"
    
    # Wait for Frontend
    print_status "Waiting for Frontend..."
    timeout=60
    while ! curl -f http://localhost:3000 &> /dev/null; do
        sleep 2
        timeout=$((timeout - 2))
        if [ $timeout -le 0 ]; then
            print_error "Frontend failed to start within 60 seconds"
            exit 1
        fi
    done
    print_success "Frontend is ready"
}

# Run database migrations
run_migrations() {
    print_status "Running database migrations..."
    # Add migration commands here if needed
    print_success "Database migrations completed"
}

# Create demo data
create_demo_data() {
    print_status "Creating demo data..."
    
    # Create demo users
    docker-compose exec backend node -e "
    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');
    
    // Connect to database
    mongoose.connect('mongodb://admin:password123@mongodb:27017/echelon_ecommerce?authSource=admin');
    
    // Create demo users
    const users = [
        {
            username: 'admin',
            email: 'admin@echelon.com',
            password: bcrypt.hashSync('admin123', 12),
            role: 'admin',
            isApproved: true
        },
        {
            username: 'brandowner',
            email: 'brand@echelon.com',
            password: bcrypt.hashSync('brand123', 12),
            role: 'brand_owner',
            isApproved: true
        },
        {
            username: 'advertiser',
            email: 'advertiser@echelon.com',
            password: bcrypt.hashSync('ad123', 12),
            role: 'advertiser',
            isApproved: true
        },
        {
            username: 'client',
            email: 'client@echelon.com',
            password: bcrypt.hashSync('client123', 12),
            role: 'client',
            isApproved: true
        }
    ];
    
    // Insert users
    mongoose.connection.db.collection('users').insertMany(users);
    console.log('Demo users created successfully');
    mongoose.connection.close();
    "
    
    print_success "Demo data created"
}

# Show deployment status
show_status() {
    print_status "Deployment Status:"
    echo ""
    echo "📊 Services Status:"
    docker-compose ps
    echo ""
    echo "🌐 Application URLs:"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend API: http://localhost:5000"
    echo "  MongoDB: mongodb://localhost:27017"
    echo ""
    echo "👤 Demo Accounts:"
    echo "  Admin: admin@echelon.com / admin123"
    echo "  Brand Owner: brand@echelon.com / brand123"
    echo "  Advertiser: advertiser@echelon.com / ad123"
    echo "  Client: client@echelon.com / client123"
    echo ""
    print_success "Deployment completed successfully! 🎉"
}

# Main deployment function
main() {
    print_status "Starting deployment process..."
    
    check_docker
    check_docker_compose
    create_directories
    deploy_services
    wait_for_services
    run_migrations
    create_demo_data
    show_status
}

# Handle script interruption
trap 'print_error "Deployment interrupted"; exit 1' INT TERM

# Run main function
main "$@"
