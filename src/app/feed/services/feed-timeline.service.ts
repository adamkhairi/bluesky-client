import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../../auth";

@Injectable()
export class FeedTimelineService {
  private authService: AuthService = inject(AuthService);
  private feedItemsSubject = new BehaviorSubject<any[]>([]);
  feedItems$ = this.feedItemsSubject.asObservable();

  async getTimeline(limit: number = 50): Promise<void> {
    try {
      const agent = this.authService.getAgent();
      const response = await agent?.getTimeline({
        limit,
      });

      if (response?.success) {
        this.feedItemsSubject.next(response.data.feed);
      }
    } catch (error) {
      console.error("Timeline fetch error:", error);
    }
  }

  async createPost(text: string): Promise<any> {
    try {
      const agent = this.authService.getAgent();
      const response = await agent?.post({
        text,
      });
      return response;
    } catch (error) {
      console.error("Post creation error:", error);
      return false;
    }
  }
}
