FROM node:20-alpine
ENV NODE_ENV=production
ENV APP_PORT=4000
ENV DANA_SEREVR_ADDRESS=192.168.90.90
ENV DANA_SEREVR_PORT=25000
ENV DANA_SQL_ADDRESS=192.168.90.90
ENV DANA_SQL_USER='sa'
ENV DANA_SQL_PASS='123456'
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 4000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
