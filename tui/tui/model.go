package tui

import (
	tea "github.com/charmbracelet/bubbletea"
	"github.com/TumCucTom/personal-tui/data"
)

type model struct {
	currentSection Section
	profile        data.Profile
	width          int
	height         int
}

func New(profile data.Profile) *model {
	return &model{
		currentSection: SectionAbout,
		profile:        profile,
	}
}

func (m *model) Init() tea.Cmd {
	return nil
}

func (m *model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.String() {
		case "j", "↓", "l":
			m.nextSection()
		case "k", "↑", "h":
			m.prevSection()
		case "tab":
			m.nextSection()
		case "q", "ctrl+c":
			return m, tea.Quit
		}
	case tea.WindowSizeMsg:
		m.width = msg.Width
		m.height = msg.Height
	}
	return m, nil
}

func (m *model) View() string {
	var content string
	switch m.currentSection {
	case SectionAbout:
		content = RenderAbout(m.profile)
	case SectionEducation:
		content = RenderEducation(m.profile.Education)
	case SectionExperience:
		content = RenderExperience(m.profile.Experience)
	case SectionProjects:
		content = RenderProjects(m.profile.Projects)
	case SectionSkills:
		content = RenderSkills(m.profile.Skills)
	case SectionContact:
		content = RenderContact(m.profile.Links, m.profile.Websites)
	}

	sections := AllSections()
	tabs := ""
	for _, s := range sections {
		if s == m.currentSection {
			tabs += "[ " + s.String() + " ] "
		} else {
			tabs += dimStyle.Render(s.String() + " ")
		}
	}

	help := dimStyle.Render("↑↓/j/k: navigate  |  q: quit")

	return content + "\n\n" + tabs + "\n" + help
}

func (m *model) nextSection() {
	sections := AllSections()
	m.currentSection = sections[(int(m.currentSection)+1)%len(sections)]
}

func (m *model) prevSection() {
	sections := AllSections()
	m.currentSection = sections[(int(m.currentSection)-1+len(sections))%len(sections)]
}
