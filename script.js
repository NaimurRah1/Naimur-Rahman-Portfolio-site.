document.addEventListener('DOMContentLoaded', () => {
    fetch('profile.json')
    .then(res => res.json())
    .then(data => {
        // ------------------- Skills FIRST -------------------
        const skillsContainer = document.getElementById('skills-container');
        data.skills.forEach(skill=>{
            let div = document.createElement('div');
            div.className='skill';
            div.innerHTML=`<h4>${skill.name}</h4>
            <div class="progress-bar" style="width:${skill.level}%; background-color:#FFD700; padding:5px 0; border-radius:5px; color:black;">${skill.level}%</div>`;
            skillsContainer.appendChild(div);
        });

        // ------------------- Education Cards -------------------
const eduContainer = document.getElementById('education-container');

data.education.forEach(edu => {
    const div = document.createElement('div');
    div.className = 'education-wrap';
    div.innerHTML = `
        <h3>${edu.degree}</h3>
        <p>${edu.institution}</p>
        <p>${edu.year}</p>
        <span>Result: ${edu.CGPA || edu.GPA || '-'}</span>
    `;
    eduContainer.appendChild(div);
});

        // ------------------- Projects -------------------
   let allProjects = [];

fetch("profile.json")
.then(res => res.json())
.then(data => {

    allProjects = data.projects;

    displayProjects(allProjects);
});

function displayProjects(projects){

    const container = document.getElementById("projects-container");

    container.innerHTML = "";

    projects.forEach(project => {

        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <a href="${project.link}" target="_blank">View Project</a>
            </div>
        `;

        container.appendChild(card);
    });

}


const filterButtons = document.querySelectorAll("#projectFilters button");

filterButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelector("#projectFilters .active")?.classList.remove("active");

        btn.classList.add("active");

        const category = btn.dataset.cat;

        if(category === "All"){
            displayProjects(allProjects);
        }
        else{
            const filtered = allProjects.filter(p => p.category === category);
            displayProjects(filtered);
        }

    });

});

// --- Counter animation code remains the SAME ---
const counters = document.querySelectorAll('.count');

const speed = 2000; // duration in ms (2 seconds)

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const step = target / (speed / 20); // update every 20ms

        const updateCount = () => {
            count += step;
            if(count < target){
                counter.textContent = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        }
        updateCount();
    });
}

// Trigger when section comes into view
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            animateCounters();
            observer.unobserve(entry.target); // run once
        }
    });
},{threshold: 0.5});

observer.observe(document.querySelector('#projects-counter'));



