FROM node:latest

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

COPY prisma ./prisma/

COPY . .

RUN npx prisma generate

RUN apt-get update && apt-get install -y python3 python3-pip python3-venv && \
    python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install numpy pandas scikit-learn sqlalchemy psycopg2 python-dotenv

# Set the virtual environment as the default Python environment
ENV PATH="/opt/venv/bin:$PATH"

CMD ["yarn", "dev"]
