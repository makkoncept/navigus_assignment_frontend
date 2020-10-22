export const elements = {
  app: document.getElementById("app"),
  notificaton: document.querySelector(".notification"),
};

function createAppObject() {
  return window.localStorage;
}

export const appObject = createAppObject();
