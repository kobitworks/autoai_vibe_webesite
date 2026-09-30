const projectScript = document.createElement("script");
projectScript.src = "projects.js";

const $ = (selector) => document.querySelector(selector);

const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;"
}[char]));

const safeUrl = (value = "") => {
  const url = String(value).trim();
  if (!url) return "";
  if (/^(https?:\/\/|\.\.?\/)/i.test(url)) return url;
  return "";
};

const normalizeStatus = (value = "poc") => {
  const raw = String(value).trim();
  const key = raw.toLowerCase();
  const aliases = {
    playable: "poc",
    active: "poc",
    todo: "planning",
    doing: "poc",
    done: "published"
  };
  return { key: aliases[key] || key || "poc", label: raw || "PoC" };
};

const normalizeProject = (project = {}) => {
  const status = normalizeStatus(project.status);
  const entryPath = project.entryPath || project.demo || "";
  const repoPath = project.repoPath || project.github || "";
  const demo = safeUrl(entryPath) || (entryPath ? `./${String(entryPath).replace(/^\.\//, "")}` : "");
  const github = safeUrl(repoPath) || (repoPath
    ? `https://github.com/kobitworks/autoai_vibe_webesite/tree/main/${String(repoPath).replace(/^\/+/, "")}`
    : "");

  return {
    id: project.id || "UNASSIGNED",
    name: project.name || "Untitled project",
    summary: project.summary || project.description || "",
    status,
    updatedAt: project.updatedAt || project.updated || "",
    demo,
    github,
    tags: Array.isArray(project.tags) ? project.tags : []
  };
};

projectScript.onload = () => {
  const projects = (window.VIBE_PROJECTS || []).map(normalizeProject);
  const grid = $("#projectGrid");
  const count = $("#projectCount");
  const latest = $("#latestUpdate");
  const search = $("#projectSearch");
  const statusFilter = $("#statusFilter");

  count.textContent = String(projects.length).padStart(2, "0");
  latest.textContent = projects
    .map((project) => project.updatedAt)
    .filter(Boolean)
    .sort()
    .at(-1) || "—";

  [...new Map(projects.map((project) => [project.status.key, project.status.label])).entries()]
    .sort((a, b) => a[1].localeCompare(b[1], "ja"))
    .forEach(([key, label]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = label.toUpperCase();
      statusFilter.appendChild(option);
    });

  const render = () => {
    const query = search.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;
    const filtered = projects.filter((project) => {
      const haystack = [
        project.id,
        project.name,
        project.summary,
        project.tags.join(" ")
      ].join(" ").toLowerCase();

      return (!query || haystack.includes(query))
        && (!selectedStatus || project.status.key === selectedStatus);
    });

    if (!filtered.length) {
      grid.innerHTML = '<div class="empty"><strong>NO MATCHING PROJECTS</strong>条件に合う孫プロジェクトがありません。</div>';
      return;
    }

    grid.innerHTML = filtered.map((project) => `
      <article class="project-card">
        <div class="project-meta">
          <span class="project-id">${escapeHtml(project.id)}</span>
          <span>${escapeHtml(project.updatedAt || "UPDATE TBD")}</span>
        </div>
        <span class="status" data-status="${escapeHtml(project.status.key)}">${escapeHtml(project.status.label)}</span>
        <h3>${escapeHtml(project.name)}</h3>
        <p>${escapeHtml(project.summary)}</p>
        ${project.tags.length ? `<div class="tags">${project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
        <div class="actions">
          ${project.demo ? `<a class="primary" href="${escapeHtml(project.demo)}">OPEN PoC</a>` : ""}
          ${project.github ? `<a href="${escapeHtml(project.github)}">GITHUB</a>` : ""}
        </div>
      </article>
    `).join("");
  };

  search.addEventListener("input", render);
  statusFilter.addEventListener("change", render);
  render();
};

projectScript.onerror = () => {
  $("#projectGrid").innerHTML = '<div class="empty"><strong>PROJECT DATA ERROR</strong>projects.js を読み込めませんでした。</div>';
};

document.head.appendChild(projectScript);
