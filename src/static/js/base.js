export const elements = {
  app: document.getElementById("app"),
};

function createAppObject() {
  return {
    username: "",
    password: "",
    role: "",
  };
}

export const appObject = createAppObject();
