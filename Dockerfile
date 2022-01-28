# To create image: docker build . -t <image_name>
# To list images: docker image ls
# To run image: docker run --publish 3000:3000 <image_name>

FROM node:alpine
WORKDIR '/app'

COPY package.json .
RUN npm install
COPY . .
CMD ["npm","start"]