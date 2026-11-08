# Static LAM site served by nginx. SSL is handled by Caddy/Nginx in front of the container.
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html services.html products.html contact.html /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
