export const elements = {
  app: document.getElementById("app"),
  notificaton: document.querySelector(".notification"),
};

const ApiUrl = {
  login: "http://localhost:5000/login/",
  students: "http://localhost:5000/students/",
  teachers: "http://localhost:5000/teachers/",
  courses: "http://localhost:5000/courses/",
};

export function getApiUrl(route) {
  return ApiUrl[route];
}

function createAppObject() {
  return window.localStorage;
}

export const appObject = createAppObject();
