FROM node:alpine
WORKDIR /app
COPY . .
RUN yarn install && \
    adduser -D app && chown app node_modules
USER app
EXPOSE 3000
CMD npm start
