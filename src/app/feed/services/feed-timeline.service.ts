import { inject, Injectable } from "@angular/core";
import { async, BehaviorSubject } from "rxjs";
import { AuthService } from "../../auth";

@Injectable()
export class FeedTimelineService {
  private authService: AuthService = inject(AuthService);
  private feedItemsSubject = new BehaviorSubject<any[]>([]);
  feedItems$ = this.feedItemsSubject.asObservable();

  private timeLineItemsSubject = new BehaviorSubject<any[]>([]);
  timeLineItems$ = this.timeLineItemsSubject.asObservable();
  preferredLanguages: string[] = ['en', 'fr', 'es'];

  private cursorSubject = new BehaviorSubject<string | undefined>(undefined);
  cursor$ = this.cursorSubject.asObservable();

  async getTimeline(limit: number = 10): Promise<void> {
    try {
      const agent = this.authService.getAgent();
      const response = await agent?.getTimeline({
        cursor: this.cursorSubject.value,
        limit,
      });

      if (response?.success) {
        console.log("Timeline response:", response.data.feed);

        this.timeLineItemsSubject.next([...this.timeLineItemsSubject.value, ...response.data.feed]);
        this.cursorSubject.next(response.data.cursor);
      }
    } catch (error) {
      console.error("Timeline fetch error:", error);
    }
  }

  async getFeed(limit: number = 50, feed?: string): Promise<void> {
    try {
      const agent = this.authService.getAgent();
      const response = await agent?.app.bsky.feed.getFeed(
        {
          feed: feed ? feed : '',
          limit,
        },
        {
          headers: {
            "Accept-Language": this.preferredLanguages.join(", "),
          },
        });

      if (response?.success) {
        console.log("Feed response:", response.data.feed);

        this.timeLineItemsSubject.next(response.data.feed);
      }
    } catch (error) {
      console.error("Feed fetch error:", error);
    }
  }

  async follow(did: string): Promise<any> {
    try {
      const agent = this.authService.getAgent();
      const response = await agent?.follow(did);

      if (response) {
        console.log("Follow response:", response);
      }
      return response;
    } catch (error) {
      console.error("Follow error:", error);
      return false;
    }
  }

  /* async getDescovry(limit: number = 50): Promise<void> {
    try {
      const agent = this.authService.getAgent();
      const response = await agent?.getPosts({
        limit,
      });

      if (response?.success) {
        console.log("Discovery response:", response.data.feed);
        
        this.feedItemsSubject.next(response.data.feed);
      }
    } catch (error) {
      console.error("Discovery fetch error:", error);
    }
  } */


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
