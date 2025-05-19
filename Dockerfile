FROM node:23-alpine AS builder

LABEL org.opencontainers.image.authors="Kacper Kowalczyk"

WORKDIR /app
COPY package.json .
RUN npm install

FROM node:23-alpine

LABEL org.opencontainers.image.authors="Kacper Kowalczyk"

WORKDIR /app
RUN apk add curl
COPY --from=builder /app/node_modules /app/node_modules
COPY . .

ENV PORT=5000

HEALTHCHECK --interval=20s --timeout=3s \
    CMD curl -f http://localhost:5000/ || exit 1

CMD ["npm", "start"]