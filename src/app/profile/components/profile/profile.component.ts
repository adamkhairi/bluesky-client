import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileViewDetailed } from '@atproto/api/dist/client/types/app/bsky/actor/defs';
import { ProfileService } from '../../services/profile.service';
import { JsonPipe } from '@angular/common';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'bc-profile',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {


  private service = inject(ProfileService)
  private ar = inject(Router)
  profile$ = signal<ProfileViewDetailed | null>(null);


  ngOnInit() {
    this.service.getProfile()?.then((response) => {
      if (response?.success) {
        this.profile$.set(response.data)
      }
    })
  }
}
