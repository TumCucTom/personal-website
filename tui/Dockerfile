FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /tui .

FROM alpine:3.19

RUN apk add --no-cache openssh-server

RUN ssh-keygen -A

RUN mkdir -p /run/sshd

COPY --from=builder /tui /tui
COPY --from=builder /etc/ssh/ssh_host_* /etc/ssh/

EXPOSE 2222

CMD ["/tui", "-addr", "0.0.0.0:2222"]
