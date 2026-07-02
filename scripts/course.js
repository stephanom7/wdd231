const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
  { code: "WDD231", name: "Web Frontend Development I", credits: 3, completed: false },
  { code: "CSE111", name: "Programming with Functions", credits: 3, completed: true },
  { code: "CSE210", name: "Programming with Classes", credits: 3, completed: true },
  { code: "CSE121B", name: "JavaScript Language", credits: 3, completed: false }
];

function displayCourses(list) {
  const container = document.getElementById("courseCards");
  container.innerHTML = "";
  list.forEach(course => {
    const card = document.createElement("div");
    card.className = course.completed ? "completed" : "incomplete";
    card.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>${course.credits} credits</p>`;
    container.appendChild(card);
  });

  const total = list.reduce((sum, c) => sum + c.credits, 0);
  document.getElementById("creditsTotal").textContent = `Total Credits: ${total}`;
}

document.getElementById("allBtn").addEventListener("click", () => displayCourses(courses));
document.getElementById("wddBtn").addEventListener("click", () => displayCourses(courses.filter(c => c.code.startsWith("WDD"))));
document.getElementById("cseBtn").addEventListener("click", () => displayCourses(courses.filter(c => c.code.startsWith("CSE"))));

displayCourses(courses);
