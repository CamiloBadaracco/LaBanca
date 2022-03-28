FROM node:14.17-alpine

ENV APP_NAME LaBanca
ENV APP_HOME /app/$APP_NAME
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY package.json ./
COPY ./ ./ 


RUN npm install


EXPOSE 5000

CMD [ "nest","start" ]





#COPY *.json ./
#COPY ./src ./src/
#COPY ./test ./test/
#COPY *.ts ./
#COPY *.js ./
#COPY . .
