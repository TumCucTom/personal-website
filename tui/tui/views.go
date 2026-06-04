package tui

import (
	"fmt"
	"strings"

	"github.com/charmbracelet/lipgloss"
	"github.com/TumCucTom/personal-tui/data"
)

var (
	headerStyle = lipgloss.NewStyle().
			Foreground(lipgloss.Color("#FF5E5B")).
			Bold(true)

	subheaderStyle = lipgloss.NewStyle().
			Foreground(lipgloss.Color("#FF9F1C"))

	keyStyle = lipgloss.NewStyle().
		Foreground(lipgloss.Color("#8ECAE6"))

	valueStyle = lipgloss.NewStyle().
		Foreground(lipgloss.Color("#FFFFFF"))

	dimStyle = lipgloss.NewStyle().
		Foreground(lipgloss.Color("#6C757D"))

	awardStyle = lipgloss.NewStyle().
			Foreground(lipgloss.Color("#06D6A0")).
			Bold(true)

	tagStyle = lipgloss.NewStyle().
		Foreground(lipgloss.Color("#219EBC"))

	normalStyle = lipgloss.NewStyle().
		Foreground(lipgloss.Color("#FFFFFF"))
)

func RenderAbout(p data.Profile) string {
	var b strings.Builder
	b.WriteString(headerStyle.Render("Thomas Bale"))
	b.WriteString("\n")
	b.WriteString(subheaderStyle.Render(p.Tagline))
	b.WriteString("\n\n")
	b.WriteString(normalStyle.Render(p.Bio))
	b.WriteString("\n\n")
	b.WriteString(dimStyle.Render(fmt.Sprintf("📍 %s  |  ✉ %s", p.Location, p.Email)))
	return b.String()
}

func RenderEducation(edu []data.Education) string {
	var b strings.Builder
	b.WriteString(headerStyle.Render("Education"))
	b.WriteString("\n\n")

	for _, e := range edu {
		b.WriteString(subheaderStyle.Render(e.Institution))
		b.WriteString(" — ")
		b.WriteString(valueStyle.Render(e.Degree))
		b.WriteString("\n")
		b.WriteString(dimStyle.Render(fmt.Sprintf("%s – %s | %s", e.Start, e.End, e.Grade)))
		b.WriteString("\n")
		b.WriteString(normalStyle.Render(e.Detail))
		if len(e.Modules) > 0 {
			b.WriteString("\nModules: ")
			b.WriteString(dimStyle.Render(strings.Join(e.Modules, ", ")))
		}
		b.WriteString("\n\n")
	}
	return b.String()
}

func RenderExperience(work []data.Work) string {
	var b strings.Builder
	b.WriteString(headerStyle.Render("Experience"))
	b.WriteString("\n\n")

	for _, w := range work {
		b.WriteString(subheaderStyle.Render(w.Role))
		b.WriteString(" @ ")
		b.WriteString(valueStyle.Render(w.Org))
		b.WriteString("\n")
		b.WriteString(dimStyle.Render(fmt.Sprintf("%s – %s", w.Start, w.End)))
		b.WriteString("\n")
		b.WriteString(normalStyle.Render(w.Detail))
		b.WriteString("\n\n")
	}
	return b.String()
}

func RenderProjects(projects []data.Project) string {
	var b strings.Builder
	b.WriteString(headerStyle.Render("Projects"))
	b.WriteString("\n\n")

	for _, p := range projects {
		b.WriteString(subheaderStyle.Render(p.Name))
		if p.Award != "" {
			b.WriteString(" ")
			b.WriteString(awardStyle.Render("★ " + p.Award))
		}
		b.WriteString("\n")
		b.WriteString(normalStyle.Render(p.Description))
		b.WriteString("\n")
		b.WriteString(tagStyle.Render(strings.Join(p.Tags, " • ")))
		b.WriteString("\n")
		b.WriteString(dimStyle.Render("↗ " + p.Link))
		b.WriteString("\n\n")
	}
	return b.String()
}

func RenderSkills(groups []data.SkillGroup) string {
	var b strings.Builder
	b.WriteString(headerStyle.Render("Skills"))
	b.WriteString("\n\n")

	for _, g := range groups {
		b.WriteString(subheaderStyle.Render(g.Category))
		b.WriteString(": ")
		b.WriteString(normalStyle.Render(strings.Join(g.Skills, ", ")))
		b.WriteString("\n\n")
	}
	return b.String()
}

func RenderContact(links []data.Link, websites []data.Website) string {
	var b strings.Builder
	b.WriteString(headerStyle.Render("Contact & Links"))
	b.WriteString("\n\n")

	for _, l := range links {
		b.WriteString(keyStyle.Render("• " + l.Label))
		b.WriteString(" ")
		b.WriteString(dimStyle.Render(l.URL))
		b.WriteString("\n")
	}

	b.WriteString("\n")
	b.WriteString(headerStyle.Render("Websites"))
	b.WriteString("\n\n")
	for _, w := range websites {
		b.WriteString(keyStyle.Render("• " + w.Label))
		b.WriteString(" ")
		b.WriteString(dimStyle.Render(w.URL))
		b.WriteString("\n")
	}
	return b.String()
}
