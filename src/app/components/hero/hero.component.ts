import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  images = [
    '/assets/images/hvac 4.jpeg',
    '/assets/images/fire sprinklers 1.jpeg',
    '/assets/images/mechanical 7.jpeg',
    '/assets/images/sprinklers.jpeg'
  ];
  activeIndex = 0;
  private intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % this.images.length;
      }, 5000);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
