FROM node:14.10-alpine

ENV APP_NAME ort-uxquest-api
ENV APP_HOME /app/$APP_NAME
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY *.json ./
COPY ./src ./src/
COPY ./src/mail/use-cases/images ./dist/src/mail/use-cases/images
COPY ./test ./test/
COPY .prettierrc .prettierrc
COPY *.ts ./
COPY *.js ./

RUN npm install

EXPOSE 5000