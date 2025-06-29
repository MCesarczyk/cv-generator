FROM node:22.17.0-alpine3.21 AS development

RUN npm install -g pnpm @angular/cli@latest

WORKDIR /app

COPY package*.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 4200

CMD ["pnpm", "start", "--host", "0.0.0.0"]

FROM development AS builder

RUN pnpm run build

RUN pnpm prune --prod

FROM nginx:1.29.0-alpine3.22

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/demo/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
