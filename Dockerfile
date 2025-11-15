# Use nginx:alpine as base image (lightweight, production-ready)
FROM nginx:alpine

# Copy all project files to nginx html directory
COPY . /usr/share/nginx/html/

# Expose HTTP port
EXPOSE 80

# Start nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]