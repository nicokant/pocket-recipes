FROM alpine:latest as base

ARG POCKETBASE_VERSION=0.22.7

RUN apk add --no-cache \
    ca-certificates \
    unzip \
    wget \
    zip \
    zlib-dev

ADD https://github.com/pocketbase/pocketbase/releases/download/v${POCKETBASE_VERSION}/pocketbase_${POCKETBASE_VERSION}_linux_amd64.zip /app/pocketbase/pocketbase.zip

RUN unzip /app/pocketbase/pocketbase.zip -d /app/pocketbase && \
    chmod +x /app/pocketbase/pocketbase && \
    rm /app/pocketbase/pocketbase.zip


FROM alpine:latest
COPY --from=base /app/pocketbase/pocketbase /app/pocketbase/pocketbase
COPY pb_migrations /app/data/pb_data/pb_migrations

EXPOSE 8090

ENTRYPOINT ["/app/pocketbase/pocketbase"]

CMD ["serve", "--http=0.0.0.0:8090", "--dir=/app/data/pb_data", "--publicDir=/app/data/pb_public"]
