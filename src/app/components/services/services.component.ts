import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {
  services = [
    {
      title: 'Mechanical (HVAC) Engineering',
      description: 'Expert HVAC system design, energy modeling, and ventilation solutions for ultimate occupant comfort and high indoor air quality.',
      images: [
        '/assets/images/hvac.jpeg',
        '/assets/images/hvac 2.jpeg',
        '/assets/images/hvac 3.jpeg',
        '/assets/images/hvac 4.jpeg',
        '/assets/images/hvac 5.jpeg',
        '/assets/images/hvac 6.jpeg',
        '/assets/images/hvac 7.jpeg',
        '/assets/images/hvac 8.jpeg',
        '/assets/images/mechanical 1.jpeg',
        '/assets/images/mechanical 2.jpeg',
        '/assets/images/mechanical 3.jpeg',
        '/assets/images/mechanical 4.jpeg',
        '/assets/images/mechanical 5.jpeg',
        '/assets/images/mechanical 6.jpeg',
        '/assets/images/mechanical 7.jpeg',
        '/assets/images/mechanical 8.jpeg',
        '/assets/images/mechanical 9.jpeg'
      ],
      link: '/mechanical',
      activeImageIndex: 0
    },
    {
      title: 'Electrical Engineering',
      description: 'Reliable power distribution, lighting design, and emergency power systems for modern commercial and residential facilities.',
      images: [
        '/assets/images/eleltrical.jpeg',
        '/assets/images/lining.jpeg'
      ],
      link: '/electrical',
      activeImageIndex: 0
    },
    {
      title: 'Plumbing Engineering',
      description: 'Sustainable water distribution and waste disposal systems meeting the highest regulatory and environmental standards.',
      images: [
        '/assets/images/plumbing 1.jpeg',
        '/assets/images/plumbing 2.jpeg',
        '/assets/images/plumbing.png'
      ],
      link: '/plumbing',
      activeImageIndex: 0
    },
    {
      title: 'Fire Sprinklers',
      description: 'Life-safety focused fire suppression systems including wet, dry, pre-action, and special agent solutions.',
      images: [
        '/assets/images/fire sprinklers 1.jpeg',
        '/assets/images/fire sprinklers 2.jpeg',
        '/assets/images/fire sprinklers 3.jpeg',
        '/assets/images/fire sprinklers 4.jpeg',
        '/assets/images/fire sprinklers 5.jpeg',
        '/assets/images/fire sprinklers 6.jpeg',
        '/assets/images/fire sprinklers 7.jpeg',
        '/assets/images/sprinklers.jpeg'
      ],
      link: '/fire-sprinklers',
      activeImageIndex: 0
    },
    {
      title: 'Fire Alarm Design',
      description: 'Advanced detection and voice evacuation systems to ensure rapid emergency notification and occupant safety.',
      images: [
        '/assets/images/fire alarm.jpeg',
        '/assets/images/alarm.png'
      ],
      link: '/fire-alarm',
      activeImageIndex: 0
    },
    {
      title: 'Title 24 Energy Compliance',
      description: 'Complete energy modeling and compliance documentation to meet the latest California energy efficiency standards and building codes.',
      images: [
        '/assets/images/compliance_1.png',
        '/assets/images/compliance_2.png',
        '/assets/images/compliance_3.png',
        '/assets/images/compliance_4.png',
        '/assets/images/compliance_5.png',
        '/assets/images/compliance_6.png',
        '/assets/images/compliance_7.png',
        '/assets/images/compliance_8.png',
        '/assets/images/compliance_9.png',
        '/assets/images/compliance_10.png'
      ],
      link: '/energy-compliance',
      activeImageIndex: 0
    }
  ];

  allImages: string[] = [
    '/assets/images/mechanical 1.jpeg',
    '/assets/images/mechanical 2.jpeg',
    '/assets/images/mechanical 3.jpeg',
    '/assets/images/mechanical 4.jpeg',
    '/assets/images/mechanical 5.jpeg',
    '/assets/images/mechanical 6.jpeg',
    '/assets/images/mechanical 7.jpeg',
    '/assets/images/mechanical 8.jpeg',
    '/assets/images/mechanical 9.jpeg',
    '/assets/images/hvac.jpeg',
    '/assets/images/hvac 2.jpeg',
    '/assets/images/hvac 3.jpeg',
    '/assets/images/hvac 4.jpeg',
    '/assets/images/hvac 5.jpeg',
    '/assets/images/hvac 6.jpeg',
    '/assets/images/hvac 7.jpeg',
    '/assets/images/hvac 8.jpeg',
    '/assets/images/eleltrical.jpeg',
    '/assets/images/plumbing 1.jpeg',
    '/assets/images/plumbing 2.jpeg',
    '/assets/images/fire sprinklers 1.jpeg',
    '/assets/images/fire sprinklers 2.jpeg',
    '/assets/images/fire sprinklers 3.jpeg',
    '/assets/images/fire sprinklers 4.jpeg',
    '/assets/images/fire sprinklers 5.jpeg',
    '/assets/images/fire sprinklers 6.jpeg',
    '/assets/images/fire sprinklers 7.jpeg',
    '/assets/images/sprinklers.jpeg',
    '/assets/images/lining.jpeg',
    '/assets/images/fire alarm.jpeg',
    '/assets/images/mechanical.png',
    '/assets/images/plumbing.png',
    '/assets/images/sprinkler.png',
    '/assets/images/compliance_1.png',
    '/assets/images/compliance_2.png',
    '/assets/images/compliance_3.png',
    '/assets/images/compliance_4.png',
    '/assets/images/compliance_5.png',
    '/assets/images/compliance_6.png',
    '/assets/images/compliance_7.png',
    '/assets/images/compliance_8.png',
    '/assets/images/compliance_9.png',
    '/assets/images/compliance_10.png'
  ];

  showGallery = false;
  galleryReady = true;
  currentImageIndex = 0;
  galleryImages: string[] = [];
  private carouselInterval: any;
  private cardCarouselInterval: any;

  ngOnInit() {
    this.prepareInfiniteScroll();
    this.startCardCarousels();
  }

  private prepareInfiniteScroll() {
    this.services.forEach(s => {
      if (s.images.length > 1) {
        s.images = [...s.images, s.images[0]];
      }
    });
  }

  ngOnDestroy() {
    this.stopCarousel();
    if (this.cardCarouselInterval) clearInterval(this.cardCarouselInterval);
  }

  startCardCarousels() {
    this.cardCarouselInterval = setInterval(() => {
      this.services.forEach(s => {
        if (s.images.length > 1) {
          s.activeImageIndex++;
          if (s.activeImageIndex === s.images.length - 1) {
            setTimeout(() => {
              s.activeImageIndex = 0;
            }, 1000);
          }
        }
      });
    }, 2500);
  }

  openGallery(images: string[], startIndex: number = 0) {
    this.galleryImages = images;
    this.currentImageIndex = startIndex;
    this.showGallery = true;
    this.restartAnimation();
    this.startCarousel();
  }

  closeGallery() {
    this.showGallery = false;
    this.stopCarousel();
  }

  startCarousel() {
    this.stopCarousel();
    this.carouselInterval = setInterval(() => {
      this.nextImage();
    }, 2000);
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
    this.restartAnimation();
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
    this.restartAnimation();
  }

  setCurrentImage(index: number) {
    this.currentImageIndex = index;
    this.restartAnimation();
    this.startCarousel();
  }

  private restartAnimation() {
    this.galleryReady = false;
    setTimeout(() => {
      this.galleryReady = true;
    }, 10);
  }
}
