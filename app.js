const script=document.createElement("script");
script.src="projects.js";
script.onload=()=>{
  const projects=window.VIBE_PROJECTS||[];
  const count=document.getElementById("projectCount");
  const grid=document.getElementById("projectGrid");
  count.textContent=String(projects.length).padStart(2,"0");

  if(!projects.length){
    grid.innerHTML='<div class="empty">NO PROJECT DATA</div>';
    return;
  }

  grid.innerHTML=projects.map(p=>`
    <article class="project-card">
      <div class="project-meta"><span>${p.id}</span><span>${p.updated||""}</span></div>
      <span class="status">${p.status||"PoC"}</span>
      <h3>${p.name}</h3>
      <p>${p.description||""}</p>
      <div class="actions">
        ${p.demo?`<a class="primary" href="${p.demo}">ENTER</a>`:""}
        ${p.github?`<a href="${p.github}">SOURCE</a>`:""}
      </div>
    </article>`
  ).join("");
};
document.head.appendChild(script);
