# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
	npm ci
COPY . .
# Vite bakes VITE_* values into the bundle at build time.
# VITE_API_URL stays empty: the browser calls /api on the same host and nginx proxies it.
ARG VITE_FEATURED="agripredict,commercial-product-website,gittool-c,car-dealership-network,user-group-script,network-monitor-python"
ENV VITE_FEATURED=$VITE_FEATURED
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
