// import Handlebars from "handlebars";
// import { Auth } from "./pages/auth/index";
// import { AuthPage } from "./pages/auth/index";
import "./style.css";
// import { ErrorPage } from "./pages/error";
// import { NotFound } from "./pages/not-found";
// import { Register } from "./pages/register";
// import { Profile } from "./pages/profile";
// import Input from "./components/Input";
// import Header from "./components/Header";
// import { Chat } from "./pages/chat";
// import Button from "./components/Button";
// import ChatItem from "./components/ChatItem";
import App from "./App";
// Handlebars.registerPartial("Input", Input);
// Handlebars.registerPartial("Header", Header);
// Handlebars.registerPartial("Button", Button);
// Handlebars.registerPartial("ChatItem", ChatItem);
document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.render();
  // const root = document.getElementById("app");

  // const path = window.location.pathname;
  // if (path.includes("")) {
  //   let authPage = new AuthPage();
  //   const nFn = authPage.getContent();
  //   if (root) {
  //     root.innerHTML = nFn({});
  //   }
  // }
  // if (path.includes("register")) {
  //   const nFn = Handlebars.compile(Register);
  //   if (root) {
  //     root.innerHTML = nFn({});
  //   }
  // }
  // if (path.includes("profile")) {
  //   const nFn = Handlebars.compile(Profile);
  //   if (root) {
  //     root.innerHTML = nFn({});
  //   }
  // }
  // if (path.includes("not-found")) {
  //   const nFn = Handlebars.compile(NotFound);
  //   if (root) {
  //     root.innerHTML = nFn({});
  //   }
  // }
  // if (path.includes("error")) {
  //   const nFn = Handlebars.compile(ErrorPage);
  //   if (root) {
  //     root.innerHTML = nFn({});
  //   }
  // }
  // if (path.includes("chat")) {
  //   const nFn = Handlebars.compile(Chat);
  //   if (root) {
  //     root.innerHTML = nFn({});
  //   }
  // }
});
