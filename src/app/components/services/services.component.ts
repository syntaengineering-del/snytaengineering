import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services = [
    {
      title: 'Mechanical Engineering',
      description:
        'Expert HVAC system design, energy modeling, and ventilation solutions for ultimate occupant comfort and energy efficiency.',
      image: 'assets/images/mechanical.png',
      link: '/mechanical'
    },
    {
      title: 'Electrical Engineering',
      description:
        'Reliable power distribution, lighting design, and emergency power systems for modern commercial and residential facilities.',
      image: 'assets/images/electrical.png',
      link: '/electrical'
    },
    {
      title: 'Plumbing Engineering',
      description:
        'Sustainable water distribution and waste disposal systems meeting the highest regulatory and environmental standards.',
      image: 'assets/images/plumbing.png',
      link: '/plumbing'
    },
    {
      title: 'Fire Sprinklers',
      description:
        'Life-safety focused fire suppression systems including wet, dry, pre-action, and special agent solutions.',
      image: 'assets/images/sprinkler.png',
      link: '/fire-sprinklers'
    },
    {
      title: 'Fire Alarm Design',
      description:
        'Advanced detection and voice evacuation systems to ensure rapid emergency notification and occupant safety.',
      image: 'assets/images/alarm.png',
      link: '/fire-alarm'
    }
  ];
}
