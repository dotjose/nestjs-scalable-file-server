# Dockerfile

# base image
FROM node:14.16.0-alpine3.13

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY package.json package-lock.json /usr/src/



# install dependencies
RUN npm install

# copy source files
COPY . /usr/src

 
#set correct timezone
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Europe/Sofia /etc/localtime


# start app
EXPOSE 4000
CMD npm run start
