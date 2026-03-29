import { Component, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-about',
    standalone: true,
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  projectsCompleted = 500;
  teamMembers = 50;
  yearsExperience = 15;
  
  private targetProjects = 150;
  private targetTeam = 15;
  private targetYears = 25;

  private startProjects = 500;
  private startTeam = 50;
  private startYears = 15;
  
  private animationFrameId: any;
  private observer: any;

  @ViewChild('statsSection') statsSection!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.animateCounters();
          this.observer.disconnect();
        }
      }, { threshold: 0.1 });
      
      if (this.statsSection) {
        this.observer.observe(this.statsSection.nativeElement);
      }
    } else {
      this.projectsCompleted = this.targetProjects;
      this.teamMembers = this.targetTeam;
      this.yearsExperience = this.targetYears;
    }
  }

  animateCounters() {
    const duration = 2000;
    const fps = 60;
    const totalFrames = (duration / 1000) * fps;
    let currentFrame = 0;
    
    // Ease out quad
    const easeOutQuad = (t: number) => t * (2 - t);

    const animate = () => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easedProgress = easeOutQuad(progress);

      if (currentFrame < totalFrames) {
        this.projectsCompleted = Math.floor(this.startProjects + (this.targetProjects - this.startProjects) * easedProgress);
        this.teamMembers = Math.floor(this.startTeam + (this.targetTeam - this.startTeam) * easedProgress);
        this.yearsExperience = Math.floor(this.startYears + (this.targetYears - this.startYears) * easedProgress);
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.projectsCompleted = this.targetProjects;
        this.teamMembers = this.targetTeam;
        this.yearsExperience = this.targetYears;
      }
    };
    
    this.animationFrameId = requestAnimationFrame(animate);
  }

  ngOnDestroy() {
    if (this.animationFrameId && isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
