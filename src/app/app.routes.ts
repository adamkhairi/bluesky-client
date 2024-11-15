import { Routes } from "@angular/router";
import { LayoutComponent } from "../shared/components/layout/layout.component";

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./feed/components/feed/feed.component").then(
            (m) => m.FeedComponent,
          ),
      },
      {
        path: "login",
        loadComponent: () =>
          import("./auth/components/login/login.component").then(
            (m) => m.LoginComponent,
          ),
      },
    ],
  },
];
