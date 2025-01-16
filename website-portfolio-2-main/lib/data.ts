import React from "react";
import { FaBuilding } from "react-icons/fa";
import { LuBike } from "react-icons/lu";
import { LuGraduationCap } from "react-icons/lu";
import { FaFirstAid } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";


import QFPImg from "@/public/QFP.png";
import GAIImg from "@/public/GAI.png";
import scotlandImg from "@/public/scotlandyard_ai.png";
import QCImg from "@/public/QC.png";
import gitImg from "@/public/git.png";
import pyImg from "@/public/py.png";
import AWHImg from "@/public/AWH.png"
import REPImg from "@/public/rep.png"
import CHESSImg from "@/public/chess.png"
import AOCImg from "@/public/aoc.png"

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
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "DigitalU3",
    subtitle: "Machine Learning and Software Engineer",
    description:
    `• Contract to create a ML micro-service top layer to integrate on top of an existing IoT platform for fire, smoke, and oil hazard detection.
    • Integration with AI edge and cloud cameras for dual deployment, SMS alerts, augmentation, preprocessing, and hyper parameter optimisation for the NN, database querys and async encryption for user data.
    • Quasar web-app, login pages and verification, data and logs pages, user and admin privileges.`,
    icon: React.createElement(FaBuilding),
    date: "Sept 2024 - Current",
  },
  {
    title: "Veloworks Components",
    subtitle: "Co-owner",
    description:
    `• Co-own and run a small business, where we create 3D printed, performance cycling products.
      • My role involves designing new products and customising existing designs for customers, arranging sponsorships with influencer athletes and cycling/tri clubs, social media marketing, overseeing the printing process and managing accounts.`,
    icon: React.createElement(LuBike),
    date: "Sept 2024 - Current",
  },
  {
    title: "Everyone Active SLM",
    subtitle: "Casual lifeguard",
    description:
    `0 hour contact at local pool`,
    icon: React.createElement(FaFirstAid),
    date: "Nov 2023 - Dec 2024",
  },
  {
    title: "Self Employed",
    subtitle: "Academic Tutor",
    description:
    `Tutored in Maths, English, Physics and Computer science for A-level, GCSE and 11+.`,
    icon: React.createElement(FaBook),
    date: "Jun 2021 - Sep 2023",
  },
  {
    title: "TriConsultants Ltd",
    subtitle: "VAT Database Management",
    description:
    `Summer job: Inputted to and managed a database for VAT from receipts and invoices for a small business that ships luxury goods to Vietnam. `,
    icon: React.createElement(AiFillDatabase),
    date: "Jul 2021 - Sep 2022",
  },
  {
    title: "University of Bristol",
    subtitle: "BSc Computer Science",
    description:
    `Predicted 1st Class
     
     Lead a team and coached 2 teams for UoB to attend MIT's iQuHack quantum hackathon. I ran an in house quantum hackathon to select teams and sessions to prepare.

    CIUK high performance computing cluster challenge. Best result of 2nd in the Logicalis real-time data scraping and visualisation challenge.

    Competitive swimming (Social Secretary), Triathlon and Computer science societies.
    `,
    icon: React.createElement(LuGraduationCap),
    date: "Sep 2023 - Jul 2026",
  },
] as const;

export const projectsData = [
  {
    title: "Quantum Finance Predictions",
    description:
    "A web app that takes a stock symbol, fetches historical data using alpha vantage's API and outputs predictions for future movement from training a QNN on that stock's past performance. Solution for a 3h creative hackathon - submitted with 4 jupyter notebooks for recreating the project and a LaTex report.",
    tags: ["Python","Qiskit","ML","AI","Node.js", "Jupyter", "NumPy", "Pandas", "LaTeX"],
    imageUrl: QFPImg,
    link: "https://github.com/TumCucTom/quantum-finanace-predictions"
  },
  {
    title: "All Weather Horse Racing Predictions [Ongoing]",
    description:
        "Utilised Go distributed processing on AWS EC2 to improve efficiency by benchmarking algorithmic performance and identifying bottlenecks using CPU profiling. Optimised network communication via publish/subscribe model ensuring fault tolerance and scalability.",
    tags: ["Python", "Torch", "Tensor", "ML", "AI", "NNs", "Pandas","NumPy", "Hyperparameter optimisation", "GBDTs"],
    imageUrl: AWHImg,
    link: "https://github.com/TumCucTom/all-weather-horse-racing-predictions"
  },
  {
    title: "Quantum Compiler [Ongoing]",
    description:
        "Basic quantum compiler that translates classical algorithms into quantum circuits. Currently has basic level conversion of gates and some use of quantum adders.",
    tags: ["Python", "Quantum computing", "Qiskit"],
    imageUrl: QCImg,
    link: "https://github.com/TumCucTom/quantum-compiler/tree/main"
  },
  {
    title: "georgia-AI",
    description:
    "An AI - using a NN and beam search with sampling to infer the NYT Wordle without playing the game, only using the results of how up to 20 other people had guessed",
    tags: ["Python", "NumPy", "Pandas", "Torch","NNs"],
    imageUrl: GAIImg,
    link: "https://github.com/TumCucTom/georgia-AI"
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
    title: "Parallel vs Distributed Implementations for Conway's Game of Life",
    description:
    "Implemented, optimised (inc halo exchange, communication overhead, architecture considerations) and compared parallel (concurrent go programming) and distributed (AWS EC2 instances using RPC calls) versions for Conway's Game of Life. Report includes benchmarking algorithmic performance, Matlab for graphs and identifying bottlenecks using CPU profiling. Optimised network communication via publish/subscribe model ensuring fault tolerance and scalability.",
    tags: ["Go", "R","AWS","Academic writing","LaTeX","Concurrent programming", "Distributed","Algorithmic optimisations"],
    imageUrl: REPImg,
    link: "https://github.com/TumCucTom/Distributed-Vs-Parallel-GoL"
  },
  {
    title: "AI for chess in 3 Dimensions ",
    description:
        "The first ever game and engine for Chess in 3 dimensions. Makes use of an AI with a NN and mini-max. Includes a customisable UI. Includes and extensive report, with: Code\n" +
        "UML diagram\n" +
        "Flow charts for complicated algos and AI\n" +
        "Unity environment, configuration and assets\n" +
        "AI justifications\n" +
        "Client feedback and interviews\n" +
        "Research. Maximum mark scoring project.",
    tags: ["C#", "Game development", "Unity","OOP","AI", "ML", "MNs"],
    imageUrl: CHESSImg,
    link: "https://github.com/TumCucTom/AI-for-chess-in-3-dimensions"
  },
  {
    title: "Advent of Code",
    description:
        "My advent of code solutions",
    tags: ["Python", "algorithms", "graph theory", "Number Theory", "Dynamic Programming"],
    imageUrl: AOCImg,
    link: "https://github.com/TumCucTom/Advent-Of-Code"
  },
  {
    title: "Scotland Yard Board Game & AI",
    description:
        "OOP implementation of the popular board game, using many designs patterns. AI agent designed to play the Scotland Yard boardgame, implementing Dijkstra’s algorithm and a Mini-Max game tree with alpha-beta pruning to optimize the AI agents winning performance based on a custom scoring function.",
    tags: ["Java","OOP", "Design Patterns", "AI"],
    imageUrl: scotlandImg,
    link: "https://github.com/TumCucTom/Scotland-Yard-AI"
  },
  {
    title: "Other Projects - Github",
    description:
        "These include: Quantum hackathon for UoB, ML challenge for sixth form society, Algorithms II minigame, .PGM to .SK converter, mandelbrot set visualisation, decimal to binary converter.",
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
] as const;