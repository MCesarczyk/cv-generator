# Docker Setup for Angular CV Generator

This document explains how to run the Angular CV Generator using Docker and Docker Compose with pnpm for faster builds and better dependency management.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

### Production Build

1. **Build and run the production container:**

   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   Open your browser and navigate to `http://localhost:4000`

### Development Mode

1. **Run in development mode with hot reload:**

   ```bash
   docker-compose --profile dev up cv-generator-dev
   ```

2. **Access the development server:**
   Open your browser and navigate to `http://localhost:4200`

## Available Commands

### Production Commands

```bash
# Build and start the production container
docker-compose up -d

# View logs
docker-compose logs -f cv-generator

# Stop the container
docker-compose down

# Rebuild the container
docker-compose up --build -d

# Use production configuration
docker-compose -f docker-compose.prod.yml up -d
```

### Development Commands

```bash
# Start development server with hot reload
docker-compose --profile dev up cv-generator-dev

# Run development server in background
docker-compose --profile dev up -d cv-generator-dev

# View development logs
docker-compose logs -f cv-generator-dev

# Stop development container
docker-compose --profile dev down
```

### Utility Commands

```bash
# Execute commands inside the container
docker-compose exec cv-generator sh

# View container status
docker-compose ps

# Remove all containers and volumes
docker-compose down -v

# Clean up Docker system
docker system prune -a
```

## Container Details

### Production Container

- **Base Image:** nginx:1.29.0-alpine3.22
- **Port:** 4000 (mapped to container port 80)
- **Package Manager:** pnpm (faster installs and better caching)
- **Features:**
  - Multi-stage build for optimized size
  - Nginx with custom configuration
  - Gzip compression enabled
  - Security headers configured
  - Static asset caching

### Development Container

- **Base Image:** node:22.17.0-alpine3.21
- **Port:** 4200
- **Package Manager:** pnpm
- **Features:**
  - Hot reload enabled
  - Volume mounting for live code changes
  - Angular CLI pre-installed
  - Development dependencies included

## pnpm Benefits

Using pnpm instead of npm provides several advantages:

- **Faster installs** - Up to 2x faster than npm
- **Disk space efficient** - Uses hard links to save space
- **Strict dependency resolution** - Prevents phantom dependencies
- **Better monorepo support** - If you expand to multiple packages
- **Lockfile consistency** - More reliable dependency resolution

## Environment Variables

You can customize the application using environment variables:

```bash
# Create a .env file
NODE_ENV=production
PORT=4000
```

## SSL Configuration (Optional)

To enable HTTPS in production:

1. **Place SSL certificates in the `ssl/` directory:**

   ```
   ssl/
   ├── certificate.crt
   └── private.key
   ```

2. **Run with SSL profile:**
   ```bash
   docker-compose --profile ssl up -d
   ```

## Troubleshooting

### Common Issues

1. **Port already in use:**

   ```bash
   # Change the port in docker-compose.yml
   ports:
     - "4001:80"  # Use port 3001 instead
   ```

2. **Permission issues:**

   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Container won't start:**

   ```bash
   # Check logs
   docker-compose logs cv-generator

   # Rebuild container
   docker-compose up --build
   ```

4. **Development hot reload not working:**

   ```bash
   # Ensure volume mounting is correct
   docker-compose --profile dev up cv-generator-dev --build
   ```

5. **pnpm lockfile issues:**
   ```bash
   # Remove lockfile and rebuild
   rm pnpm-lock.yaml
   docker-compose up --build
   ```

## Performance Optimization

### Production Optimizations

- Multi-stage Docker build reduces image size
- pnpm provides faster dependency installation
- Nginx serves static files efficiently
- Gzip compression reduces bandwidth usage
- Browser caching improves load times

### Development Optimizations

- pnpm's efficient caching speeds up rebuilds
- Volume mounting enables hot reload
- Polling ensures file changes are detected
- Development dependencies are available

## Security Considerations

- Security headers are configured in Nginx
- Hidden files are blocked
- Container runs as non-root user in production
- Only necessary ports are exposed
- pnpm's strict dependency resolution prevents supply chain attacks

## Monitoring

### Health Checks

The production container includes health checks:

```bash
# Check container health
docker-compose ps
```

### Logs

```bash
# View application logs
docker-compose logs -f cv-generator

# View Nginx access logs
docker-compose exec cv-generator tail -f /var/log/nginx/access.log
```

## CI/CD Integration

The included GitHub Actions workflow validate PR title and content for conventional-commit formatting, ensuring consistent commit messages.

Additionally, after building, the image is tagged with the commit SHA and pushed to the registry.
You can test the image locally using the provided `docker-compose.test-image.yml` file.

```
docker compose -f docker-compose.test-image.yml up -d
```
