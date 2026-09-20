const projects = [
  {
    title: "Apartment Homelab Network",
    category: "networking",
    status: "in-progress",
    detail: "Omada SDN with EAP235-Wall APs, VLAN/subnet plan, device isolation for IoT and Android TV boxes, Pi-hole as primary DNS.",
    tags: ["Omada", "VLANs", "Pi-hole"]
  },
  {
    title: "Proxmox + Plex Stack",
    category: "homelab",
    status: "in-progress",
    detail: "Proxmox on existing hardware, Plex media server, DAS storage planning, and service dashboards.",
    tags: ["Proxmox", "Plex", "Storage"]
  },
  {
    title: "Self-hosted Services",
    category: "homelab",
    status: "in-progress",
    detail: "Homarr dashboard, Obsidian server, Cloudflare Tunnel access, and targeted VPN with GlueTun.",
    tags: ["Homarr", "Cloudflare", "VPN"]
  },
  {
    title: "WGU Lab Rebuilds",
    category: "education",
    status: "complete",
    detail: "Documented lab rebuilds for DNS hijack fixes, OSPF, and managed switch configs used in coursework.",
    tags: ["Labs", "Cisco", "Docs"]
  },
  {
    title: "Personal Site",
    category: "web",
    status: "in-progress",
    detail: "This site — a simple static portfolio for education and project write-ups.",
    tags: ["HTML", "CSS", "JS"]
  }
];

function uniqueCategories(list) {
  return ["all", ...new Set(list.map((p) => p.category))];
}

function projectCard(item) {
  const tags = item.tags.map((t) => `<span class="tag">${t}</span>`).join("");
  const statusLabel = item.status === "complete" ? "Complete" : "In progress";
  return `
    <article class="card" data-category="${item.category}">
      <div class="meta">
        <span class="status ${item.status}">${statusLabel}</span>
        <span class="tag">${item.category}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.detail}</p>
      <div class="meta">${tags}</div>
    </article>
  `;
}

function renderProjects(filter = "all") {
  const root = document.getElementById("projects-list");
  if (!root) return;
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  root.innerHTML = visible.map(projectCard).join("");
}

function renderFilters() {
  const bar = document.getElementById("project-filters");
  if (!bar) return;
  const cats = uniqueCategories(projects);
  bar.innerHTML = cats
    .map((cat, i) => `<button class="filter-btn${i === 0 ? " active" : ""}" data-filter="${cat}">${cat}</button>`)
    .join("");

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    bar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderProjects();
});
