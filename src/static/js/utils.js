import { elements } from "./base";

export function showNotification(message, timeout = 1500) {
  console.log("showNotification called");
  const notificationDiv = elements.notificaton;

  notificationDiv.innerText = message;
  notificationDiv.classList.remove("display-none");

  setTimeout(() => {
    notificationDiv.innerText = "";
    notificationDiv.classList.add("display-none");
  }, timeout);
}
