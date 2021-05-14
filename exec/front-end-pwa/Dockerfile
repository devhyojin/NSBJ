# build environment
FROM node:14.16.1-alpine as build
WORKDIR /app
COPY package.json tsconfig.json .eslintrc.js alltypes.d.ts node_modules ./
RUN yarn install
COPY ./ ./
RUN yarn build
# CMD ["yarn","start"]


# production environment
FROM nginx:1.19.10-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
