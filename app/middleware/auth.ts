export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  if (to.path === "/account" && !isAuthenticated) {
    return navigateTo("/login");
  }
});
