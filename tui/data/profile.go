package data

type Profile struct {
	Name       string
	Tagline    string
	Bio        string
	Location   string
	Email      string
	Websites   []Website
	Education  []Education
	Experience []Work
	Projects   []Project
	Skills     []SkillGroup
	Links      []Link
}

type Website struct {
	Label string
	URL   string
}

type Education struct {
	Institution string
	Degree      string
	Start      string
	End        string
	Grade      string
	Detail     string
	Modules    []string
}

type Work struct {
	Role   string
	Org    string
	Start  string
	End    string
	Detail string
}

type Project struct {
	Name        string
	Description string
	Tags        []string
	Link        string
	Award       string
}

type SkillGroup struct {
	Category string
	Skills   []string
}

type Link struct {
	Label string
	URL   string
}

func ThomasBale() Profile {
	return Profile{
		Name:    "Thomas Bale",
		Tagline: "Founder | Athlete | Developer",
		Bio:     "Student, developer, business owner, and Ironman AG Athlete. BSc Computer Science at University of Bristol (85.3% avg, First Class). Treasurer & Planning & Control Team Lead at Formula Student AI. Founder of UoB Quantum Computing Society.",
		Location: "Bristol, UK",
		Email:   "tokbale@outlook.com",
		Websites: []Website{
			{Label: "thomasbale.com", URL: "https://thomasbale.com"},
			{Label: "portfolio.thomasbale.com", URL: "https://portfolio.thomasbale.com"},
			{Label: "GitHub", URL: "https://github.com/TumCucTom"},
			{Label: "LinkedIn", URL: "https://linkedin.com/in/thomas-bale"},
		},
		Education: []Education{
			{
				Institution: "University of Bristol",
				Degree:      "BSc Computer Science",
				Start:      "Sep 2023",
				End:        "Current",
				Grade:      "85.3% average (First Class)",
				Detail:     "Final year. Treasurer & Planning & Control Team Lead at Formula Student AI. Founder & President of UoB Quantum Computing Society.",
				Modules:    []string{"High Performance Computing", "Types and Lambda Calculus", "Image Processing and Computer Vision", "Machine Learning", "Artificial Intelligence"},
			},
			{
				Institution: "Colchester Royal Grammar School",
				Degree:      "A-Levels: A*A*AA",
				Start:      "Sep 2021",
				End:        "Jul 2023",
				Grade:      "Computer Science ranked 1st in cohort; 100% NEA",
				Detail:     "Computer Science, Maths, Further Maths, Physics",
			},
			{
				Institution: "Felsted School",
				Degree:      "GCSEs (Academic Scholarship)",
				Start:      "",
				End:        "",
				Grade:      "All 9s",
				Detail:     "Academic Scholarship awarded",
			},
		},
		Experience: []Work{
			{
				Role:  "Demonstrator and Graduate Teacher",
				Org:   "University of Bristol",
				Start: "Aug 2025",
				End:   "Current",
				Detail: "Delivering lectures, workshops. Mentoring students through year-long Software Engineering Project. Helping students in Computer Systems A and Programming Languages workshops.",
			},
			{
				Role:  "UK HPC Student Team — UKSCC",
				Org:   "ISC Student Cluster Competition",
				Start: "May 2025",
				End:   "Jun 2025",
				Detail: "Represented the UK at ISC SCC. Optimised OpenMX and LLMs (llama) on 208-core, 8xH100 cluster. Used FlashAttention 3, Transformer Engine, FP8, DoRA fine-tuning. Tools: SLURM, OpenMP, MPI, CUDA.",
			},
			{
				Role:  "Machine Learning Research Assistant",
				Org:   "University of Bristol",
				Start: "Feb 2025",
				End:   "Aug 2025",
				Detail: "Developed scalable ML workflow for generating photorealistic emotional faces for psychological research.",
			},
			{
				Role:  "Co-Founder & Operator",
				Org:   "Veloworks Components",
				Start: "Sep 2024",
				End:   "Current",
				Detail: "Co-founded business producing 3D-printed performance cycling components. Sponsorship, marketing, technical, and financial operations.",
			},
			{
				Role:  "Machine Learning Software Engineer Intern",
				Org:   "DigitalU3",
				Start: "Sep 2024",
				End:   "Mar 2025",
				Detail: "Engineered ML system with focus on efficiency and scalability. AGILE team contributions, sprints, code reviews.",
			},
		},
		Projects: []Project{
			{
				Name:        "Quantum Cross-Chain Arbitrage",
				Description: "QAOA-powered cross-chain arbitrage bot winning ETH Oxford DeFi hackathon ($5000). Uses Flare's FTSO for price feeds and State Connector for trustless swaps.",
				Tags:        []string{"Blockchain", "Quantum", "Vyper", "QAOA", "Flare"},
				Link:        "https://github.com/TumCucTom/quantum-cross-chain-arbitrage",
				Award:       "$5000 ETH Oxford Win + Vyperlang 2nd Place",
			},
			{
				Name:        "Llama 8B @ ISC 2025",
				Description: "Fine-tuned Llama 8B on 8xH100 GPUs for ISC25 Student Cluster Competition. FlashAttention 3, Transformer Engine FP8, DoRA fine-tuning.",
				Tags:        []string{"PyTorch", "HPC", "CUDA", "FP8", "FlashAttention", "DoRA", "LLM"},
				Link:        "https://github.com/TumCucTom/llama-8b-ISC-25",
				Award:       "UK Team @ ISC 2025",
			},
			{
				Name:        "YukiGPT",
				Description: "Decoder-only GPT built from scratch in Python following Karpathy's series. Trained to generate F1 radio messages.",
				Tags:        []string{"GPT", "Transformers", "NLP", "Python", "PyTorch"},
				Link:        "https://github.com/TumCucTom/YukiGPT",
			},
			{
				Name:        "F1 Ghost Car",
				Description: "Overhead F1 qualifying lap visualization comparing two drivers' fastest laps with animated car tracking.",
				Tags:        []string{"F1", "Data Viz", "Matplotlib", "Python"},
				Link:        "https://github.com/TumCucTom/f1-ghost-car",
			},
			{
				Name:        "Sparse Attention for Long Context LLMs",
				Description: "Comparative study of sparse attention for 128K–1M token contexts. 4.4x speedup over MemEff at 4096 tokens.",
				Tags:        []string{"PyTorch", "HPC", "Sparse Attention", "MiniMax M3"},
				Link:        "https://github.com/TumCucTom/sparse-attention-poc",
			},
			{
				Name:        "AI for Chess in 3 Dimensions",
				Description: "First ever 3D chess game with NN+MiniMax AI. Maximum mark (75/75) A-Level NEA.",
				Tags:        []string{"Unity", "C#", "AI", "NN", "Game Dev"},
				Link:        "https://github.com/TumCucTom/AI-for-chess-in-3-dimensions",
				Award:       "Maximum mark (75/75)",
			},
		},
		Skills: []SkillGroup{
			{
				Category: "Languages",
				Skills:   []string{"Python", "Go", "Java", "C", "C#", "Haskell", "TypeScript", "Vyper"},
			},
			{
				Category: "Frameworks & Tools",
				Skills:   []string{"React", "Next.js", "PyTorch", "TensorFlow", "Qiskit", "Electron", "MediaPipe", "MapKit", "Three.js"},
			},
			{
				Category: "Technical",
				Skills:   []string{"ML / AI", "HPC (MPI, CUDA, OpenMP)", "Quantum Computing", "Computer Vision", "LLM / NLP", "AGILE / TDD"},
			},
		},
		Links: []Link{
			{Label: "GitHub", URL: "https://github.com/TumCucTom"},
			{Label: "LinkedIn", URL: "https://linkedin.com/in/thomas-bale"},
			{Label: "Email", URL: "mailto:tokbale@outlook.com"},
			{Label: "thomasbale.com", URL: "https://thomasbale.com"},
		},
	}
}
