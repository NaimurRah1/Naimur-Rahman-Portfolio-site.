/* ================= BACKGROUND FLOATING CODE ================= */
const codeBg = document.getElementById('codeBg');

const codeSnippets = [
`import pandas as pd
df = pd.read_csv("bdhs.csv")
df.describe()`,

`SELECT division, COUNT(*)
FROM children
GROUP BY division;`,

`model <- lm(weight ~ age + sex, data=df)
summary(model)`,

`df.groupby("sex")
  .mean()`,

`ggplot(data)+
 geom_bar()`,

`SELECT *
FROM nutrition
WHERE stunted = 1;`
];

for(let i=0;i<14;i++){
  const block=document.createElement('div');
  block.className='code-block';
  block.style.left=Math.random()*90+'%';
  block.style.animationDuration=(18+Math.random()*12)+'s';
  block.style.animationDelay=Math.random()*8+'s';
  block.textContent=codeSnippets[Math.floor(Math.random()*codeSnippets.length)];
  codeBg.appendChild(block);
}

/* ================= PROFILE FETCH ================= */
fetch('profile.json')
.then(res=>res.json())
.then(d=>{

  document.getElementById('photo').src=d.profilePhoto;
  document.getElementById('bio').textContent=d.bio;

  const nameEl=document.getElementById('name');
  nameEl.innerHTML=d.name.split('')
    .map(l=>`<span class="bound-letter">${l}</span>`).join('');
  nameEl.querySelectorAll('.bound-letter')
    .forEach((s,i)=>s.style.animationDelay=`${i*0.2}s`);

  const socials=document.getElementById('socials');
  d.socials.forEach(s=>{
    socials.innerHTML+=`
      <a href="${s.link}" target="_blank">
        <i class="${s.icon}"></i>
      </a>`;
  });

  d.skills.forEach(s=>{
    document.getElementById('skillsList').innerHTML+=`
      <div class="skill-card">
        <p>${s.name}</p>
        <div class="skill-bar">
          <div class="skill-level" style="width:${s.level}%"></div>
        </div>
      </div>`;
  });

  d.education.forEach(e=>{
    document.getElementById('educationList').innerHTML+=`
      <div class="edu-card">
        <img src="${e.logo}">
        <div>
          <h4>${e.institution}</h4>
          <p>${e.degree} (${e.gpa})</p>
          <small>${e.year}</small>
        </div>
        <div>
          ${e.subjects?`<ul>${e.subjects.map(s=>`<li>${s}</li>`).join('')}</ul>`:''}
        </div>
      </div>`;
  });

  d.courses.forEach(c=>{
    document.getElementById('courseList').innerHTML+=`
      <div class="course-card">
        <h4>${c.title}</h4>
        <p>${c.institution} • ${c.year}</p>
        <p>${c.desc}</p>
      </div>`;
  });

  d.projects.forEach(p=>{
    document.getElementById('projectsGrid').innerHTML+=`
      <div class="project" data-cat="${p.category}" onclick="window.open('${p.link}','_blank')">
        <img src="${p.image}">
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
      </div>`;
  });
});

/* ================= THEME TOGGLE ================= */
const themeBtn=document.getElementById('themeToggle');
themeBtn.onclick=()=>{
  if(document.documentElement.getAttribute('data-theme')==='light'){
    document.documentElement.removeAttribute('data-theme');
    themeBtn.textContent='🌙';
  }else{
    document.documentElement.setAttribute('data-theme','light');
    themeBtn.textContent='🌑';
  }
};

/* ================= SECTION POPUP ================= */
const popup=document.getElementById('sectionPopup');
document.querySelectorAll('nav a').forEach(link=>{
  link.onclick=e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({behavior:'smooth'});
    popup.textContent=link.textContent;
    popup.classList.add('show');
    setTimeout(()=>popup.classList.remove('show'),1200);
  };
});

/* ================= PROJECT FILTER ================= */
document.getElementById('projectFilters').onclick=e=>{
  if(e.target.tagName==='BUTTON'){
    const cat=e.target.dataset.cat;
    document.querySelectorAll('.project').forEach(p=>{
      p.style.display=(cat==='All'||p.dataset.cat===cat)?'block':'none';
    });
  }
};
