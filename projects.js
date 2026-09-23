const projects = [
  {
    title: "Apartment Homelab Network",
    category: "networking",
    status: "in-progress",
    detail: "Omada SDN with EAP235-Wall APs, VLAN/subnet plan, device isolation for IoT and Android TV boxes, Pi-hole as primary DNS.",
    href:"./homelab-network.html",
    tags: ["Omada", "VLANs", "Pi-hole"]
  },
  {
    title: "Proxmox + Plex Stack",
    category: "homelab",
    status: "in-progress",
    detail: "Proxmox on existing hardware, Plex media server, DAS storage planning, and service dashboards.",
    href:"proxmox-plex.html",
    tags: ["Proxmox", "Plex", "Storage"]
  },
  {
    title: "Self-hosted Services",
    category: "homelab",
    status: "in-progress",
    detail: "Homarr dashboard, Obsidian server, Local AI server, Cloudflare Tunnel access, and targeted VPN with GlueTun.",
    href: "self-hosted.html",
    tags: ["Homarr", "Cloudflare", "VPN"]
  },
  {
    title: "WGU Lab Rebuilds",
    category: "education",
    status: "complete",
    detail: "Documented lab rebuilds for DNS hijack fixes, OSPF, and managed switch configs used in coursework.",
    href: "wgu-labs.html",
    tags: ["Labs", "Cisco", "Docs"]
  },
  {
    title: "Personal Site",
    category: "web",
    status: "in-progress",
    detail: "This site — a simple static portfolio for education and project write-ups.",
    href: "personal-site.html",
    tags: ["HTML", "CSS", "JS"]
  }
];

function uniqueCategories(list) {
  return ["all", ...new Set(list.map((p) => p.category))];
}

function projectCard(item, latest) {
  const tags = item.tags.map((t) => `<span class="tag">${t}</span>`).join("");
  const statusLabel = item.status === "complete" ? "Complete" : "In progress";
  const href = item.href || item.projectUrl || "#projects";

  const note = latest
    ? `<div class="project-log">
         <div class="log-label">Latest note</div>
         <time>${latest.date}</time>
         <strong>${latest.title}</strong>
         <p>${latest.body}</p>
         <a class="log-link" href="${href}">All notes</a>
       </div>`
    : (href && href !== "#projects"
        ? `<a class="log-link" href="${href}">Write a note</a>`
        : "");

  return `
    <article class="card" data-category="${item.category}">
      <div class="meta">
        <span class="status ${item.status}">${statusLabel}</span>
        <span class="tag">${item.category}</span>
      </div>
      <h3><a class="card-title" href="${href}">${item.title}</a></h3>
      <p>${item.detail}</p>
      <div class="meta">${tags}</div>
      ${note}
    </article>
  `;
}

async function latestNoteFromPage(href) {
  if (!href || href.startsWith("#")) return null;
  try {
    const res = await fetch(href);
    if (!res.ok) return null;
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const el = doc.querySelector("#notes .note, .note");
    if (!el) return null;
    return {
      date: el.dataset.date || el.querySelector("time")?.textContent?.trim() || "",
      title: el.dataset.title || el.querySelector("h3")?.textContent?.trim() || "",
      body: el.querySelector("p")?.textContent?.trim() || ""
    };
  } catch (e) {
    return null;
  }
}

async function renderProjects(filter = "all") {
  const root = document.getElementById("projects-list");
  if (!root) return;
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  root.innerHTML = visible.map((item) => projectCard(item, null)).join("");

  await Promise.all(visible.map(async (item, i) => {
    const href = item.href || item.projectUrl;
    const latest = await latestNoteFromPage(href);
    if (!latest) return;
    const card = root.querySelectorAll(".card")[i];
    if (card) card.outerHTML = projectCard(item, latest);
  }));
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
