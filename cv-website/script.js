// Section Toggle Script

// Projects data
const projectsData = [
    {
        title: "Quantum cross-chain arbitrage",
        description: " Winners - ETH Oxford DeFi hackathon prize ($5000)Vyperlang bounty - 2nd placeQuantum-Enhanced Cross-Chain Arbitrage Bot (QXAB) uses Quantum Approximate Optimisation Algorithm (QAOA) and Flare's blockchain protocols to execute fast, secure, and profitable cross-chain arbitrage trades via flash loans.",
        tags: ["Blockchain", "Quantum", "Vyper", "QAOA"],
        imageUrl: "assets/medi.png",
        link: "https://github.com/TumCucTom/quantum-cross-chain-arbitrage"
    },
    {
        title: "Llama 8B @ ISC 2025",
        description: "ISC25 Student Cluster Competition: LLaMA Fine-Tuning Task\n\nPerformance Optimisation Techniques:\nTo maximise training throughput on 8× H100 GPUs, we employed: FlashAttention 3 for H100-specific kernel optimisations, significantly reducing time per step while maintaining numerical stability. Transformer Engine with FP8 support for reduced memory usage and improved compute efficiency via autocasting and fused operations. FP8 precision for training to reduce memory footprint and accelerate computation, chosen over BF16 due to superior performance on H100s. Effective batch size of 256 (per_device_batch_size=16, num_gpus=8, gradient_accumulation_steps=2) for stable convergence within memory constraints.\n\nAccuracy Optimisation Techniques:\nDoRA (Delta-Orthogonal Rank Adaptation) - a fine-tuning technique improving upon LoRA and qLoRA by maintaining full-rank parameter contributions with minimal training overhead, achieving higher validation accuracy. Trained for 5 epochs with max_steps=69 per epoch, covering the dataset within time budget while ensuring convergence without overfitting.\n\nKey Decisions:\nChose DoRA over qLoRA prioritising model quality over minimal resource use given 8× H100 availability. Integrated FlashAttention 3 and Transformer Engine for significant throughput gains despite complexity. Selected FP8 over BF16 for larger batch sizes and faster execution, with Transformer Engine ensuring reliable training convergence.",
        tags: ["Python", "PyTorch", "HPC", "CUDA", "FP8", "FlashAttention", "Transformer Engine", "DoRA", "LLM", "Fine-tuning"],
        imageUrl: "assets/llama.avif",
        link: "https://github.com/TumCucTom/llama-8b-ISC-25/tree/main"
    },
    {
        title: "YukiGPT",
        description: "A decoder-only GPT implementation based on the transformer architecture proposed in 'Attention is All You Need', without encoder or cross-attention components. Built from scratch in Python following Andrej Karpathy's educational series. Trained to generate F1 radio messages. Includes implementations of: bigram language model, self-attention mechanism, and dataset utilities. Currently working towards expanding the model and implementing a custom tokeniser.",
        tags: ["GPT", "Transformers", "NLP", "Python", "PyTorch", "Deep Learning", "Attention Mechanisms"],
        imageUrl: "assets/aiayn.png",
        link: "https://github.com/TumCucTom/YukiGPT"
    },
    {
        title: "F1 Ghost Car",
        description: "An overhead reconstruction visualisation tool for Formula 1 qualifying sessions. Creates animated comparisons of two drivers' fastest qualifying laps for a given Grand Prix. Features include: animated car tracking with realistic track layouts, follow camera mode that tracks the cars, optional realistic track surface rendering, and support for comparing any two drivers from 2018-2024. Built in Python using matplotlib for visualisation and F1 position data for accurate lap reconstruction.",
        tags: ["F1","Data Visualisation", "Matplotlib", "Animation", "Sports Analytics", "Python"],
        imageUrl: "assets/hungary_2024_follow.gif",
        link: "https://github.com/TumCucTom/f1-ghost-car"
    },
    {
        title: "Parallel vs Distributed Implementations for Conway's Game of Life",
        description: "86% scoring coursework. Implemented, optimised (including halo exchange, communication overhead, architecture considerations) and compared parallel (concurrent go programming) and distributed (AWS EC2 instances using RPC calls) versions for Conway's Game of Life. Report includes benchmarking algorithmic performance, Matlab for graphs and identifying bottlenecks using CPU profiling. Optimised network communication via publish/subscribe model ensuring fault tolerance and scalability.",
        tags: ["Go", "AWS", "Academic writing", "LaTeX", "Concurrent programming", "Distributed", "Algorithmic optimisations"],
        imageUrl: "assets/rep.png",
        link: "https://github.com/TumCucTom/Distributed-Vs-Parallel-GoL"
    },
    {
        title: "AI for chess in 3 Dimensions",
        description: "The first ever game and engine for Chess in 3 dimensions. Makes use of an AI with a NN and Mini-Max. Includes a customisable UI. Includes and extensive report, with: Code, UML diagram, Flow charts for complicated algos and AI, Unity environment, configuration and assets, AI justifications, Client feedback and interviews, Research. Maximum mark scoring project.",
        tags: ["C#", "Game development", "Unity", "OOP", "AI", "ML", "MNs"],
        imageUrl: "assets/chess.png",
        link: "https://github.com/TumCucTom/AI-for-chess-in-3-dimensions"
    },
    {
        title: "Advent of Code",
        description: "My advent of code daily solutions. All 2024 days solved in python. 2025 solved in a different language each day.",
        tags: ["Python", "algorithms", "graph theory", "Number Theory", "Dynamic Programming"],
        imageUrl: "assets/advent.png",
        link: "https://github.com/TumCucTom/Advent-Of-Code"
    },
    {
        title: "georgia-AI",
        description: "An AI designed for inferring the NYT Wordle without playing the game, only using the results of how up to 20 other people had guessed. Implements NN and beam search with sampling.",
        tags: ["Python", "NumPy", "Pandas", "Torch", "NNs"],
        imageUrl: "assets/GAI.png",
        link: "https://github.com/TumCucTom/georgia-AI"
    },
    {
        title: "Other Projects - GitHub",
        description: "These include: Quantum hackathon for UoB; ML challenge for sixth form society; Algorithms II minigame; .PGM to .SK converter; mandelbrot set visualisation; and decimal to binary converter.",
        tags: ["C", "Haskell", "Python", "Game development", "Hackathons"],
        imageUrl: "assets/git.png",
        link: "https://github.com/TumCucTom/"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize projects
    initializeProjects();
    
    // Initialize achievement category expand/collapse
    initializeAchievementCategories();
    
    // Get all section toggles
    const sectionToggles = document.querySelectorAll('.section-toggle');
    
    sectionToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const sectionName = this.getAttribute('data-section');
            
            // Get both content versions for this section
            const defaultContent = document.querySelector(`[data-content="${sectionName}-default"]`);
            const alternateContent = document.querySelector(`[data-content="${sectionName}-alternate"]`);
            
            if (defaultContent && alternateContent) {
                // Checkbox checked = show alternate, unchecked = show default
                if (this.checked) {
                    // Switch to alternate
                    defaultContent.classList.add('hidden');
                    alternateContent.classList.remove('hidden');
                } else {
                    // Switch to default
                    defaultContent.classList.remove('hidden');
                    alternateContent.classList.add('hidden');
                }
            }
        });
    });
});

function initializeAchievementCategories() {
    const categories = document.querySelectorAll('.expandable-category');
    
    categories.forEach(category => {
        const expandBtn = category.querySelector('.category-expand-btn');
        const collapseBtn = category.querySelector('.category-collapse-btn');
        const expandedContent = category.querySelector('.category-expanded');
        const categoryHeader = category.querySelector('.category-header');
        const categoryItemsInline = category.querySelector('.category-items-inline');
        
        // Function to expand the category
        const expandCategory = function() {
            expandedContent.classList.remove('hidden');
            if (categoryHeader) categoryHeader.style.display = 'none';
        };
        
        // Function to collapse the category
        const collapseCategory = function() {
            expandedContent.classList.add('hidden');
            if (categoryHeader) categoryHeader.style.display = 'block';
        };
        
        if (expandBtn && expandedContent) {
            expandBtn.addEventListener('click', expandCategory);
        }
        
        if (categoryItemsInline && expandedContent) {
            categoryItemsInline.style.cursor = 'pointer';
            categoryItemsInline.addEventListener('click', expandCategory);
        }
        
        if (collapseBtn && expandedContent) {
            collapseBtn.addEventListener('click', collapseCategory);
        }
    });
}

function initializeProjects() {
    const projectsWrapper = document.querySelector('.projects-scroll-wrapper');
    if (!projectsWrapper) return;
    
    // Clear existing content
    projectsWrapper.innerHTML = '';
    
    // Create project cards
    projectsData.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsWrapper.appendChild(projectCard);
    });
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project-index', index);
    
    card.innerHTML = `
        <img src="${project.imageUrl}" alt="${project.title}" class="project-card-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22280%22 height=%22180%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22280%22 height=%22180%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-family=%22Arial%22 font-size=%2214%22%3E${encodeURIComponent(project.title)}%3C/text%3E%3C/svg%3E'">
        <div class="project-card-content">
            <h3 class="project-card-title">${project.title}</h3>
            <p class="project-card-description">${project.description.substring(0, 150)}...</p>
            <div class="project-card-tags">
                ${project.tags.slice(0, 3).map(tag => `<span class="project-card-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openProjectModal(project));
    
    return card;
}

function openProjectModal(project) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.project-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'project-modal active';
    
    modal.innerHTML = `
        <div class="project-modal-content">
            <div class="project-modal-header">
                <h2 class="project-modal-title">${project.title}</h2>
                <button class="project-modal-close">&times;</button>
            </div>
            <div class="project-modal-tags">
                ${project.tags.map(tag => `<span class="project-modal-tag">${tag}</span>`).join('')}
            </div>
            <p class="project-modal-description">${project.description}</p>
            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-modal-link">View Project →</a>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.project-modal-close');
    closeBtn.addEventListener('click', () => closeProjectModal(modal));
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal(modal);
        }
    });
    
    // Close on Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeProjectModal(modal);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function closeProjectModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.remove();
    }, 200);
}
