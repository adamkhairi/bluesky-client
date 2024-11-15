import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FeedTimelineService } from "../..";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FeedItemComponent } from "../feed-item/feed-item.component";

@Component({
  selector: "bc-feed",
  standalone: true,
  imports: [FeedItemComponent, CommonModule, FontAwesomeModule],
  templateUrl: "./feed.component.html",
  styleUrl: "./feed.component.scss",
  providers: [FeedTimelineService],
})
export class FeedComponent {
  private feedTimelineService = inject(FeedTimelineService);

  loading = false;
  feedItems$ = this.feedTimelineService.feedItems$;

  ngOnInit() {
    this.loadFeed();
  }

  async loadFeed() {
    this.loading = true;
    try {
      await this.feedTimelineService.getTimeline();
    } finally {
      this.loading = false;
    }
  }

  async loadMore() {
    this.loading = true;
    try {
      // Implement load more logic
      await this.feedTimelineService.getTimeline(50); // You might need to modify this to handle pagination
    } finally {
      this.loading = false;
    }
  }
}

interface FeedItem {
  post: {
    uri: string;
    author: {
      avatar: string;
      displayName: string;
      handle: string;
    };
    record: {
      text: string;
    };
    replyCount: number;
    repostCount: number;
    likeCount: number;
  };
  reply?: {
    parent: {
      author: {
        handle: string;
      };
    };
  };
}
