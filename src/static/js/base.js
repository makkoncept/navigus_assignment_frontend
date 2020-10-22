export const elements = {
  app: document.getElementById("app"),
};

function createAppObject() {
  return window.localStorage;
}

export const appObject = createAppObject();
