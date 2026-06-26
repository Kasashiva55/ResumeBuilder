// ==========================================================================
// Default Sample Data (Matches the new specifications)
// ==========================================================================

const SAMPLE_DATA = {
  personal: {
    name: "SARVESH N HIREMATH",
    location: "Hubballi, Karnataka",
    phone: "+91-6364563283",
    email: "sarusondj@gmail.com",
    linkedinText: "LinkedIn",
    linkedinUrl: "https://linkedin.com",
    githubText: "GitHub",
    githubUrl: "https://github.com"
  },
  summary: "Full Stack Web Developer skilled in React.js, Node.js, Express, MongoDB, JavaScript, and Tailwind CSS. Experienced in building end-to-end responsive web applications with a focus on clean API integration, component-based architectures, and real-time database management.",
  education: {
    graduation: {
      collegeName: "Basaveshwar Engineering College, Bagalkot",
      degree: "B.E",
      cgpa: "6.20",
      duration: "2022 - 2026",
      location: "Bagalkot, Karnataka"
    },
    intermediate: {
      collegeName: "P. C. Jabin College, Hubballi",
      board: "KSEEB (Class XII) - PCMCs",
      percentage: "52.2%",
      year: "2020 - 2022",
      location: "Hubballi, Karnataka"
    },
    school: {
      schoolName: "Bethal English Medium School, Navanagar, Hubballi",
      board: "KSEEB (Class X)",
      percentage: "77.92%",
      year: "2019 - 2020",
      location: "Hubballi, Karnataka"
    }
  },
  experience: [
    {
      company: "Orbit Core Tech LLP",
      role: "Full Stack Developer Intern",
      duration: "Jan 2026 - May 2026",
      location: "Huballi, Karnataka",
      bullets: [
        "Contributed to **Mom's Kitchen**, a live production web application, using React.js for the frontend, Node.js for the backend, and MongoDB as the database.",
        "Designed and integrated robust REST APIs, managed database schema structures, and optimized frontend components for enhanced user experience.",
        "**Certificate**: [View Internship Certificate](https://example.com)"
      ]
    }
  ],
  projects: [
    {
      title: "GROZY - HYPERLOCAL B2B/B2C RETAIL MARKETPLACE",
      description: "Designed and developed a hyperlocal multi-vendor grocery and retail marketplace. Built responsive user interfaces, B2C storefront, vendor/store-admin inventory and billing panels.",
      techUsed: "React.js, Node.js (Express), MongoDB, Tailwind CSS, Vite, JWT",
      bullets: [
        "Enforced staff role authorization; integrated email OTP verification; designed responsive search, category filtering, and real-time order alerts."
      ]
    },
    {
      title: "REAL-TIME QR CODE SCANNER",
      description: "Developed a web-based QR and barcode scanner using camera feeds to decode data in real-time.",
      techUsed: "HTML, CSS, JavaScript, HTML5-QRCode Library, Web APIs",
      bullets: [
        "Designed to automatically look up and map scanned results to inventory databases."
      ]
    }
  ],
  skills: [
    { category: "Programming & DB", list: "JavaScript, SQL, MongoDB" },
    { category: "Web Technologies", list: "HTML, CSS, Tailwind CSS, Node.js, Express" },
    { category: "Frontend", list: "React.js" },
    { category: "Tools & IDEs", list: "GitHub, VS Code" },
    { category: "Languages", list: "English, Kannada, Hindi" }
  ],
  certifications: [
    { name: "Privacy and Security in Online Social Media (12-week course) - [View Certificate](https://example.com)" },
    { name: "Computer Integrated Manufacturing (12-week course) - [View Certificate](https://example.com)" }
  ]
};

// Global State
let resumeData = {};

// ==========================================================================
// Initialization & Data Loading
// ==========================================================================

function init() {
  const savedData = localStorage.getItem('latex_resume_data_refined');
  if (savedData) {
    try {
      resumeData = JSON.parse(savedData);
    } catch (e) {
      console.error("Failed to parse saved local resume data, loading sample data instead.", e);
      resumeData = JSON.parse(JSON.stringify(SAMPLE_DATA));
    }
  } else {
    resumeData = JSON.parse(JSON.stringify(SAMPLE_DATA));
  }
  
  // Theme Toggle Setup
  const savedTheme = localStorage.getItem('app-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Pre-fill Forms
  populateFormFromState();
  
  // Bind Accordion Actions
  setupAccordions();
  
  // Bind Zoom Controller
  setupZoom();
  
  // Render initial preview immediately (using sample/saved data)
  updatePreview();

  // Always initialize in Editor Mode (hide preview screen)
  document.body.classList.remove('show-preview');
}

function saveState() {
  localStorage.setItem('latex_resume_data_refined', JSON.stringify(resumeData));
}

// ==========================================================================
// Markdown & Link Parsing
// ==========================================================================

function parseMarkdown(text) {
  if (!text) return '';
  
  // Standard XSS prevention
  let escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  
  // Parse **bold** into <strong>bold</strong>
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Parse [text](url) into <a href="url" target="_blank">text</a>
  escaped = escaped.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
  
  return escaped;
}

// ==========================================================================
// Accordions Toggle Event Setup
// ==========================================================================

function setupAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    const newHeader = header.cloneNode(true);
    header.parentNode.replaceChild(newHeader, header);
    
    newHeader.addEventListener('click', () => {
      const item = newHeader.closest('.accordion-item');
      item.classList.toggle('active');
    });
  });
}

// ==========================================================================
// Zoom Controller Setup
// ==========================================================================

function setupZoom() {
  const slider = document.getElementById('zoom-slider');
  const valueDisplay = document.getElementById('zoom-value');
  const pageWrapper = document.querySelector('.resume-page-wrapper');
  
  function applyZoom(val) {
    slider.value = val;
    valueDisplay.textContent = `${val}%`;
    pageWrapper.style.transform = `scale(${val / 100})`;
  }
  
  let zoomVal = parseInt(localStorage.getItem('zoom-factor')) || 100;
  applyZoom(zoomVal);
  
  slider.addEventListener('input', (e) => {
    zoomVal = parseInt(e.target.value);
    applyZoom(zoomVal);
    localStorage.setItem('zoom-factor', zoomVal);
  });
  
  document.getElementById('btn-zoom-in').addEventListener('click', () => {
    zoomVal = Math.min(150, zoomVal + 10);
    applyZoom(zoomVal);
    localStorage.setItem('zoom-factor', zoomVal);
  });
  
  document.getElementById('btn-zoom-out').addEventListener('click', () => {
    zoomVal = Math.max(50, zoomVal - 10);
    applyZoom(zoomVal);
    localStorage.setItem('zoom-factor', zoomVal);
  });
  
  document.getElementById('btn-zoom-reset').addEventListener('click', () => {
    zoomVal = 100;
    applyZoom(zoomVal);
    localStorage.setItem('zoom-factor', zoomVal);
  });
}

// ==========================================================================
// MVC Data Flows: harvestFormState & populateFormFromState
// ==========================================================================

function harvestFormState() {
  // 1. Basic Details
  resumeData.personal = {
    name: document.getElementById('p-name').value,
    location: document.getElementById('p-location').value,
    phone: document.getElementById('p-phone').value,
    email: document.getElementById('p-email').value,
    linkedinText: document.getElementById('p-linkedin-text').value,
    linkedinUrl: document.getElementById('p-linkedin-url').value,
    githubText: document.getElementById('p-github-text').value,
    githubUrl: document.getElementById('p-github-url').value
  };
  
  // 2. Summary
  resumeData.summary = document.getElementById('p-summary').value;
  
  // 3. Education
  resumeData.education = {
    graduation: {
      collegeName: document.getElementById('edu-coll-name').value,
      degree: document.getElementById('edu-coll-degree').value,
      cgpa: document.getElementById('edu-coll-cgpa').value,
      duration: document.getElementById('edu-coll-duration').value,
      location: document.getElementById('edu-coll-location').value
    },
    intermediate: {
      collegeName: document.getElementById('edu-int-college').value,
      board: document.getElementById('edu-int-board').value,
      percentage: document.getElementById('edu-int-percentage').value,
      year: document.getElementById('edu-int-year').value,
      location: document.getElementById('edu-int-location').value
    },
    school: {
      schoolName: document.getElementById('edu-sch-name').value,
      board: document.getElementById('edu-sch-board').value,
      percentage: document.getElementById('edu-sch-percentage').value,
      year: document.getElementById('edu-sch-year').value,
      location: document.getElementById('edu-sch-location').value
    }
  };
  
  // 4. Experience (Harvest DOM inputs)
  resumeData.experience = [];
  document.querySelectorAll('#experience-list .dynamic-item-card').forEach(card => {
    const company = card.querySelector('.exp-company').value;
    const role = card.querySelector('.exp-role').value;
    const location = card.querySelector('.exp-location').value;
    const duration = card.querySelector('.exp-duration').value;
    
    const bullets = [];
    card.querySelectorAll('.bullet-row input').forEach(input => {
      bullets.push(input.value);
    });
    
    resumeData.experience.push({ company, role, location, duration, bullets });
  });
  
  // 5. Projects (Harvest DOM inputs)
  resumeData.projects = [];
  document.querySelectorAll('#projects-list .dynamic-item-card').forEach(card => {
    const title = card.querySelector('.proj-title').value;
    const description = card.querySelector('.proj-desc').value;
    const techUsed = card.querySelector('.proj-tech').value;
    
    const bullets = [];
    card.querySelectorAll('.bullet-row input').forEach(input => {
      bullets.push(input.value);
    });
    
    resumeData.projects.push({ title, description, techUsed, bullets });
  });
  
  // 6. Skills (Harvest DOM inputs)
  resumeData.skills = [];
  document.querySelectorAll('#skills-list .dynamic-item-card').forEach(card => {
    const category = card.querySelector('.skill-cat').value;
    const list = card.querySelector('.skill-list').value;
    resumeData.skills.push({ category, list });
  });
  
  // 7. Certifications (Harvest DOM inputs)
  resumeData.certifications = [];
  document.querySelectorAll('#certifications-list .dynamic-item-card').forEach(card => {
    const name = card.querySelector('.cert-name').value;
    resumeData.certifications.push({ name });
  });
}

function populateFormFromState() {
  // Basic Info
  const p = resumeData.personal || {};
  document.getElementById('p-name').value = p.name || '';
  document.getElementById('p-location').value = p.location || '';
  document.getElementById('p-phone').value = p.phone || '';
  document.getElementById('p-email').value = p.email || '';
  document.getElementById('p-linkedin-text').value = p.linkedinText || 'LinkedIn';
  document.getElementById('p-linkedin-url').value = p.linkedinUrl || '';
  document.getElementById('p-github-text').value = p.githubText || 'GitHub';
  document.getElementById('p-github-url').value = p.githubUrl || '';
  
  // Summary
  document.getElementById('p-summary').value = resumeData.summary || '';
  
  // Education
  const edu = resumeData.education || {};
  const grad = edu.graduation || {};
  document.getElementById('edu-coll-name').value = grad.collegeName || '';
  document.getElementById('edu-coll-degree').value = grad.degree || '';
  document.getElementById('edu-coll-cgpa').value = grad.cgpa || '';
  document.getElementById('edu-coll-duration').value = grad.duration || '';
  document.getElementById('edu-coll-location').value = grad.location || '';
  
  const inter = edu.intermediate || {};
  document.getElementById('edu-int-college').value = inter.collegeName || '';
  document.getElementById('edu-int-board').value = inter.board || '';
  document.getElementById('edu-int-percentage').value = inter.percentage || '';
  document.getElementById('edu-int-year').value = inter.year || '';
  document.getElementById('edu-int-location').value = inter.location || '';
  
  const sch = edu.school || {};
  document.getElementById('edu-sch-name').value = sch.schoolName || '';
  document.getElementById('edu-sch-board').value = sch.board || '';
  document.getElementById('edu-sch-percentage').value = sch.percentage || '';
  document.getElementById('edu-sch-year').value = sch.year || '';
  document.getElementById('edu-sch-location').value = sch.location || '';
  
  // Render Dynamic Editors
  renderExperienceListEditor();
  renderProjectsListEditor();
  renderSkillsListEditor();
  renderCertificationsListEditor();
}

// ==========================================================================
// Dynamic Section Editor Rendering & Modifiers (Add, Remove, Swap)
// ==========================================================================

function swapArrayElements(arr, iA, iB) {
  const temp = arr[iA];
  arr[iA] = arr[iB];
  arr[iB] = temp;
}

function createCardControlsHtml(section, idx, len) {
  return `
    <div class="card-header-actions">
      <span class="card-title">${section.toUpperCase()} #${idx + 1}</span>
      <div class="card-controls">
        <button type="button" class="btn-control-icon" onclick="moveItemUp('${section}', ${idx})" ${idx === 0 ? 'disabled' : ''} title="Move Up">
          <i class="fa-solid fa-arrow-up"></i>
        </button>
        <button type="button" class="btn-control-icon" onclick="moveItemDown('${section}', ${idx})" ${idx === len - 1 ? 'disabled' : ''} title="Move Down">
          <i class="fa-solid fa-arrow-down"></i>
        </button>
        <button type="button" class="btn-control-icon delete-btn" onclick="removeItem('${section}', ${idx})" title="Delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `;
}

// Global actions bound to window
window.moveItemUp = function(section, index) {
  harvestFormState();
  if (index > 0) {
    swapArrayElements(resumeData[section], index, index - 1);
    saveState();
    populateFormFromState();
  }
};

window.moveItemDown = function(section, index) {
  harvestFormState();
  if (index < resumeData[section].length - 1) {
    swapArrayElements(resumeData[section], index, index + 1);
    saveState();
    populateFormFromState();
  }
};

window.removeItem = function(section, index) {
  harvestFormState();
  resumeData[section].splice(index, 1);
  saveState();
  populateFormFromState();
};

/* --- 1. EXPERIENCE --- */
function renderExperienceListEditor() {
  const container = document.getElementById('experience-list');
  container.innerHTML = '';
  const list = resumeData.experience || [];
  
  list.forEach((item, idx) => {
    let bulletsHtml = '';
    const bullets = item.bullets || [''];
    bullets.forEach((bullet, bulletIdx) => {
      bulletsHtml += `
        <div class="bullet-row">
          <input type="text" class="exp-bullet-input" value="${bullet.replace(/"/g, '&quot;')}" placeholder="Responsibility bullet point..." required>
          <button type="button" class="btn-control-icon delete-btn" onclick="removeExpBullet(${idx}, ${bulletIdx})" title="Remove Bullet">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `;
    });
    
    const card = document.createElement('div');
    card.className = 'dynamic-item-card';
    card.innerHTML = `
      ${createCardControlsHtml('experience', idx, list.length)}
      <div class="grid-2">
        <div class="form-group">
          <label>Company Name <span class="required">*</span></label>
          <input type="text" class="exp-company" value="${item.company || ''}" placeholder="Orbit Core Tech LLP" required>
        </div>
        <div class="form-group">
          <label>Role <span class="required">*</span></label>
          <input type="text" class="exp-role" value="${item.role || ''}" placeholder="Full Stack Developer Intern" required>
        </div>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label>Location <span class="required">*</span></label>
          <input type="text" class="exp-location" value="${item.location || ''}" placeholder="Huballi, Karnataka" required>
        </div>
        <div class="form-group">
          <label>Duration <span class="required">*</span></label>
          <input type="text" class="exp-duration" value="${item.duration || ''}" placeholder="Jan 2026 - May 2026" required>
        </div>
      </div>
      <div class="bullets-editor-container">
        <label class="form-group" style="margin-bottom: 8px;"><span style="font-size: 11px; font-weight: 600; color: var(--text-muted);">Responsibilities (Bullets) <span class="required">*</span></span></label>
        <div id="exp-bullets-${idx}">
          ${bulletsHtml}
        </div>
        <button type="button" class="btn-add-bullet" onclick="addExpBullet(${idx})">
          <i class="fa-solid fa-plus"></i> Add Bullet Point
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

window.addExpBullet = function(idx) {
  harvestFormState();
  if (!resumeData.experience[idx].bullets) resumeData.experience[idx].bullets = [];
  resumeData.experience[idx].bullets.push('');
  populateFormFromState();
};

window.removeExpBullet = function(idx, bulletIdx) {
  harvestFormState();
  resumeData.experience[idx].bullets.splice(bulletIdx, 1);
  if (resumeData.experience[idx].bullets.length === 0) {
    resumeData.experience[idx].bullets.push('');
  }
  populateFormFromState();
};

document.getElementById('btn-add-experience').addEventListener('click', () => {
  harvestFormState();
  if (!resumeData.experience) resumeData.experience = [];
  resumeData.experience.push({ company: '', role: '', duration: '', location: '', bullets: [''] });
  populateFormFromState();
});

/* --- 2. PROJECTS --- */
function renderProjectsListEditor() {
  const container = document.getElementById('projects-list');
  container.innerHTML = '';
  const list = resumeData.projects || [];
  
  list.forEach((item, idx) => {
    let bulletsHtml = '';
    const bullets = item.bullets || [''];
    bullets.forEach((bullet, bulletIdx) => {
      bulletsHtml += `
        <div class="bullet-row">
          <input type="text" class="proj-bullet-input" value="${bullet.replace(/"/g, '&quot;')}" placeholder="Key feature description..." required>
          <button type="button" class="btn-control-icon delete-btn" onclick="removeProjBullet(${idx}, ${bulletIdx})" title="Remove Bullet">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `;
    });
    
    const card = document.createElement('div');
    card.className = 'dynamic-item-card';
    card.innerHTML = `
      ${createCardControlsHtml('projects', idx, list.length)}
      <div class="form-group">
        <label>Project Title <span class="required">*</span></label>
        <input type="text" class="proj-title" value="${item.title || ''}" placeholder="GROZY - HYPERLOCAL RETAIL MARKETPLACE" required>
      </div>
      <div class="form-group">
        <label>Description <span class="required">*</span></label>
        <textarea rows="2" class="proj-desc" placeholder="Designed and developed a hyperlocal grocery..." required>${item.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Technologies Used <span class="required">*</span></label>
        <input type="text" class="proj-tech" value="${item.techUsed || ''}" placeholder="React.js, Node.js, MongoDB" required>
      </div>
      <div class="bullets-editor-container">
        <label class="form-group" style="margin-bottom: 8px;"><span style="font-size: 11px; font-weight: 600; color: var(--text-muted);">Key Features (Bullets) <span class="required">*</span></span></label>
        <div id="proj-bullets-${idx}">
          ${bulletsHtml}
        </div>
        <button type="button" class="btn-add-bullet" onclick="addProjBullet(${idx})">
          <i class="fa-solid fa-plus"></i> Add Key Feature Bullet
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

window.addProjBullet = function(idx) {
  harvestFormState();
  if (!resumeData.projects[idx].bullets) resumeData.projects[idx].bullets = [];
  resumeData.projects[idx].bullets.push('');
  populateFormFromState();
};

window.removeProjBullet = function(idx, bulletIdx) {
  harvestFormState();
  resumeData.projects[idx].bullets.splice(bulletIdx, 1);
  if (resumeData.projects[idx].bullets.length === 0) {
    resumeData.projects[idx].bullets.push('');
  }
  populateFormFromState();
};

document.getElementById('btn-add-project').addEventListener('click', () => {
  harvestFormState();
  if (!resumeData.projects) resumeData.projects = [];
  resumeData.projects.push({ title: '', description: '', techUsed: '', bullets: [''] });
  populateFormFromState();
});

/* --- 3. TECHNICAL SKILLS --- */
function renderSkillsListEditor() {
  const container = document.getElementById('skills-list');
  container.innerHTML = '';
  const list = resumeData.skills || [];
  
  list.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'dynamic-item-card';
    card.innerHTML = `
      ${createCardControlsHtml('skills', idx, list.length)}
      <div class="grid-2">
        <div class="form-group">
          <label>Skill Category Name <span class="required">*</span></label>
          <input type="text" class="skill-cat" value="${item.category || ''}" placeholder="e.g. Programming & DB" required>
        </div>
        <div class="form-group">
          <label>Corresponding Skills <span class="required">*</span></label>
          <input type="text" class="skill-list" value="${item.list || ''}" placeholder="e.g. JavaScript, SQL, MongoDB" required>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

document.getElementById('btn-add-skill').addEventListener('click', () => {
  harvestFormState();
  if (!resumeData.skills) resumeData.skills = [];
  resumeData.skills.push({ category: '', list: '' });
  populateFormFromState();
});

/* --- 4. CERTIFICATIONS --- */
function renderCertificationsListEditor() {
  const container = document.getElementById('certifications-list');
  container.innerHTML = '';
  const list = resumeData.certifications || [];
  
  list.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'dynamic-item-card';
    card.innerHTML = `
      ${createCardControlsHtml('certifications', idx, list.length)}
      <div class="form-group">
        <label>Certification Name <span class="required">*</span></label>
        <input type="text" class="cert-name" value="${item.name || ''}" placeholder="e.g. Google UX Design Certificate" required>
      </div>
    `;
    container.appendChild(card);
  });
}

document.getElementById('btn-add-certification').addEventListener('click', () => {
  harvestFormState();
  if (!resumeData.certifications) resumeData.certifications = [];
  resumeData.certifications.push({ name: '' });
  populateFormFromState();
});

// ==========================================================================
// Preview Rendering Engine
// ==========================================================================

function updatePreview() {
  // 1. Basic Details
  const p = resumeData.personal || {};
  document.getElementById('r-name').textContent = p.name || 'YOUR NAME';
  document.getElementById('r-location').textContent = p.location || 'City, State';
  
  // Phone
  if (p.phone) {
    document.getElementById('r-phone').textContent = p.phone;
    document.getElementById('r-phone-container').style.display = 'inline-flex';
  } else {
    document.getElementById('r-phone-container').style.display = 'none';
  }
  
  // Email
  if (p.email) {
    const emailEl = document.getElementById('r-email');
    emailEl.textContent = p.email;
    emailEl.href = `mailto:${p.email}`;
    document.getElementById('r-email-container').style.display = 'inline-flex';
  } else {
    document.getElementById('r-email-container').style.display = 'none';
  }
  
  // LinkedIn
  if (p.linkedinText && p.linkedinUrl) {
    const liEl = document.getElementById('r-linkedin');
    liEl.textContent = p.linkedinText;
    liEl.href = p.linkedinUrl;
    document.getElementById('r-linkedin-container').style.display = 'inline-flex';
  } else {
    document.getElementById('r-linkedin-container').style.display = 'none';
  }
  
  // GitHub
  if (p.githubText && p.githubUrl) {
    const ghEl = document.getElementById('r-github');
    ghEl.textContent = p.githubText;
    ghEl.href = p.githubUrl;
    document.getElementById('r-github-container').style.display = 'inline-flex';
  } else {
    document.getElementById('r-github-container').style.display = 'none';
  }
  
  // 2. Summary
  if (resumeData.summary) {
    document.getElementById('r-summary').innerHTML = parseMarkdown(resumeData.summary);
    document.getElementById('rs-summary').style.display = 'block';
  } else {
    document.getElementById('rs-summary').style.display = 'none';
  }
  
  // 3. Education
  const eduContainer = document.getElementById('r-education');
  eduContainer.innerHTML = '';
  const edu = resumeData.education || {};
  const grad = edu.graduation || {};
  const inter = edu.intermediate || {};
  const sch = edu.school || {};
  
  let hasEdu = false;
  
  if (grad.collegeName) {
    hasEdu = true;
    const entry = document.createElement('div');
    entry.className = 'r-entry';
    entry.innerHTML = `
      <div class="r-entry-row">
        <div class="r-entry-left-bold">${parseMarkdown(grad.collegeName)}</div>
        <div class="r-entry-right-bold">${parseMarkdown(grad.duration)}</div>
      </div>
      <div class="r-entry-row">
        <div class="r-entry-left-italic">${parseMarkdown(grad.degree)} - <strong>CGPA:</strong> ${grad.cgpa}</div>
        <div class="r-entry-right-italic">${parseMarkdown(grad.location)}</div>
      </div>
    `;
    eduContainer.appendChild(entry);
  }
  
  if (inter.collegeName) {
    hasEdu = true;
    const entry = document.createElement('div');
    entry.className = 'r-entry';
    entry.innerHTML = `
      <div class="r-entry-row">
        <div class="r-entry-left-bold">${parseMarkdown(inter.collegeName)}</div>
        <div class="r-entry-right-bold">${parseMarkdown(inter.year)}</div>
      </div>
      <div class="r-entry-row">
        <div class="r-entry-left-italic">${parseMarkdown(inter.board)} - <strong>${inter.percentage}</strong></div>
        <div class="r-entry-right-italic">${parseMarkdown(inter.location)}</div>
      </div>
    `;
    eduContainer.appendChild(entry);
  }
  
  if (sch.schoolName) {
    hasEdu = true;
    const entry = document.createElement('div');
    entry.className = 'r-entry';
    entry.innerHTML = `
      <div class="r-entry-row">
        <div class="r-entry-left-bold">${parseMarkdown(sch.schoolName)}</div>
        <div class="r-entry-right-bold">${parseMarkdown(sch.year)}</div>
      </div>
      <div class="r-entry-row">
        <div class="r-entry-left-italic">${parseMarkdown(sch.board)} - <strong>${sch.percentage}</strong></div>
        <div class="r-entry-right-italic">${parseMarkdown(sch.location)}</div>
      </div>
    `;
    eduContainer.appendChild(entry);
  }
  
  document.getElementById('rs-education').style.display = hasEdu ? 'block' : 'none';
  
  // 4. Experience
  const expContainer = document.getElementById('r-experience');
  expContainer.innerHTML = '';
  if (resumeData.experience && resumeData.experience.length > 0) {
    document.getElementById('rs-experience').style.display = 'block';
    resumeData.experience.forEach(item => {
      const entry = document.createElement('div');
      entry.className = 'r-entry';
      
      let bulletsHtml = '';
      if (item.bullets && item.bullets.length > 0) {
        bulletsHtml = '<ul class="r-bullets">';
        item.bullets.forEach(bullet => {
          if (bullet.trim() !== '') {
            bulletsHtml += `<li>${parseMarkdown(bullet)}</li>`;
          }
        });
        bulletsHtml += '</ul>';
      }
      
      entry.innerHTML = `
        <div class="r-entry-row">
          <div class="r-entry-left-bold">${parseMarkdown(item.company)}</div>
          <div class="r-entry-right-bold">${parseMarkdown(item.duration)}</div>
        </div>
        <div class="r-entry-row">
          <div class="r-entry-left-italic">${parseMarkdown(item.role)}</div>
          <div class="r-entry-right-italic">${parseMarkdown(item.location)}</div>
        </div>
        ${bulletsHtml}
      `;
      expContainer.appendChild(entry);
    });
  } else {
    document.getElementById('rs-experience').style.display = 'none';
  }
  
  // 5. Projects (Renders Description, Tech, and Features in bullet blocks)
  const projContainer = document.getElementById('r-projects');
  projContainer.innerHTML = '';
  if (resumeData.projects && resumeData.projects.length > 0) {
    document.getElementById('rs-projects').style.display = 'block';
    resumeData.projects.forEach(item => {
      const entry = document.createElement('div');
      entry.className = 'r-entry';
      
      let bulletsHtml = '';
      bulletsHtml += '<ul class="r-bullets">';
      
      if (item.description) {
        bulletsHtml += `<li>${parseMarkdown(item.description)}</li>`;
      }
      if (item.techUsed) {
        bulletsHtml += `<li><strong>Technologies:</strong> ${parseMarkdown(item.techUsed)}</li>`;
      }
      if (item.bullets && item.bullets.length > 0) {
        let featurePoints = [];
        item.bullets.forEach(b => {
          if (b.trim()) featurePoints.push(parseMarkdown(b));
        });
        if (featurePoints.length > 0) {
          bulletsHtml += `<li><strong>Key Features:</strong> ${featurePoints.join('; ')}</li>`;
        }
      }
      
      bulletsHtml += '</ul>';
      
      entry.innerHTML = `
        <div class="r-entry-row">
          <div class="r-project-title">${parseMarkdown(item.title)}</div>
        </div>
        ${bulletsHtml}
      `;
      projContainer.appendChild(entry);
    });
  } else {
    document.getElementById('rs-projects').style.display = 'none';
  }
  
  // 6. Technical Skills
  const skillsContainer = document.getElementById('r-skills');
  skillsContainer.innerHTML = '';
  if (resumeData.skills && resumeData.skills.length > 0) {
    document.getElementById('rs-skills').style.display = 'block';
    resumeData.skills.forEach(item => {
      if (item.category.trim() !== '' || item.list.trim() !== '') {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="r-skills-cat">${parseMarkdown(item.category)}:</td>
          <td class="r-skills-list">${parseMarkdown(item.list)}</td>
        `;
        skillsContainer.appendChild(row);
      }
    });
  } else {
    document.getElementById('rs-skills').style.display = 'none';
  }
  
  // 7. Certifications
  const certsContainer = document.getElementById('r-certifications');
  certsContainer.innerHTML = '';
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    document.getElementById('rs-certifications').style.display = 'block';
    resumeData.certifications.forEach(item => {
      if (item.name.trim() !== '') {
        const li = document.createElement('li');
        li.innerHTML = parseMarkdown(item.name);
        certsContainer.appendChild(li);
      }
    });
  } else {
    document.getElementById('rs-certifications').style.display = 'none';
  }
}

// ==========================================================================
// Form Validation & Generation Controls
// ==========================================================================

function validateForm() {
  const form = document.getElementById('resume-form');
  const isValid = form.checkValidity();
  
  // Remove existing validation highlights
  document.querySelectorAll('.input-error').forEach(input => {
    input.classList.remove('input-error');
  });
  
  if (!isValid) {
    const invalidInputs = form.querySelectorAll(':invalid');
    invalidInputs.forEach(input => {
      input.classList.add('input-error');
    });
    
    // Trigger standard browser tooltip warning
    form.reportValidity();
    
    // Focus first invalid input, and automatically expand its parent accordion section
    if (invalidInputs.length > 0) {
      invalidInputs[0].focus();
      const accordion = invalidInputs[0].closest('.accordion-item');
      if (accordion && !accordion.classList.contains('active')) {
        accordion.classList.add('active');
      }
    }
  }
  
  return isValid;
}

// Trigger validation, harvest values, save data, render preview, and transition view
document.getElementById('btn-generate').addEventListener('click', () => {
  if (validateForm()) {
    harvestFormState();
    saveState();
    updatePreview();
    
    // Switch UI to Preview Page
    document.body.classList.add('show-preview');
    
    // Reset scroll of resume canvas container to top
    document.querySelector('.resume-scroll-container').scrollTop = 0;
    window.scrollTo({ top: 0 });
    
    // Visual indicator of successful generation
    const genButton = document.getElementById('btn-generate');
    const originalText = genButton.innerHTML;
    genButton.innerHTML = `<i class="fa-solid fa-circle-check"></i> Generated!`;
    genButton.style.backgroundColor = 'var(--success)';
    genButton.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
    
    setTimeout(() => {
      genButton.innerHTML = originalText;
      genButton.style.backgroundColor = '';
      genButton.style.boxShadow = '';
    }, 2000);
  }
});

// ==========================================================================
// Toolbar Controls (Load Sample, Clear, Export/Import, Print PDF, Theme Toggle)
// ==========================================================================

// Back to Edit Button Listener
document.getElementById('btn-back').addEventListener('click', () => {
  document.body.classList.remove('show-preview');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Clear Form Button
document.getElementById('btn-clear').addEventListener('click', () => {
  if (confirm("Reset the entire form? This action is permanent and cannot be undone.")) {
    resumeData = {
      personal: { name: '', location: '', phone: '', email: '', linkedinText: 'LinkedIn', linkedinUrl: '', githubText: 'GitHub', githubUrl: '' },
      summary: '',
      education: {
        graduation: { collegeName: '', degree: '', cgpa: '', duration: '' },
        intermediate: { collegeName: '', percentage: '', year: '' },
        school: { schoolName: '', percentage: '', year: '' }
      },
      experience: [],
      projects: [],
      skills: [],
      certifications: []
    };
    saveState();
    populateFormFromState();
    updatePreview();
  }
});

// Print PDF via native browser print
document.getElementById('btn-print').addEventListener('click', () => {
  // Validate first before export to keep outputs robust
  if (validateForm()) {
    harvestFormState();
    saveState();
    updatePreview();
    
    // Dynamically change page title to suggest correct filename when saving as PDF
    const p = resumeData.personal || {};
    const nameStr = p.name ? p.name.toLowerCase().replace(/\s+/g, '_') : 'resume';
    const oldTitle = document.title;
    document.title = `${nameStr}_resume`;
    
    window.print();
    
    // Restore original document title
    document.title = oldTitle;
  }
});

// Theme toggle action
document.getElementById('btn-theme-toggle').addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('app-theme', nextTheme);
});


// ==========================================================================
// Resume Parser & Heuristic Text Extraction Engine
// ==========================================================================

// Initialize PDF.js Worker
if (window.pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
}

const parserModal = document.getElementById('parser-modal');
const btnOpenParser = document.getElementById('btn-parse-resume');
const btnCloseParser = document.getElementById('btn-close-modal');

// Open Modal
btnOpenParser.addEventListener('click', () => {
  parserModal.classList.add('active');
  // Clear file uploads and paste texts
  document.getElementById('parser-file-input').value = '';
  document.getElementById('parser-file-info').textContent = 'No file selected';
  document.getElementById('btn-parse-file').disabled = true;
  document.getElementById('parser-text-input').value = '';
});

// Close Modal
btnCloseParser.addEventListener('click', () => {
  parserModal.classList.remove('active');
});

// Close Modal on Overlay Click
parserModal.addEventListener('click', (e) => {
  if (e.target === parserModal) {
    parserModal.classList.remove('active');
  }
});

// Modal Tabs Switch
const tabFile = document.getElementById('tab-file');
const tabText = document.getElementById('tab-text');
const contentFile = document.getElementById('content-file');
const contentText = document.getElementById('content-text');

tabFile.addEventListener('click', () => {
  tabFile.classList.add('active');
  tabText.classList.remove('active');
  contentFile.classList.add('active');
  contentText.classList.remove('active');
});

tabText.addEventListener('click', () => {
  tabText.classList.add('active');
  tabFile.classList.remove('active');
  contentText.classList.add('active');
  contentFile.classList.remove('active');
});

// File Upload zone trigger click
const fileZone = document.getElementById('file-upload-zone');
const fileInput = document.getElementById('parser-file-input');
const fileInfo = document.getElementById('parser-file-info');
const btnParseFile = document.getElementById('btn-parse-file');

fileZone.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    fileInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    btnParseFile.disabled = false;
  } else {
    fileInfo.textContent = 'No file selected';
    btnParseFile.disabled = true;
  }
});

// Drag and drop styles on zone
fileZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileZone.classList.add('dragover');
});

fileZone.addEventListener('dragleave', () => {
  fileZone.classList.remove('dragover');
});

fileZone.addEventListener('drop', (e) => {
  e.preventDefault();
  fileZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) {
    fileInput.files = e.dataTransfer.files;
    fileInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    btnParseFile.disabled = false;
  }
});

// Parse Paste Text
document.getElementById('btn-parse-text').addEventListener('click', () => {
  const text = document.getElementById('parser-text-input').value;
  if (text.trim().length < 10) {
    alert("Please paste a valid length of resume text.");
    return;
  }
  
  parseResumeText(text);
  parserModal.classList.remove('active');
});

// Parse File Upload
btnParseFile.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (!file) return;
  
  const originalText = btnParseFile.innerHTML;
  btnParseFile.disabled = true;
  btnParseFile.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Parsing...`;
  
  const ext = file.name.split('.').pop().toLowerCase();
  
  if (ext === 'json') {
    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const importedData = JSON.parse(evt.target.result);
        if (importedData && (importedData.personal || importedData.education)) {
          resumeData = importedData;
          saveState();
          populateFormFromState();
          updatePreview();
          alert("Resume fields loaded!");
          parserModal.classList.remove('active');
        } else {
          alert("Invalid backup file structure.");
        }
      } catch (err) {
        alert("JSON parsing error: " + err.message);
      } finally {
        btnParseFile.disabled = false;
        btnParseFile.innerHTML = originalText;
      }
    };
    reader.readAsText(file);
  } else if (ext === 'txt') {
    const reader = new FileReader();
    reader.onload = function(evt) {
      parseResumeText(evt.target.result);
      btnParseFile.disabled = false;
      btnParseFile.innerHTML = originalText;
      parserModal.classList.remove('active');
    };
    reader.readAsText(file);
  } else if (ext === 'pdf') {
    const reader = new FileReader();
    reader.onload = async function() {
      try {
        if (!window.pdfjsLib) {
          throw new Error("PDF.js library failed to load. Please paste text instead.");
        }
        
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let fullText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          
          // Heuristic text joining (concatenates text fragments from top-to-bottom layout)
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + '\n';
        }
        
        parseResumeText(fullText);
        parserModal.classList.remove('active');
      } catch (err) {
        alert("PDF Extraction Error: " + err.message + "\nFallback: Try copy-pasting your resume text inside the 'Paste Text' tab.");
      } finally {
        btnParseFile.disabled = false;
        btnParseFile.innerHTML = originalText;
      }
    };
    reader.readAsArrayBuffer(file);
  } else {
    alert("Unsupported file format. Please upload PDF, TXT or JSON.");
    btnParseFile.disabled = false;
    btnParseFile.innerHTML = originalText;
  }
});

// Heuristic Text Parser
function parseResumeText(text) {
  if (!text) return;
  
  // Normalize spacing and split line segments
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  const fullText = lines.join('\n');
  
  // Create blank structure
  const parsed = {
    personal: { name: '', location: '', phone: '', email: '', linkedinText: 'LinkedIn', linkedinUrl: '', githubText: 'GitHub', githubUrl: '' },
    summary: '',
    education: {
      graduation: { collegeName: '', degree: '', cgpa: '', duration: '', location: '' },
      intermediate: { collegeName: '', board: '', percentage: '', year: '', location: '' },
      school: { schoolName: '', board: '', percentage: '', year: '', location: '' }
    },
    experience: [],
    projects: [],
    skills: [],
    certifications: []
  };

  // 1. Email extraction
  const emailMatch = fullText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
  if (emailMatch) parsed.personal.email = emailMatch[0];

  // 2. Phone extraction
  const phoneMatch = fullText.match(/(?:\+?\d{1,3}[- ]?)?\(?\d{3,4}\)?[- ]?\d{3,4}[- ]?\d{4}/);
  if (phoneMatch) parsed.personal.phone = phoneMatch[0];

  // 3. LinkedIn URL extraction
  const liMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_\-\/]+)/i);
  if (liMatch) {
    parsed.personal.linkedinUrl = liMatch[0];
    parsed.personal.linkedinText = 'LinkedIn';
  }

  // 4. GitHub URL extraction
  const ghMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_\-\/]+)/i);
  if (ghMatch) {
    parsed.personal.githubUrl = ghMatch[0];
    parsed.personal.githubText = 'GitHub';
  }

  // 5. Name extraction (checks first 4 lines)
  for (let i = 0; i < Math.min(4, lines.length); i++) {
    const line = lines[i];
    if (!line.includes('@') && !line.includes('http') && !line.includes('/') && !line.match(/\d/) && line.split(/\s+/).length <= 4 && line.split(/\s+/).length >= 2) {
      parsed.personal.name = line;
      break;
    }
  }

  // 6. Location extraction
  const locMatch = fullText.match(/\b([A-Za-z\s]+),\s*([A-Za-z\s]{2,})\b/);
  if (locMatch && !locMatch[0].toLowerCase().includes('email') && !locMatch[0].toLowerCase().includes('phone') && !locMatch[0].toLowerCase().includes('github')) {
    parsed.personal.location = locMatch[0];
  }

  // 7. Section Splitting
  const headings = ['SUMMARY', 'EDUCATION', 'EXPERIENCE', 'PROJECTS', 'TECHNICAL SKILLS', 'SKILLS', 'CERTIFICATIONS'];
  const headingIndices = [];
  
  headings.forEach(heading => {
    const regex = new RegExp(`\\b${heading}\\b`, 'i');
    const match = fullText.match(regex);
    if (match) {
      headingIndices.push({ name: heading, index: match.index });
    }
  });
  
  headingIndices.sort((a, b) => a.index - b.index);

  // Extract content segments
  for (let i = 0; i < headingIndices.length; i++) {
    const current = headingIndices[i];
    const next = headingIndices[i + 1];
    const start = current.index + current.name.length;
    const end = next ? next.index : fullText.length;
    let blockText = fullText.substring(start, end).trim();
    
    // Strip leading dashes, stars or equals lines
    blockText = blockText.replace(/^[\s\-–—\=_#\*]+/g, '').trim();
    const blockLines = blockText.split(/\n+/).map(l => l.trim()).filter(l => l.length > 0);

    if (current.name === 'SUMMARY') {
      parsed.summary = blockText.replace(/\n+/g, ' ');
    } else if (current.name === 'TECHNICAL SKILLS' || current.name === 'SKILLS') {
      blockLines.forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          parsed.skills.push({
            category: parts[0].trim(),
            list: parts.slice(1).join(':').trim()
          });
        }
      });
    } else if (current.name === 'CERTIFICATIONS') {
      blockLines.forEach(line => {
        const cleaned = line.replace(/^[•\-\*\s]+/, '').trim();
        if (cleaned.length > 3) {
          parsed.certifications.push({ name: cleaned });
        }
      });
    } else if (current.name === 'EDUCATION') {
      // College Graduation search
      const gradLineIdx = blockLines.findIndex(l => l.toLowerCase().match(/(college|university|b\.e|b\.tech|bachelor|degree|grad|engineering)/));
      if (gradLineIdx !== -1) {
        parsed.education.graduation.collegeName = blockLines[gradLineIdx];
        if (blockLines[gradLineIdx + 1]) {
          parsed.education.graduation.degree = blockLines[gradLineIdx + 1].replace(/\s*[-–]\s*(?:CGPA|Grade|Marks)?:?\s*[\d\.]+.*$/i, '').trim();
          const cgpaMatch = blockLines[gradLineIdx + 1].match(/(?:CGPA|Grade|Marks)?:?\s*([\d\.]+)/i);
          if (cgpaMatch) parsed.education.graduation.cgpa = cgpaMatch[1];
          const locMatch = blockLines[gradLineIdx + 1].match(/\b([A-Za-z\s]+),\s*([A-Za-z\s]{2,})\b/);
          if (locMatch) parsed.education.graduation.location = locMatch[0];
        }
        const durMatch = blockText.match(/\b(20\d{2})\s*[-–]\s*(20\d{2})\b/);
        if (durMatch) parsed.education.graduation.duration = `${durMatch[1]} - ${durMatch[2]}`;
        if (!parsed.education.graduation.location) parsed.education.graduation.location = "Bagalkot, Karnataka";
      }
      
      // Intermediate XII search
      const interLineIdx = blockLines.findIndex(l => l.toLowerCase().match(/(intermediate|class xii|xii|12th|p\.c\. jabin|junior college)/));
      if (interLineIdx !== -1) {
        parsed.education.intermediate.collegeName = blockLines[interLineIdx];
        if (blockLines[interLineIdx + 1]) {
          parsed.education.intermediate.board = blockLines[interLineIdx + 1].replace(/\s*[-–]\s*\d+(?:\.\d+)?%.*$/i, '').trim();
          const percMatch = blockLines[interLineIdx + 1].match(/(\d+(?:\.\d+)?%)/);
          if (percMatch) parsed.education.intermediate.percentage = percMatch[1];
          const locMatch = blockLines[interLineIdx + 1].match(/\b([A-Za-z\s]+),\s*([A-Za-z\s]{2,})\b/);
          if (locMatch) parsed.education.intermediate.location = locMatch[0];
        }
        const yrMatch = blockLines[interLineIdx].match(/\b(20\d{2})\s*[-–]\s*(20\d{2})\b/) || blockText.match(/\b(20\d{2})\s*[-–]\s*(20\d{2})\b/);
        if (yrMatch) {
          parsed.education.intermediate.year = Array.isArray(yrMatch) ? yrMatch[1] || yrMatch[0] : yrMatch;
        } else {
          const singleYr = blockLines[interLineIdx].match(/\b(20\d{2})\b/);
          if (singleYr) parsed.education.intermediate.year = singleYr[1];
        }
        if (!parsed.education.intermediate.location) parsed.education.intermediate.location = "Hubballi, Karnataka";
      }

      // School X search
      const schoolLineIdx = blockLines.findIndex(l => l.toLowerCase().match(/(school|class x|x|10th|high school|matriculation)/));
      if (schoolLineIdx !== -1) {
        parsed.education.school.schoolName = blockLines[schoolLineIdx];
        if (blockLines[schoolLineIdx + 1]) {
          parsed.education.school.board = blockLines[schoolLineIdx + 1].replace(/\s*[-–]\s*\d+(?:\.\d+)?%.*$/i, '').trim();
          const percMatch = blockLines[schoolLineIdx + 1].match(/(\d+(?:\.\d+)?%)/);
          if (percMatch) parsed.education.school.percentage = percMatch[1];
          const locMatch = blockLines[schoolLineIdx + 1].match(/\b([A-Za-z\s]+),\s*([A-Za-z\s]{2,})\b/);
          if (locMatch) parsed.education.school.location = locMatch[0];
        }
        const yrMatch = blockLines[schoolLineIdx].match(/\b(20\d{2})\b/) || (blockLines[schoolLineIdx + 1] && blockLines[schoolLineIdx + 1].match(/\b(20\d{2})\b/));
        if (yrMatch) parsed.education.school.year = yrMatch[1];
        if (!parsed.education.school.location) parsed.education.school.location = "Hubballi, Karnataka";
      }
    } else if (current.name === 'EXPERIENCE') {
      let expItem = { company: '', role: '', duration: '', location: '', bullets: [] };
      blockLines.forEach(line => {
        if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
          expItem.bullets.push(line.replace(/^[•\-\*\s]+/, '').trim());
        } else {
          if (expItem.bullets.length > 0) {
            parsed.experience.push(expItem);
            expItem = { company: '', role: '', duration: '', location: '', bullets: [] };
          }
          if (!expItem.company) {
            // Check for duration patterns inside company line
            const durMatch = line.match(/\b([A-Za-z]{3}\s*\d{4}|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/);
            if (durMatch) {
              expItem.duration = line;
            } else {
              expItem.company = line;
            }
          } else if (!expItem.role) {
            expItem.role = line;
          }
        }
      });
      if (expItem.company) {
        parsed.experience.push(expItem);
      }
    } else if (current.name === 'PROJECTS') {
      let projItem = { title: '', description: '', techUsed: '', bullets: [] };
      blockLines.forEach(line => {
        if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
          projItem.bullets.push(line.replace(/^[•\-\*\s]+/, '').trim());
        } else {
          if (projItem.bullets.length > 0 || projItem.description) {
            parsed.projects.push(projItem);
            projItem = { title: '', description: '', techUsed: '', bullets: [] };
          }
          if (!projItem.title) {
            projItem.title = line;
          } else if (!projItem.description) {
            projItem.description = line;
          }
        }
      });
      if (projItem.title) {
        parsed.projects.push(projItem);
      }
    }
  }

  // Fallbacks for name and details
  if (!parsed.personal.name) parsed.personal.name = resumeData.personal.name || "YOUR NAME";
  if (!parsed.personal.location) parsed.personal.location = resumeData.personal.location || "City, State";
  
  // Save, pre-populate and update preview
  resumeData = parsed;
  saveState();
  populateFormFromState();
  updatePreview();
  
  alert("Resume PDF/text successfully parsed! Verify fields, then click 'Generate Resume' to see your new preview.");
}


// Load App on startup
window.onload = init;
