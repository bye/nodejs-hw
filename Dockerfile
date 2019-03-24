FROM node
WORKDIR /src2
COPY package*.json ./
RUN npm install
COPY wait-for-it.sh .