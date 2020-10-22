import Home from "./views/HomeView.js";
import Login from "./views/LoginView.js";
import Register from "./views/RegisterView.js";
import Dashboard from "./views/DashboardView.js";
import addListeners from "./eventListenersModule";
import Students from "./views/StudentsView.js";
import Courses from "./views/CoursesView.js";
import { elements } from "./base.js";

export const navigateTo = (url) => {
  console.log(url, "called");
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/login", view: Login },
    { path: "/register", view: Register },
    { path: "/dashboard", view: Dashboard },
    { path: "/students", view: Students },
    { path: "/courses", view: Courses },
  ];

  // Test each route for potential match.
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  console.log("potential matches", potentialMatches);

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  // If no route matches, then go to /
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(match);

  // "mounting" the selected view on DOM
  elements.app.innerHTML = await view.getHtml();
};

// making sure that when the user navigates through the browser,
// the  router function is triggered
window.addEventListener("popstate", router);

// using event delegation so that the new injected anchor tags also works
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
  addListeners();
});
