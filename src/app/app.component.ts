import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "bluesky-client";
}
