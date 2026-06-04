package ssh

import (
	"fmt"
	"log"
	"net"

	"github.com/charmbracelet/bubbletea"
	"github.com/TumCucTom/personal-tui/data"
	"github.com/TumCucTom/personal-tui/tui"
	"golang.org/x/crypto/ssh"
)

type Server struct {
	addr    string
	config  *ssh.ServerConfig
	profile data.Profile
}

func New(addr string, profile data.Profile) *Server {
	s := &Server{
		addr:    addr,
		profile: profile,
	}

	s.config = &ssh.ServerConfig{
		NoClientAuth: true,
	}

	return s
}

func (s *Server) Listen() error {
	listener, err := net.Listen("tcp", s.addr)
	if err != nil {
		return fmt.Errorf("listen: %w", err)
	}
	log.Printf("SSH server listening on %s", s.addr)

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Printf("accept: %v", err)
			continue
		}

		go s.handleConn(conn)
	}
}

func (s *Server) handleConn(conn net.Conn) {
	defer conn.Close()

	sconn, chans, reqs, err := ssh.NewServerConn(conn, s.config)
	if err != nil {
		log.Printf("new server conn: %v", err)
		return
	}
	defer sconn.Close()

	go ssh.DiscardRequests(reqs)

	for ch := range chans {
		if ch.ChannelType() != "session" {
			ch.Reject(ssh.UnknownChannelType, "unknown channel type")
			continue
		}

		channel, requests, err := ch.Accept()
		if err != nil {
			log.Printf("channel accept: %v", err)
			continue
		}

		go s.handleSession(channel, requests)
	}
}

func (s *Server) handleSession(channel ssh.Channel, requests <-chan *ssh.Request) {
	defer channel.Close()

	var termWidth, termHeight int
	var term string

	// Handle pty-req
	for req := range requests {
		switch req.Type {
		case "pty-req":
			// Parse terminal request
			termLen := int(req.Payload[0])
			if termLen > 0 && len(req.Payload) > termLen+8 {
				term = string(req.Payload[1 : 1+termLen])
				termWidth = int(req.Payload[1+termLen])<<8 | int(req.Payload[1+termLen+1])
				termHeight = int(req.Payload[1+termLen+2])<<8 | int(req.Payload[1+termLen+3])
			}
			req.Reply(true, nil)
		case "shell":
			// Start the Bubbletea program
			go runBubbletea(channel, s.profile)
			return
		default:
			req.Reply(false, nil)
		}
	}

	_ = termWidth
	_ = termHeight
	_ = term
}

type safeWriter struct {
	ch chan []byte
}

func (w *safeWriter) Write(p []byte) (n int, err error) {
	w.ch <- p
	return len(p), nil
}

func runBubbletea(channel ssh.Channel, profile data.Profile) {
	// Create a channel for writes
	writeCh := make(chan []byte, 100)
	done := make(chan struct{})

	// Start goroutine to copy from channel to SSH
	go func() {
		for {
			select {
			case data := <-writeCh:
				channel.Write(data)
			case <-done:
				return
			}
		}
	}()

	sw := &safeWriter{ch: writeCh}

	model := tui.New(profile)
	p := tea.NewProgram(model, tea.WithInput(channel), tea.WithOutput(sw))

	if err := p.Start(); err != nil {
		log.Printf("program exited: %v", err)
	}
	close(done)
}

type nullWriter struct{}

func (nullWriter) Write(p []byte) (n int, err error) { return len(p), nil }
