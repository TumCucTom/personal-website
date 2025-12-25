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
    title: "Competitive Swimmer",
    description: "Competing at BUCS and swimming for Bristol University performance squad.",
    photos: [
      IS1,
        IS2,
        IS3,

    ],
  },
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
    title: "Climbing",
    description: "Enjoy indoor bouldering, climbing v6-7. If I'm not on my laptop or in the pool, you'll probably find me in a climbing gym!",
    photos: [
      c1,
        c2,
        c3,
    ],
  },
  {
    title: "Formula Student AI",
    description: "Treasurer and Planning & Control Team Lead in Formula Student AI at University of Bristol.",
    photos: [],
  },
  {
    title: "Formula 1 Projects",
    description: "Developed F1-related projects including F1 Ghost Car visualisation tool for comparing qualifying laps, and various other projects working with F1 data.",
    photos: [],
  },
  {
    title: "High Performance Computing",
    description: "I have represented the UK at ISC25 Student Cluster Competition and represented the University of Bristol at CIUK high performance computing cluster challenge twice.",
    photos: [],
  },
  {
    title: "Quantum Computing",
    description: "I have casually studied quantum computing for 3 years. Founded University of Bristol Quantum Computing after having a large uptake in applications for a UoB hackathon team for MIT iQuHack. This first involved leading a team to participate in a quantum computing hackathon hosted by MIT iQuse. Now, I run weekly sessions and plan to provide training and mentorship for new students to the area as well as designing and hosting accessible intra uni competitions.",
    photos: [
        Q1,
        bris1,
        bris2,
    ],
  },
  {
    title: "Blind Solve Rubik's Cube",
    description: "I all enjoy all types of puzzles, from Rubik's cubes to jigsaw puzzles to escape rooms. At the moment, I want to get sub 4m for a blind 3x3 Rubik's cube solve.",
    photos: [],
  },
];

export const experiencesData = [
  {
    title: "Demonstrator and Graduate Teacher",
    subtitle: "University of Bristol",
    description:'Delivering Lectures and Workshop Exercises. Mentoring a small team of students through their year-long project (Software Engineering Project). Helping students in workshops (Computer Systems A, Programming Languages and Computation).',
    icon: React.createElement(LuGraduationCap),
    date: "Aug 2025 –",
  },
  {
    title: "UK HPC Student Team",
    subtitle: "UKSCC",
    description:'Represented the UK at ISC SCC. Optimised OpenMX and LLMs (llama) on a 208 core, 8xH100 cluster. Experience with load balancing, networking, OpenMP, MPI, and CUDA programming. Worked with SLURM, LAPACK, BLAS, ScaLAPACK, FFTW, ELPA, OpenBLAS, Intel MKL, and custom profiling. Explored LoRA, QORA, DORA, transformer engine, and FP8, flash attention 3 for llama 8B.',
    icon: React.createElement(AiFillDatabase),
    date: "May 2025 – Jun 2025",
  },
  {
    title: "Machine Learning Research Assistant",
    subtitle: "University of Bristol",
    description:'Developed a scalable ML workflow for generating photorealistic, emotional faces for psychological research.',
    icon: React.createElement(FaBookOpen),
    date: "Feb 2025 – Aug 2025",
  },
  {
    title: "Co-Founder & Operator",
    subtitle: "Veloworks Components",
    description:'Co-founded and operate a business producing 3D-printed performance cycling components. Manage operations encompassing sponsorship, marketing, technical stages, and financial activities.',
    icon: React.createElement(LuBike),
    date: "Sep 2024 –",
  },
  {
    title: "Machine Learning Software Engineer Intern",
    subtitle: "DigitalU3",
    description:'Engineered a machine learning-based system with a strong focus on efficiency and scalability. Collaborated in an AGILE team, contributing in sprints, code reviews, and iterative delivery. Developed a scalable web application with integrated backend and structured database.',
    icon: React.createElement(FaBuilding),
    date: "Sep 2024 – Mar 2025",
  },
] as const;

export const educationData = [
  {
    title: "BSc in Computer Science",
    subtitle: "University of Bristol",
    description:
        `78.33% avg; First Class
     
     Treasurer and Planning & Control Team Lead in Formula Student AI.

     Founder, President, Competitions Lead UoB Quantum Computing Society.
    `,
    icon: React.createElement(LuGraduationCap),
    date: "Sep 2023 – Current",
  },
  {
    title: "A-Levels",
    subtitle: "Colchester Royal Grammar School",
    description:
        `A*A*AA - Computer Science (ranked 1st in cohort; 100% NEA), Maths, Further maths, Physics.
    `,
    icon: React.createElement(LuGraduationCap),
    date: "Sep 2021 – Jul 2023",
  },
] as const;

export const projectsData = [
  {
    title: "Quantum cross-chain arbitrage",
    description:
        "Winners - ETH Oxford DeFi hackathon prize ($5000)Vyperlang bounty - 2nd placeQuantum-Enhanced Cross-Chain Arbitrage Bot (QXAB) uses Quantum Approximate Optimisation Algorithm (QAOA) and Flare's blockchain protocols to execute fast, secure, and profitable cross-chain arbitrage trades via flash loans.",
    tags: ["Blockchain", "Quantum", "Vyper", "QAOA"],
    imageUrl: MeDIImg,
    link: "https://github.com/TumCucTom/quantum-cross-chain-arbitrage"
  },
  {
    title: "Llama 8B @ ISC 2025",
    description:
        "ISC25 Student Cluster Competition: LLaMA Fine-Tuning Task\n\nPerformance Optimisation Techniques:\nTo maximise training throughput on 8× H100 GPUs, we employed: FlashAttention 3 for H100-specific kernel optimisations, significantly reducing time per step while maintaining numerical stability. Transformer Engine with FP8 support for reduced memory usage and improved compute efficiency via autocasting and fused operations. FP8 precision for training to reduce memory footprint and accelerate computation, chosen over BF16 due to superior performance on H100s. Effective batch size of 256 (per_device_batch_size=16, num_gpus=8, gradient_accumulation_steps=2) for stable convergence within memory constraints.\n\nAccuracy Optimisation Techniques:\nDoRA (Delta-Orthogonal Rank Adaptation) - a fine-tuning technique improving upon LoRA and qLoRA by maintaining full-rank parameter contributions with minimal training overhead, achieving higher validation accuracy. Trained for 5 epochs with max_steps=69 per epoch, covering the dataset within time budget while ensuring convergence without overfitting.\n\nKey Decisions:\nChose DoRA over qLoRA prioritising model quality over minimal resource use given 8× H100 availability. Integrated FlashAttention 3 and Transformer Engine for significant throughput gains despite complexity. Selected FP8 over BF16 for larger batch sizes and faster execution, with Transformer Engine ensuring reliable training convergence.",
    tags: ["Python", "PyTorch", "HPC", "CUDA", "FP8", "FlashAttention", "Transformer Engine", "DoRA", "LLM", "Fine-tuning"],
    imageUrl: MeDIImg, // Using existing image, will need to add llama.avif later
    link: "https://github.com/TumCucTom/llama-8b-ISC-25/tree/main"
  },
  {
    title: "YukiGPT",
    description:
        "A decoder-only GPT implementation based on the transformer architecture proposed in 'Attention is All You Need', without encoder or cross-attention components. Built from scratch in Python following Andrej Karpathy's educational series. Trained to generate F1 radio messages. Includes implementations of: bigram language model, self-attention mechanism, and dataset utilities. Currently working towards expanding the model and implementing a custom tokeniser.",
    tags: ["GPT", "Transformers", "NLP", "Python", "PyTorch", "Deep Learning", "Attention Mechanisms"],
    imageUrl: GAIImg, // Using existing image, will need to add aiayn.png later
    link: "https://github.com/TumCucTom/YukiGPT"
  },
  {
    title: "F1 Ghost Car",
    description:
        "An overhead reconstruction visualisation tool for Formula 1 qualifying sessions. Creates animated comparisons of two drivers' fastest qualifying laps for a given Grand Prix. Features include: animated car tracking with realistic track layouts, follow camera mode that tracks the cars, optional realistic track surface rendering, and support for comparing any two drivers from 2018-2024. Built in Python using matplotlib for visualisation and F1 position data for accurate lap reconstruction.",
    tags: ["F1","Data Visualisation", "Matplotlib", "Animation", "Sports Analytics", "Python"],
    imageUrl: AWHImg, // Using existing image, will need to add hungary_2024_follow.gif later
    link: "https://github.com/TumCucTom/f1-ghost-car"
  },
  {
    title: "Parallel vs Distributed Implementations for Conway's Game of Life",
    description:
        "86% scoring coursework. Implemented, optimised (including halo exchange, communication overhead, architecture considerations) and compared parallel (concurrent go programming) and distributed (AWS EC2 instances using RPC calls) versions for Conway's Game of Life. Report includes benchmarking algorithmic performance, Matlab for graphs and identifying bottlenecks using CPU profiling. Optimised network communication via publish/subscribe model ensuring fault tolerance and scalability.",
    tags: ["Go", "AWS", "Academic writing", "LaTeX", "Concurrent programming", "Distributed", "Algorithmic optimisations"],
    imageUrl: REPImg,
    link: "https://github.com/TumCucTom/Distributed-Vs-Parallel-GoL"
  },
  {
    title: "AI for chess in 3 Dimensions",
    description:
        "The first ever game and engine for Chess in 3 dimensions. Makes use of an AI with a NN and Mini-Max. Includes a customisable UI. Includes and extensive report, with: Code, UML diagram, Flow charts for complicated algos and AI, Unity environment, configuration and assets, AI justifications, Client feedback and interviews, Research. Maximum mark scoring project.",
    tags: ["C#", "Game development", "Unity", "OOP", "AI", "ML", "MNs"],
    imageUrl: CHESSImg,
    link: "https://github.com/TumCucTom/AI-for-chess-in-3-dimensions"
  },
  {
    title: "Advent of Code",
    description:
        "My advent of code daily solutions. All 2024 days solved in python. 2025 solved in a different language each day.",
    tags: ["Python", "algorithms", "graph theory", "Number Theory", "Dynamic Programming"],
    imageUrl: adventImg,
    link: "https://github.com/TumCucTom/Advent-Of-Code"
  },
  {
    title: "georgia-AI",
    description:
        "An AI designed for inferring the NYT Wordle without playing the game, only using the results of how up to 20 other people had guessed. Implements NN and beam search with sampling.",
    tags: ["Python", "NumPy", "Pandas", "Torch", "NNs"],
    imageUrl: GAIImg,
    link: "https://github.com/TumCucTom/georgia-AI"
  },
  {
    title: "Other Projects - GitHub",
    description:
        "These include: Quantum hackathon for UoB; ML challenge for sixth form society; Algorithms II minigame; .PGM to .SK converter; mandelbrot set visualisation; and decimal to binary converter.",
    tags: ["C", "Haskell", "Python", "Game development", "Hackathons"],
    imageUrl: gitImg,
    link: "https://github.com/TumCucTom/"
  },
] as const;

export const skillsData = [
  "Python",
  "Go",
  "Java",
  "C",
  "C#",
  "Haskell",
  "HTML/CSS",
  "JavaScript",
  "SQL",
  "API/REST",
  "Git/Github",
  "React Native",
  "PyTorch",
  "TensorFlow",
  "Qiskit",
  "AWS",
  "Cursor",
  "AGILE & Test-Driven Development",
  "Quantum Programming",
  "Machine Learning (ML)",
  "Artificial Intelligence (AI)",
  "High performance computing (HPC)",
  "CAD",
  "Generative AI",
  "Computer Vision",
  "LLM",
  "A/B Testing",
  "NLP"
] as const;