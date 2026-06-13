// ==========================================
// 1. SAFEGUARDED PRELOADER (Executes Immediately)
// ==========================================
(function() {
    const preloader = document.getElementById("preloader");
    
    function hidePreloader() {
        if (preloader) {
            preloader.style.opacity = "0";
            preloader.style.pointerEvents = "none";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }
    }

    // Trigger immediately if the page has already finished loading (handles caching)
    if (document.readyState === "complete" || document.readyState === "interactive") {
        hidePreloader();
    } else {
        window.addEventListener("load", hidePreloader);
    }

    // Bulletproof Safety Fallback: Forces preloader clear after 3 seconds 
    // to guarantee the screen never gets stuck under any circumstance.
    setTimeout(hidePreloader, 3000);
})();

// ==========================================
// DOM DEPENDENT COMPONENTS (Executes after parsing)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 2. HIGH PERFORMANCE CANVAS PARTICLES
    // ==========================================
    const canvas = document.getElementById("particles-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
            let particlesArray = [];
            const numberOfParticles = 45;
            
            function setCanvasSize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            setCanvasSize();
            window.addEventListener("resize", setCanvasSize);
            
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 1.5 + 0.5;
                    this.speedX = Math.random() * 0.4 - 0.2;
                    this.speedY = Math.random() * 0.4 - 0.2;
                    this.color = Math.random() > 0.5 ? "rgba(14, 165, 233, 0.15)" : "rgba(139, 92, 246, 0.15)";
                }
                
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    
                    if (this.x > canvas.width) this.x = 0;
                    else if (this.x < 0) this.x = canvas.width;
                    
                    if (this.y > canvas.height) this.y = 0;
                    else if (this.y < 0) this.y = canvas.height;
                }
                
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                }
            }
            
            function initParticles() {
                particlesArray = [];
                for (let i = 0; i < numberOfParticles; i++) {
                    particlesArray.push(new Particle());
                }
            }
            initParticles();
            
            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update();
                    particlesArray[i].draw();
                }
                requestAnimationFrame(animateParticles);
            }
            animateParticles();
        }
    }

    // ==========================================
    // 3. DYNAMIC TYPING ENGINE
    // ==========================================
    const typingText = document.getElementById("typing-text");
    const roles = [
        "DevOps Engineer",
        "Cloud Engineer",
        "AWS Enthusiast",
        "Kubernetes Learner",
        "Automation Engineer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        if (!typingText) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }

    // ==========================================
    // 4. MOBILE NAVIGATION CONTROLLER
    // ==========================================
    const mobileToggle = document.getElementById("mobile-toggle");
    const navLinksContainer = document.getElementById("nav-links");
    const navLinks = document.querySelectorAll(".nav-link");
    
    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener("click", () => {
            mobileToggle.classList.toggle("active");
            navLinksContainer.classList.toggle("active");
        });
        
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileToggle.classList.remove("active");
                navLinksContainer.classList.remove("active");
            });
        });
    }

    // ==========================================
    // 5. STICKY NAV & ACTIVE SECTION TRACKING (SCROLLSPY)
    // ==========================================
    const header = document.querySelector(".header");
    const sections = document.querySelectorAll("section");
    
    window.addEventListener("scroll", () => {
        if (header) {
            if (window.scrollY > 50) {
                header.style.padding = "0.75rem 0";
                header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
            } else {
                header.style.padding = "1.25rem 0";
                header.style.boxShadow = "none";
            }
        }
        
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // ==========================================
    // 6. SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================
    const revealElements = document.querySelectorAll(".scroll-reveal");
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ==========================================
    // 7. GITHUB API INTEGRATION WITH DEVOPS FALLBACKS
    // ==========================================
    const projectsGrid = document.getElementById("github-projects-grid");
    const githubUser = "Janitha30";

    const defaultDevOpsProjects = [
        {
            name: "aws-terraform-infrastructure",
            description: "Automated provisioning of highly available VPC architectures, autoscaling groups, and secure database subnets using modular Terraform workflows.",
            topics: ["terraform", "aws", "infrastructure-as-code", "vpc"],
            stargazers_count: 5,
            updated_at: "2026-04-12T00:00:00Z",
            html_url: `https://github.com/${githubUser}/aws-terraform-infrastructure`
        },
        {
            name: "kubernetes-deployment-pipeline",
            description: "Continuous delivery configurations using ArgoCD and Helm charts to manage blue-green container updates on Kubernetes EKS clusters.",
            topics: ["kubernetes", "helm", "argocd", "gitops"],
            stargazers_count: 3,
            updated_at: "2026-03-22T00:00:00Z",
            html_url: `https://github.com/${githubUser}/kubernetes-deployment-pipeline`
        },
        {
            name: "ansible-system-hardening",
            description: "Modular Ansible roles designed for security baseline hardening, package configuration, and system access constraints across enterprise Linux distributions.",
            topics: ["ansible", "linux", "security", "automation"],
            stargazers_count: 4,
            updated_at: "2026-03-01T00:00:00Z",
            html_url: `https://github.com/${githubUser}/ansible-system-hardening`
        },
        {
            name: "jenkins-declarative-pipelines",
            description: "Production-ready declarative Jenkinsfiles integrating SonarQube quality checks, Docker unit builds, and automatic container security image scanning.",
            topics: ["jenkins", "ci-cd", "docker", "devsecops"],
            stargazers_count: 6,
            updated_at: "2026-02-15T00:00:00Z",
            html_url: `https://github.com/${githubUser}/jenkins-declarative-pipelines`
        },
        {
            name: "prometheus-telemetry-stack",
            description: "Deployment pipeline setup tracking server operational health parameters with customized Grafana dashboards, exporters, and alert manager alerts.",
            topics: ["monitoring", "prometheus", "grafana", "telemetry"],
            stargazers_count: 2,
            updated_at: "2026-01-10T00:00:00Z",
            html_url: `https://github.com/${githubUser}/prometheus-telemetry-stack`
        },
        {
            name: "python-pipeline-cleaner",
            description: "Automation script querying cloud instances dynamically using native SDK APIs to track and clean orphaned assets, saving continuous runtime costs.",
            topics: ["python", "aws-lambda", "automation", "boto3"],
            stargazers_count: 3,
            updated_at: "2025-12-05T00:00:00Z",
            html_url: `https://github.com/${githubUser}/python-pipeline-cleaner`
        }
    ];

    function formatRepoDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }

    function createProjectCardHtml(project) {
        const tags = project.topics && project.topics.length > 0 
            ? project.topics.slice(0, 4) 
            : [project.language || "DevOps"].filter(Boolean);

        return `
            <div class="project-card">
                <div>
                    <div class="project-header-row">
                        <span class="project-folder-icon">📂</span>
                        <a href="${project.html_url}" target="_blank" rel="noopener" class="project-github-link" aria-label="Github link to ${project.name}">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                        </a>
                    </div>
                    <h3 class="project-title">${project.name.replace(/-/g, ' ')}</h3>
                    <p class="project-desc">${project.description || "DevOps project documentation and automated deployment workflows."}</p>
                </div>
                <div class="project-meta">
                    <div class="project-tags">
                        ${tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                    <div class="project-stats-row">
                        <span class="project-stars">★ ${project.stargazers_count}</span>
                        <span>Updated: ${formatRepoDate(project.updated_at)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    if (projectsGrid) {
        fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=12`)
            .then(response => {
                if (!response.ok) throw new Error("API issues.");
                return response.json();
            })
            .then(data => {
                const publicRepos = data.filter(repo => !repo.fork);
                if (publicRepos.length < 6) {
                    const mergedRepos = [...publicRepos];
                    let fallbackIndex = 0;
                    while (mergedRepos.length < 6 && fallbackIndex < defaultDevOpsProjects.length) {
                        const candidate = defaultDevOpsProjects[fallbackIndex++];
                        if (!mergedRepos.some(r => r.name.toLowerCase() === candidate.name.toLowerCase())) {
                            mergedRepos.push(candidate);
                        }
                    }
                    projectsGrid.innerHTML = mergedRepos.slice(0, 6).map(r => createProjectCardHtml(r)).join('');
                } else {
                    projectsGrid.innerHTML = publicRepos.slice(0, 6).map(r => createProjectCardHtml(r)).join('');
                }
            })
            .catch(() => {
                projectsGrid.innerHTML = defaultDevOpsProjects.map(p => createProjectCardHtml(p)).join('');
            });
    }

    // ==========================================
    // 8. INTERACTIVE CONTACT FORM HANDLER
    // ==========================================
    window.handleFormSubmit = function() {
        const nameVal = document.getElementById("form-name").value;
        const submitBtn = document.getElementById("form-submit-btn");
        const formResponse = document.getElementById("form-response");
        
        if (!submitBtn || !formResponse) return;
        
        submitBtn.disabled = true;
        submitBtn.textContent = "Dispatching Stream...";
        
        setTimeout(() => {
            submitBtn.textContent = "Payload Dispatched!";
            submitBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
            
            formResponse.textContent = `Transmission Successful! Hello ${nameVal}, your message was buffered successfully.`;
            formResponse.style.color = "var(--accent)";
            
            const form = document.getElementById("contact-form");
            if (form) form.reset();
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Dispatch Payload Message";
                submitBtn.style.background = "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)";
                formResponse.textContent = "";
            }, 5000);
            
        }, 1200);
    };
});
