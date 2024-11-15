import { ProfileViewDetailed } from '@atproto/api/dist/client/types/app/bsky/actor/defs';
import { AuthService } from './../../auth/services/auth.service';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private authService = inject(AuthService);
  private agent = this.authService.getAgent();
  private currentSessionSubject = this.authService.currentSessionSubject;



  getProfile() {
    return this.agent?.getProfile({
      actor: this.currentSessionSubject.value.did
    })
  }

}
