# Step 1: Build the Vite app
FROM --platform=linux/amd64 node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve with 'serve'
FROM --platform=linux/amd64 node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
