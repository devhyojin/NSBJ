# build environment
FROM node:14.16.1-alpine as build
WORKDIR /app
COPY ./package.json ./tsconfig.json ./.eslintrc.js ./alltypes.d.ts ./
RUN yarn install
COPY ./ ./
# CMD ["yarn","start"]
RUN yarn build


# production environment
# FROM nginx
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/build /usr/share/nginx/html

FROM nginx:1.19.10-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
