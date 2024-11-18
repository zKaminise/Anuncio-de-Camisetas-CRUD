#FROM node:alpine as build
#WORKDIR /app
#COPY src .
#RUN npm i && npm run build

#FROM nginx:latest as production
#COPY --from=build /app/dist /usr/share/nginx/html
#COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
COPY src .
RUN npm run build
FROM nginx:latest AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
