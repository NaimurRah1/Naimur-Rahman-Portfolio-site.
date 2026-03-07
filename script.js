document.addEventListener('DOMContentLoaded', () => {
    fetch('profile.json')
    .then(res => res.json())
    .then(data => {
        // Education
        const eduList = document.getElementById('education-list');
        data.education.forEach(edu => {
            let li = document.createElement('li');
            li.innerHTML = `<strong>${edu.degree}</strong> - ${edu.institution} (${edu.year}) | CGPA: ${edu.cgpa}`;
            eduList.appendChild(li);
        });

        // Skills
        const skillsContainer = document.getElementById('skills-container');
        data.skills.forEach(skill=>{
            let div = document.createElement('div');
            div.className='skill';
            div.innerHTML=`<h4>${skill.name}</h4>
            <div class="progress-bar" style="width:${skill.level}%; background-color:#FFD700; padding:5px 0; border-radius:5px; color:black;">${skill.level}%</div>`;
            skillsContainer.appendChild(div);
        });

        // Projects
        const projectsContainer = document.getElementById('projects-container');
        data.projects.forEach(proj => {
            let div = document.createElement('div');
            div.className='blog-entry';
            div.innerHTML=`
            <a href="${proj.link}" class="block-20" style="background-image:url('${proj.image}');"></a>
            <div class="text"><h3>${proj.title}</h3><p>${proj.desc}</p></div>`;
            projectsContainer.appendChild(div);
        });
    })
    .catch(err => console.error(err));
});
