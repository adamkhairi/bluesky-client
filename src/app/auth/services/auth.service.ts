import { BehaviorSubject } from "rxjs";
import { BskyAgent } from "@atproto/api";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private agent: BskyAgent | null = null;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  currentSessionSubject = new BehaviorSubject<any>(null);
  currentSession$ = this.currentSessionSubject.asObservable();
  constructor() {
    this.initializeAgent();
    this.checkStoredSession();
  }

  private initializeAgent() {
    try {
      this.agent = new BskyAgent({
        service: environment.bskyService,
        persistSession: (evt, session) => {
          if (session) {
            this.currentSessionSubject.next(session);
            localStorage.setItem("bsky_session", JSON.stringify(session));
          }
        },
      });
    } catch (error) {
      console.error("Failed to initialize BskyAgent:", error);
      this.agent = null;
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }

  async login(identifier: string, password: string): Promise<boolean> {
    try {
      if (!this.agent) {
        this.initializeAgent(); // Try to reinitialize if agent is null
        if (!this.agent) {
          throw new Error("Agent initialization failed");
        }
      }

      const response = await this.agent.login({
        identifier,
        password,
      });

      if (response.success) {
        this.isAuthenticatedSubject.next(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      // You might want to handle specific error types here
      if (error instanceof Error) {
        // Handle specific error cases if needed
        throw error; // Rethrow to handle in component
      }
      return false;
    }
  }

  private async checkStoredSession(): Promise<void> {
    try {
      const storedSession = localStorage.getItem("bsky_session");
      if (storedSession && this.agent) {
        const session = JSON.parse(storedSession);
        await this.agent.resumeSession(session);
        this.isAuthenticatedSubject.next(true);
      }
    } catch (error) {
      console.error("Failed to resume session:", error);
      this.logout();
    }
  }

  logout(): void {
    localStorage.removeItem("bsky_session");
    this.isAuthenticatedSubject.next(false);
    this.agent = null;
    this.initializeAgent(); // Reinitialize agent after logout
  }

  getAgent(): BskyAgent | null {
    return this.agent;
  }
}
