FROM rust:1.76 as builder
WORKDIR /app
COPY . .

FROM debian:buster-slim
WORKDIR /app
COPY --from=builder /app/target/release/backend .
CMD ["./backend"]

