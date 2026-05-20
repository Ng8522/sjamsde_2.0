FROM node:22-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "start"]