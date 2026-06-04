package main

import (
	"flag"
	"log"

	"github.com/TumCucTom/personal-tui/data"
	"github.com/TumCucTom/personal-tui/ssh"
)

func main() {
	addr := flag.String("addr", "0.0.0.0:2222", "SSH server address")
	flag.Parse()

	profile := data.ThomasBale()
	server := ssh.New(*addr, profile)

	log.Printf("Starting Thomas Bale TUI on %s", *addr)
	if err := server.Listen(); err != nil {
		log.Fatal(err)
	}
}
