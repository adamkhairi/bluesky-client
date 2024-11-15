import { Routes } from "@angular/router";

export const routes: Routes = [
  // { path: "", pathMatch: "full", redirectTo: "login" },
  {
    path: "feed",
    loadComponent: () =>
      import("./feed/components/feed/feed.component").then(
        (m) => m.FeedComponent,
      ),
  },
  {
    path: "",
    loadComponent: () =>
      import("./auth/components/login/login.component").then(
        (m) => m.LoginComponent,
      ),
  },
];
