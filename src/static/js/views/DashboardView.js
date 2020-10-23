import { appObject } from "../base.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    if (appObject.getItem("role") === "teacher") {
      return `
        <div>
            <h1>Dashboard</h1>
            <a href="/students" data-link>Students</a>
            <a href="/courses" data-link>Courses</a>
            <a id="logout-link">Logout</a>
        </div>
        `;
    }

    return `
        <div>
            <h1>Dashboard</h1>
            <a href="/courses" data-link>Courses</a>
            <a id="logout-link">Logout</a>
        </div>
        `;
  }
}
