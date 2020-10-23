export const elements = {
  app: document.getElementById("app"),
  notificaton: document.querySelector(".notification"),
  modal: document.querySelector(".modal"),
  modalOptionWrapper: document.getElementById("option-wrapper"),
  closeModalButton: document.getElementById("close-modal-button"),

  quizModal: document.getElementById("quiz-modal"),
  closeQuizButton: document.getElementById("close-quiz-button"),
  quizQuestion: document.getElementById("quiz-question"),
  quizOptionsWrapper: document.getElementById("quiz-options"),
  submitQuizQuestion: document.getElementById("submit-quiz-question"),
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
