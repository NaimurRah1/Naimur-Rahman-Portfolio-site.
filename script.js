document.addEventListener('DOMContentLoaded', () => {

fetch('profile.json')
.then(res => res.json())
.then(data => {

    // ------------------- Skills -------------------
    const skillsContainer = document.getElementById('skills-container');

    data.skills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill';

        div.innerHTML = `
            <h4>${skill.name}</h4>
            <div class="progress-bar" 
                 style="width:${skill.level}%; background:#FFD700; padding:5px 0; border-radius:5px; color:black;">
                 ${skill.level}%
            </div>
        `;

        skillsContainer.appendChild(div);
    });


    // ------------------- Education -------------------
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
//---------------- certification----------------//
    // Courses
const courseContainer = document.getElementById("course-container");

if (data.courses) {
  data.courses.forEach(course => {

    const div = document.createElement("div");
    div.className = "course-card";

    let preview = "";
    let link = "";

    if (course.image) {
      preview = `<img src="${course.image}" class="certificate-img">`;
      link = course.image;
    }

    if (course.certificate) {
      preview = `<img src="images/pdf.png" class="certificate-img">`;
      link = course.certificate;
    }

    div.innerHTML = `
        ${preview}
        <h4>${course.title}</h4>
        <p>${course.institution}</p>
        <a href="${link}" target="_blank">View Certificate</a>
    `;

    courseContainer.appendChild(div);
  });
}

    // ------------------- Projects -------------------
    let allProjects = data.projects;

    displayProjects(allProjects);

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


    // ------------------- Filter Buttons -------------------
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

});



/* ---------------- Counter Animation ---------------- */

const counters = document.querySelectorAll('.count');
const speed = 2000;

const animateCounters = () => {

    counters.forEach(counter => {

        const target = +counter.getAttribute('data-target');
        let count = 0;

        const step = target / (speed / 20);

        const updateCount = () => {

            count += step;

            if(count < target){
                counter.textContent = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } 
            else{
                counter.textContent = target;
            }

        };

        updateCount();

    });

};


const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            animateCounters();
            observer.unobserve(entry.target);

        }

    });

},{threshold:0.5});


observer.observe(document.querySelector('#projects-counter'));

});


