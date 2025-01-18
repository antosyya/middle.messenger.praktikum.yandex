import Handlebars from "handlebars";
import { Auth } from "./pages/auth/index";
import "./style.css";
import { ErrorPage } from "./pages/error";
import { NotFound } from "./pages/not-found";
import { Register } from "./pages/register";
import Input from "./components/Input";

Handlebars.registerPartial("Input", Input);
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");

  const path = window.location.pathname;
  if (path.includes("auth")) {
    const nFn = Handlebars.compile(Auth);
    if (root) {
      root.innerHTML = nFn({});
    }
  }
  if (path.includes("register")) {
    const nFn = Handlebars.compile(Register);
    if (root) {
      root.innerHTML = nFn({});
    }
  }
  if (path.includes("not-found")) {
    const nFn = Handlebars.compile(NotFound);
    if (root) {
      root.innerHTML = nFn({});
    }
  }
  if (path.includes("error")) {
    const nFn = Handlebars.compile(ErrorPage);
    if (root) {
      root.innerHTML = nFn({});
    }
  }
});
