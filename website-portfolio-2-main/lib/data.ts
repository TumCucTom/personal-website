import React from "react";
import { FaBuilding } from "react-icons/fa";
import { LuBike } from "react-icons/lu";
import { LuGraduationCap } from "react-icons/lu";
import { FaFirstAid } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";
import { FaBookOpen } from "react-icons/fa";
import { GiAtom } from "react-icons/gi";


import ENCimg from "@/public/encode.png";
import GAIImg from "@/public/GAI.png";
import QCImg from "@/public/QC.png";
import gitImg from "@/public/git.png";
import pyImg from "@/public/py.png";
import AWHImg from "@/public/AWH.png"
import REPImg from "@/public/rep.png"
import CHESSImg from "@/public/chess.png"
import adventImg from "@/public/advent.png"
import IS1 from "@/public/IS1.png"
import IS2 from "@/public/IS2.png"
import IS3 from "@/public/IS3.png"
import Q1 from "@/public/Q1-1.png"
import bris1 from "@/public/bris1.png"
import bris2 from "@/public/bris2.png"
import c1 from "@/public/c1.png"
import c3 from "@/public/c2.png"
import c2 from "@/public/c3.png"
import MeDIImg from "@/public/medi.png"

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Achievements",
    hash: "#achievements",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const interestsAndAchievements = [
  {
    title: "Ironman Switzerland - 3.8km Swim, 180km Bike, Marathon Run",
    description: "Completed in 10h30m after 9 months of training with peak weeks averaging 20-25h/week with 10,000m swimming, 500km cycling and 70km of running.",
    photos: [
      IS1,
        IS2,
        IS3,

    ],
  },
  {
    title: "University of Bristol Quantum Computing",
    description: "Founded University of Bristol Quantum Computing after have a large uptake in applications for a UoB hackathon team for MIT iQuHack. This first involved leading a team to participate in a quantum computing hackathon hosted my MIT iQuse. Now, I run weekly sessions and plan to provide training and mentorship for new students to the area as well as designing and hosting accessible intra uni competitions..",
    photos: [
        Q1,
        bris1,
        bris2,
    ],
  },
  {
    title: "Avid climber - bouldering",
    description: "Enjoy indoor bouldering, started this year with a best climb of a v6. If I'm not on my laptop or in the pool, you'll probably find me at flashpoint Bristol!",
    photos: [
      c1,
        c2,
        c3,
    ],
  },
];

export const experiencesData = [
  {
    title: "UK HPC Team",
    subtitle: "UKSCC",
    description:'Representing the UK at ISC25. Application optimisation for OpenMX and LLMs (llama).',
    icon: React.createElement(AiFillDatabase),
    date: "May 2025 - Present",
  },
  {
    title: "Machine Learning Researcher",
    subtitle: "University of Bristol",
    description:'Developed scalable NN workflows for generating photorealistic, emotional faces for psychological research. University of Bristol, School of Brain, Behaviour and Health.',
    icon: React.createElement(FaBookOpen),
    date: "Feb 2025 - Present",
  },
  {
    title: "Machine Learning Software Engineer",
    subtitle: "DigitalU3",
    description:'2nd place Intel Partner AI PC Innovation, u3Core is a machine learning approach to hazard detection for IoT platforms. Engineered a machine learning-based system adaptable for various IoT integrations, focusing on efficiency. Developed a scalable web application, integrating backend functionalities and a structured database.',
    icon: React.createElement(FaBuilding),
    date: "Sep 2024 - Apr 2025",
  },
  {
    title: "Machine Learning Engineer",
    subtitle: "DeepSynthetics",
    description:'Developed advanced workflows for predictive modelling in all weather horse racing. Enhancing model performance by 250%+ through diverse machine learning methodologies.',
    icon: React.createElement(FaBuilding),
    date: "Dec 2024 - May 2025",
  },
  {
    title: "Founder",
    subtitle: "University of Bristol Quantum Computing",
    description:' Founder - After gauging interest for a quantum hackathon at the University of Bristol, it was clear that there were many like-minded people eager to break into this area.',
    icon: React.createElement(GiAtom),
    date: "Dec 2024",
  },
  {
    title: "President",
    subtitle: "University of Bristol Quantum Computing",
    description:' First elected president - Prepared and managed the planning of the university’s first quantum computing hackathon. Run, manage and oversee: weekly sessions, challenges and member’s interests.',
    icon: React.createElement(GiAtom),
    date: "Jan 2025 - Apr 2025",
  },
  {
    title: "Co-Founder",
    subtitle: "Veloworks Components",
    description:
    `Co-founded and operate a small business producing 3D-printed performance cycling components. Manage operations encompassing sponsorship, marketing, technical stages, and financial activities.`,
    icon: React.createElement(LuBike),
    date: "Aug 2024",
  },
] as const;

export const educationData = [
  {
    title: "BSc Computer Science",
    subtitle: "University of Bristol",
    description:
        `Achieving 83.5% (1st class), top in cohort (86%) for computer systems A
     
     Lead a team and coached 2 teams for UoB to attend MIT's iQuHack quantum hackathon. I ran an in house quantum hackathon to select teams and sessions to prepare.

    CIUK high performance computing cluster challenge. Best result of 2nd in the Logicalis real-time data scraping and visualisation challenge.

    Competitive swimming (Social Secretary), Triathlon and Computer Science societies.
    `,
    icon: React.createElement(LuGraduationCap),
    date: "Sep 2023 - Jun 2026",
  },
] as const;

export const projectsData = [
  {
    title: "Quantum cross-chain arbitrage",
    description:
        "🏆 Winners - ETH Oxford DeFi hackathon prize ($5000)🏆🥈Vyperlang bounty - 2nd place🥈Quantum-Enhanced Cross-Chain Arbitrage Bot (QXAB) uses Quantum Optimization (QAOA) and Flare’s blockchain protocols to execute fast, secure, and profitable cross-chain arbitrage trades via flash loans.",
    tags: ["Blockchain", "Quantum", "Vyper","QAOA"],
    imageUrl: MeDIImg,
    link: "https://github.com/TumCucTom/quantum-cross-chain-arbitrage"
  },
  {
    title: "CertAInty Quantum",
    description:
    "👑Winners EncodeAI Wormhole bounty👑\n" +
        "CertAInty Quantum is a suite of tools for quantum enhanced portfolio optimisation - made easy to understand and execute with informed AIs.\n" +
        "\n" +
        "We enhance Starkware's Brian AI (|Brian⟩) with our quantum pre execution scripts.\n" +
        "Empower users with quantum financial tools powered by Wormhole API\n" +
        "Provide a quantum informed XAI assistant to demystify the quantum x (De)Fi world in an explainable manner\n" +
        "We use solana to rebalance portfoliio's for low cost (gas fees)\n",
    tags: ["Python","Qiskit","ML","AI","Node.js"],
    imageUrl: ENCimg,
    link: "https://github.com/TumCucTom/Quantum-AI-DeFi-Portfolio-Optimisation"
  },
  {
    title: "All Weather Horse Racing Predictions [Ongoing]",
    description:
        "Racing odds predictor co-developed with a racing trading director at Entain. Experimenting with many ML and statistical approaches. Monte Carlo simulation using Gaussian performance modeling for odds creation.",
    tags: ["Python", "Torch", "Tensor", "ML", "AI", "NNs", "Pandas","NumPy"],
    imageUrl: AWHImg,
    link: "https://github.com/TumCucTom/all-weather-horse-racing-predictions"
  },
  {
    title: "py2note-AI",
    description:
        "Py2Notebook AI is a Python library that transforms Python scripts into Jupyter Notebooks. The tool leverages AI to generate insightful comments for each code block, helping to document and explain the code effectively.",
    tags: ["Java", "JavaScript", "Python", "Stable Diffusion"],
    imageUrl: pyImg,
    link: "https://github.com/TumCucTom/py2noteAI"
  },
  {
    title: "Quantum Traffic Flow [Ongoing]",
    description:
    "A project leveraging the Quantum Approximate Optimization Algorithm (QAOA) to enhance local traffic management in Bristol, England. Web-app to visualise the traffic and optimisations coming.",
    tags: ["Python", "Quantum computing", "Qiskit", "QAOA", "flask","vue","data science"],
    imageUrl: QCImg,
    link: "https://github.com/TumCucTom/quantum-compiler/tree/main"
  },
  {
    title: "Parallel vs Distributed Implementations for Conway's Game of Life",
    description:
    "86% scoring coursework. Implemented, optimised (including halo exchange, communication overhead, architecture considerations) and compared parallel (concurrent go programming) and distributed (AWS EC2 instances using RPC calls) versions for Conway's Game of Life. Report includes benchmarking algorithmic performance, Matlab for graphs and identifying bottlenecks using CPU profiling. Optimised network communication via publish/subscribe model ensuring fault tolerance and scalability.",
    tags: ["Go", "R","AWS","Academic writing","LaTeX","Concurrent programming", "Distributed","Algorithmic optimisations"],
    imageUrl: REPImg,
    link: "https://github.com/TumCucTom/Distributed-Vs-Parallel-GoL"
  },
  {
    title: "AI for chess in 3 Dimensions ",
    description:
        "The first ever game and engine for Chess in 3 dimensions. Makes use of an AI with a NN and Mini-Max. Includes a customisable UI. Includes and extensive report, with: Code,\n" +
        "UML diagram,\n" +
        "Flow charts for complicated algos and AI,\n" +
        "Unity environment, configuration and assets,\n" +
        "AI justifications,\n" +
        "Client feedback and interviews,\n" +
        "Research. Maximum mark scoring project.",
    tags: ["C#", "Game development", "Unity","OOP","AI", "ML", "MNs"],
    imageUrl: CHESSImg,
    link: "https://github.com/TumCucTom/AI-for-chess-in-3-dimensions"
  },
  {
    title: "Advent of Code",
    description:
        "My advent of code daily solutions. All 2024 days solved in python.",
    tags: ["Python", "algorithms", "graph theory", "Number Theory", "Dynamic Programming"],
    imageUrl: adventImg,
    link: "https://github.com/TumCucTom/Advent-Of-Code"
  },
  {
    title: "georgia-AI",
    description:
        "An AI designed for inferring the NYT Wordle without playing the game, only using the results of how up to 20 other people had guessed. Implements NN and beam search with sampling.",
    tags: ["Python", "NumPy", "Pandas", "Torch","NNs"],
    imageUrl: GAIImg,
    link: "https://github.com/TumCucTom/georgia-AI"
  },
  {
    title: "Other Projects - GitHub",
    description:
        "These include: Quantum hackathon for UoB; ML challenge for sixth form society; Algorithms II minigame; .PGM to .SK converter; mandelbrot set visualisation; and decimal to binary converter.",
    tags: ["C","Haskell","Python","Game development", "Hackathons"],
    imageUrl: gitImg,
    link: "https://github.com/TumCucTom/"
  },
] as const;

export const skillsData = [
  "Python",
  "Java",
  "C++",
  "C",
  "Haskell",
  "R",
  "Go",
  "C#",
  "Unity",
  "Game development",
  "JavaScript",
  "HTML",
  "CSS",
  "Node.js",
  "Vue.js",
  "Quasar", 
  "Figma",
  "Git",
  "GitHub",
  "SQL",
  "Algorithms",
  "Pandas", 
  "NumPy",
  "Qiskit",
  "Torch",
  "Tensor",
  "LaTex",
  "Jupyter",
  "AGILE Methodologies",
  "Test Driven Development",
  "Databases",
  "React",
    "CLI",
    "Flask"
] as const;