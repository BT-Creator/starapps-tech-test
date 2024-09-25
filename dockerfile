# Build the application
FROM node:lts AS build

# Copying required files
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY src src

RUN npm install --frozen-lockfile
RUN npm run build:ts

# Only import distribution files and production dependencies
FROM node:lts-alpine AS prod

WORKDIR /app
COPY --from=build /app/dist dist
COPY package.json .
COPY package-lock.json .
RUN npm install --only=production --frozen-lockfile

EXPOSE 3000

ENV FASTIFY_ADDRESS=0.0.0.0

CMD ["npm", "start"]

