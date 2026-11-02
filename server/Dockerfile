# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS deps
WORKDIR /srv
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
	npm ci --omit=dev

FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /srv
COPY --from=deps /srv/node_modules ./node_modules
COPY package.json ./
COPY src ./src

# numeric uid so Kubernetes' runAsNonRoot can verify it
USER 1000:1000
EXPOSE 5050
CMD ["node", "src/index.js"]
