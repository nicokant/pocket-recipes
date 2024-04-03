FROM node:20

ARG POCKETBASE_URL="/"
ENV VITE_POCKETBASE_URL=$POCKETBASE_URL
ENV VITE_HEADER="Pocket recipes"
ENV VITE_FOOTER="Made by Nicokant"
WORKDIR /app
COPY package.json package-lock.json .
RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
