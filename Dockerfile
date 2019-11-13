#install node
FROM node:12.13.0 as build-stage

EXPOSE 80
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install 
RUN npm install vue-cli -g
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production
COPY . /app
RUN npm run build
#test local
EXPOSE 8081
