export const elements = {
  app: document.getElementById("app"),
  notificaton: document.querySelector(".notification"),
  modal: document.querySelector(".modal"),
  modalOptionWrapper: document.getElementById("option-wrapper"),
  closeModalButton: document.getElementById("close-modal-button"),
};

const ApiUrl = {
  login: "http://localhost:5000/login/",
  students: "http://localhost:5000/students/",
  teachers: "http://localhost:5000/teachers/",
  courses: "http://localhost:5000/courses/",
  quiz: "http://localhost:5000/quiz/",
};

export function getApiUrl(route) {
  return ApiUrl[route];
}

function createAppObject() {
  return window.localStorage;
}

export const appObject = createAppObject();
