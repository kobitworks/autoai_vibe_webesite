const quests=[
  {id:1,rank:"C",title:"水を1杯飲む",desc:"小さな行動からスタート",exp:20},
  {id:2,rank:"B",title:"10分だけ片付ける",desc:"タイマーを使って1エリアだけ",exp:35},
  {id:3,rank:"A",title:"新しいアイデアを1つメモ",desc:"質より数。1つ残せば達成",exp:45}
];

let cleared=new Set();

function render(){
  const list=document.getElementById("questList");
  list.innerHTML=quests.map(q=>`
    <article class="quest ${cleared.has(q.id)?"done":""}">
      <div class="rank">${q.rank}</div>
      <div>
        <h3>${q.title}</h3>
        <p>${q.desc} / +${q.exp} EXP</p>
      </div>
      <button data-id="${q.id}">${cleared.has(q.id)?"CLEARED":"CLEAR"}</button>
    </article>`
  ).join("");

  const exp=quests.filter(q=>cleared.has(q.id)).reduce((s,q)=>s+q.exp,0);
  const level=Math.floor(exp/100)+1;
  const current=exp%100;
  document.getElementById("clearCount").textContent=cleared.size;
  document.getElementById("level").textContent=level;
  document.getElementById("expText").textContent=`${current} / 100`;
  document.getElementById("expBar").style.width=current+"%";

  list.querySelectorAll("button").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const id=Number(btn.dataset.id);
      const q=quests.find(x=>x.id===id);
      if(cleared.has(id)){
        document.getElementById("logText").textContent=`「${q.title}」は達成済みです。`;
        return;
      }
      cleared.add(id);
      document.getElementById("logText").textContent=`QUEST CLEAR! 「${q.title}」 +${q.exp} EXP`;
      render();
    });
  });
}

document.getElementById("resetBtn").addEventListener("click",()=>{
  cleared=new Set();
  document.getElementById("logText").textContent="クエストをリセットしました。";
  render();
});

render();
