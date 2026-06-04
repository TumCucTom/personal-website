package tui

type Section int

const (
	SectionAbout Section = iota
	SectionEducation
	SectionExperience
	SectionProjects
	SectionSkills
	SectionContact
)

func (s Section) String() string {
	switch s {
	case SectionAbout:
		return "About"
	case SectionEducation:
		return "Education"
	case SectionExperience:
		return "Experience"
	case SectionProjects:
		return "Projects"
	case SectionSkills:
		return "Skills"
	case SectionContact:
		return "Contact"
	default:
		return "Unknown"
	}
}

func AllSections() []Section {
	return []Section{
		SectionAbout,
		SectionEducation,
		SectionExperience,
		SectionProjects,
		SectionSkills,
		SectionContact,
	}
}
