import { Component, inject, input } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faCheck,
  faComment,
  faHeart,
  faPlus,
  faReply,
  faRetweet,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { DatePipe } from "@angular/common";
import { HandlePipe } from "../../../../shared";
import { FeedTimelineService } from "../../services/feed-timeline.service";

@Component({
  selector: "bc-feed-item",
  standalone: true,
  imports: [FontAwesomeModule, HandlePipe, DatePipe],
  templateUrl: "./feed-item.component.html",
  styleUrl: "./feed-item.component.scss",
})
export class FeedItemComponent {
  #feedTimelineService = inject(FeedTimelineService);
  follow(arg0: any) {
    this.#feedTimelineService.follow(arg0);
  }
  item = input<any>();

  faReply = faReply;
  faCheck = faCheck;
  faPlus = faPlus;
  faComment = faComment;
  faRetweet = faRetweet;
  faHeart = faHeart;
  faShare = faShare;
}
