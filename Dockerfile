FROM node:22-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Public site at https://www.sjamsde.org/ (SSMP portal stays on sjamsde.org)
ENV GITHUB_PAGES_BASE=/
ENV VITE_BASE_PATH=
RUN pnpm run build

EXPOSE 3000
ENV HOST=0.0.0.0

CMD ["npx", "--yes", "serve", "-s", ".output/public", "-l", "3000"]
