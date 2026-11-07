# Laman statik LAM dihidangkan oleh nginx. SSL diurus oleh Caddy/Nginx di hadapan container.
FROM nginx:1.27-alpine
COPY index.html produk.html hubungi.html /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
EXPOSE 80
