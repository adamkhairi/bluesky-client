import { Component, input } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faCheck,
  faComment,
  faHeart,
  faReply,
  faRetweet,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { DatePipe } from "@angular/common";
import { HandlePipe } from "../../../../shared";

@Component({
  selector: "bc-feed-item",
  standalone: true,
  imports: [FontAwesomeModule, HandlePipe, DatePipe],
  templateUrl: "./feed-item.component.html",
  styleUrl: "./feed-item.component.scss",
})
export class FeedItemComponent {
  item = input<any>();

  faReply = faReply;
  faCheck = faCheck;
  faComment = faComment;
  faRetweet = faRetweet;
  faHeart = faHeart;
  faShare = faShare;
}
