const educationItems = [
  {
    title: "B.S. Network Engineering and Security",
    org: "Western Governors University",
    status: "in-progress",
    dates: "Current term through Jan 2027",
    verifyUrl:"",
    verifyId:"",
    detail: "General track teaches you how to design, configure, secure, and troubleshoot modern wired, wireless, and hybrid network infrastructures",
    tags: ["WGU", "Degree"]
  },
  {
    title: "Advanced JavaScript",
    org: "CodeFellows",
    status: "complete",
    dates: "October 2018 - October 2019",
    verifyUrl:"",
    verifyId:"",
    detail: "Teaches students to build professional-grade, scalable client-side and server-side applications using modern JavaScript architectures and industry best practices.",
    tags: ["Codefellows", "Advanced Javascript"]
  },
  {
    title: "Cisco CCNA",
    org: "Cisco",
    status: "complete",
    dates: "Expires April 2027",
    verifyUrl: "https://cp.certmetrics.com/cisco/en/public/verify/credential/231E9SW2W6K0VZGV",
    verifyId: "Verification Code: 231E9SW2W6K0VZGV",
    detail: "Associate-level networking. Planning ENCOR 350-401 before expiry to recertify toward CCNP Enterprise.",
    tags: ["Cisco", "Cert"]
  },
  {
    title: "ITIL 4 Foundation",
    org: "AXELOS",
    status: "complete",
    dates: "expires August 2029",
    verifyUrl: "https://www.peoplecert.org/for-corporations/certificate-verification-service",
    verifyId: "Certificate Number: GR671904293JD",
    detail: "Service management principles, practices, and the service value system.",
    tags: ["ITIL", "Ops"]
  },
  {
    title: "CompTIA Sec+",
    org: "CompTIA",
    status: "complete",
    dates: "Expires 17 August 2029",
    verifyUrl: "https://cp.certmetrics.com/comptia/en/public/verify/credential/GWMSQP8QH2R1QD51",
    verifyId: "Verification Code: GWMSQP8QH2R1QD51",
    detail: "Validates baseline cybersecurity skills required to solve core security incidents and protect networks, systems, and data.",
    tags: ["CompTIA", "Cert"]
  },
  {
    title: "CompTIA A+",
    org: "CompTIA",
    status: "complete",
    dates: "Expires 17 August 2029",
    verifyUrl: "https://cp.certmetrics.com/comptia/en/public/verify/credential/63ab295b5806408185aff0d0a54529c5",
    verifyId: "Verification Code: 63ab295b5806408185aff0d0a54529c5",
    detail: "Workstation setup, hardware, and support fundamentals used in homelab builds.",
    tags: ["CompTIA", "Cert"]
  },
  {
    title: "Linux Essentials",
    org: "Linux Professional Institute",
    status: "complete",
    dates: "Indef",
    verifyUrl: "https://cs.lpi.org/caf/Xamman/certification",
    verifyId: "LPIID: LPI000692348 <br> Verification Code: uwhmvzvenq",
    detail: "Describes the foundational knowledge of the Linux Professional Institute (LPI) exam objectives, covering open-source concepts, basic system navigation, file management, and simple scripting",
    tags: ["LPI", "Cert"]
  }
];

function educationCard(item) {
  const tags = item.tags.map((t) => `<span class="tag">${t}</span>`).join("");
  const statusLabel = item.status === "complete" ? "Complete" : "In progress";
  const verifyHtml = item.verifyUrl
    ? `<p><a href="${item.verifyUrl}" target="_blank" rel="noopener noreferrer"><h3>VERIFY</h3></a></p>`
    : "";
  return `
    <article class="card">
      <div class="meta">
        <span class="status ${item.status}">${statusLabel}</span>
        <span>${item.dates}</span>
      </div>
      <h3>${item.title}</h3>
      <p><strong>${item.org}</strong></p>
      <p>${item.detail}</p>
      ${verifyHtml}
      <span>${item.verifyId}</span>
      <div class="meta">${tags}</div>
    </article>
  `;
}

function renderEducation() {
  const root = document.getElementById("education-list");
  if (!root) return;
  root.innerHTML = educationItems.map(educationCard).join("");
}

document.addEventListener("DOMContentLoaded", renderEducation);
