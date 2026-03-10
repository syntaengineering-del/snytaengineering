import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
    activeFilter = 'all';

    projects = [
        {
            title: 'Metro Commercial Plaza',
            category: 'commercial',
            image: 'assets/images/mechanical.png',
            services: ['Mechanical', 'Electrical', 'Plumbing'],
            sqft: '250,000 sq ft'
        },
        {
            title: 'City Medical Center',
            category: 'healthcare',
            image: 'assets/images/electrical.png',
            services: ['Full MEP', 'Fire Protection'],
            sqft: '180,000 sq ft'
        },
        {
            title: 'Riverside Office Tower',
            category: 'commercial',
            image: 'assets/images/hero.png',
            services: ['Mechanical', 'Electrical'],
            sqft: '320,000 sq ft'
        },
        {
            title: 'Valley School District',
            category: 'education',
            image: 'assets/images/plumbing.png',
            services: ['Full MEP', 'Fire Alarm'],
            sqft: '120,000 sq ft'
        },
        {
            title: 'Sunset Luxury Residences',
            category: 'residential',
            image: 'assets/images/sprinkler.png',
            services: ['Plumbing', 'Fire Sprinklers'],
            sqft: '85,000 sq ft'
        },
        {
            title: 'Industrial Distribution Center',
            category: 'commercial',
            image: 'assets/images/alarm.png',
            services: ['Electrical', 'Fire Protection'],
            sqft: '400,000 sq ft'
        }
    ];

    filters = ['all', 'commercial', 'healthcare', 'education', 'residential'];

    get filteredProjects() {
        if (this.activeFilter === 'all') return this.projects;
        return this.projects.filter((p) => p.category === this.activeFilter);
    }

    setFilter(filter: string) {
        this.activeFilter = filter;
    }
}
