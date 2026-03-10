import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

interface ServiceData {
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  features: string[];
  details: string;
}

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  service: ServiceData | null = null;

  private serviceMap: { [key: string]: ServiceData } = {
    mechanical: {
      title: 'Mechanical Engineering',
      subtitle: 'HVAC & Building Systems',
      heroImage: 'assets/images/mechanical.png',
      description:
        'SynTa Engineering Inc provides comprehensive mechanical engineering services including HVAC system design, central plant design, geothermal systems, building automation systems, ventilation, indoor air quality, and energy modeling for commercial and residential projects.',
      features: [
        'HVAC System Design & Optimization',
        'Central Plant Design (Chillers & Boilers)',
        'Geothermal & Renewable Energy Systems',
        'Building Automation Systems (BAS)',
        'Ventilation & Indoor Air Quality',
        'Energy Modeling & LEED Consulting',
        'Load Calculations & System Sizing',
        'Commissioning Support'
      ],
      details:
        'Our mechanical engineering team specializes in designing energy-efficient heating, ventilation, and air conditioning systems. We leverage the latest technology and sustainable practices to deliver solutions that maximize occupant comfort while minimizing energy consumption and environmental impact.'
    },
    electrical: {
      title: 'Electrical Engineering',
      subtitle: 'Power & Lighting Systems',
      heroImage: 'assets/images/electrical.png',
      description:
        'Our electrical engineering services encompass complete power distribution, interior and exterior lighting design, emergency and standby power systems, photovoltaic and energy storage systems, and arc flash analysis.',
      features: [
        'Primary & Secondary Power Distribution',
        'Interior & Exterior Lighting Design',
        'Emergency & Standby Power Systems',
        'Photovoltaic (Solar) & Energy Storage',
        'Arc Flash Analysis & Mitigation',
        'Fire Alarm System Integration',
        'Low Voltage & Communication Systems',
        'Electrical System Studies'
      ],
      details:
        'SynTa Engineering delivers reliable and efficient electrical systems designed to meet the demands of modern buildings. Our designs prioritize safety, energy efficiency, and future adaptability, incorporating the latest in renewable energy technologies.'
    },
    plumbing: {
      title: 'Plumbing Engineering',
      subtitle: 'Water & Waste Systems',
      heroImage: 'assets/images/plumbing.png',
      description:
        'We provide complete plumbing engineering services including domestic water systems, sanitary waste and vent, storm water management, natural gas piping, medical gas systems, and greywater reclaim systems.',
      features: [
        'Domestic Hot & Cold Water Systems',
        'Sanitary Waste & Vent Design',
        'Storm Water Management',
        'Natural Gas Piping Systems',
        'Medical Gas Systems',
        'Greywater & Rainwater Reclaim',
        'Water Heater & Booster Pump Design',
        'Code Compliance & Plan Review'
      ],
      details:
        'Our plumbing engineers design reliable, code-compliant systems that ensure safe water distribution and efficient waste removal. We incorporate sustainable design practices including water conservation and reclamation strategies.'
    },
    'fire-sprinklers': {
      title: 'Fire Sprinkler Design',
      subtitle: 'Suppression Systems',
      heroImage: 'assets/images/sprinkler.png',
      description:
        'SynTa Engineering designs comprehensive fire suppression systems including water-based suppression (wet, dry, pre-action, deluge), standpipe systems, fire pump design, foam suppression, and clean agent systems.',
      features: [
        'Wet & Dry Sprinkler Systems',
        'Pre-Action & Deluge Systems',
        'Standpipe System Design',
        'Fire Pump Selection & Design',
        'Foam Suppression Systems',
        'Clean Agent Systems',
        'Hydraulic Calculations',
        'System Inspection & Testing Support'
      ],
      details:
        'Life safety is our top priority. Our fire protection engineers design suppression systems that meet all applicable codes and standards while providing maximum protection for building occupants and assets through proven and advanced technologies.'
    },
    'fire-alarm': {
      title: 'Fire Alarm Design',
      subtitle: 'Detection & Notification',
      heroImage: 'assets/images/alarm.png',
      description:
        'Our fire alarm design services include addressable and intelligent detection systems, voice evacuation, life safety system integration, mass notification, and advanced smoke detection and control.',
      features: [
        'Addressable & Intelligent Detection',
        'Voice Evacuation Systems',
        'Life Safety System Integration',
        'Mass Notification Systems',
        'Smoke Detection & Control',
        'Emergency Communication Systems',
        'System Programming & Commissioning',
        'Code Analysis & AHJ Coordination'
      ],
      details:
        'SynTa Engineering designs state-of-the-art fire detection and alarm systems that provide early warning and facilitate safe, efficient evacuation during emergencies. Our designs integrate seamlessly with other building life safety systems.'
    }
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadService();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadService();
        window.scrollTo(0, 0);
      });
  }

  private loadService(): void {
    const slug = this.router.url.split('/').pop()?.split('?')[0] || '';
    this.service = this.serviceMap[slug] || null;
  }
}
