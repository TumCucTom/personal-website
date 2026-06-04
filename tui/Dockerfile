FROM golang:1.23-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /tui .

FROM alpine:3.19

RUN apk add --no-cache openssh-server

RUN ssh-keygen -A && mkdir -p /run/sshd

COPY --from=builder /tui /tui

EXPOSE 2222

CMD ["/tui", "-addr", "0.0.0.0:2222"]
