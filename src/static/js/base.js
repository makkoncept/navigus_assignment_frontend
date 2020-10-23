export const elements = {
  app: document.getElementById("app"),
  notificaton: document.querySelector(".notification"),
  modal: document.querySelector(".modal"),
  modalOptionWrapper: document.getElementById("option-wrapper"),
  closeModalButton: document.getElementById("close-modal-button"),
};

const ApiUrl = {
  login: "https://navquiz.herokuapp.com/login/",
  students: "https://navquiz.herokuapp.com/students/",
  teachers: "https://navquiz.herokuapp.com/teachers/",
  courses: "https://navquiz.herokuapp.com/courses/",
  quiz: "https://navquiz.herokuapp.com/quiz/",
};

export function getApiUrl(route) {
  return ApiUrl[route];
}

function createAppObject() {
  return window.localStorage;
}

export const appObject = createAppObject();
