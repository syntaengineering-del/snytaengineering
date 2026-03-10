import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-projects-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './projects.page.html',
    styleUrls: ['./projects.page.scss']
})
export class ProjectsPageComponent {
    activeFilter = 'all';

    projects = [
        {
            title: 'Metro Commercial Plaza',
            category: 'commercial',
            image: 'assets/images/mechanical.png',
            location: 'New York, NY',
            services: ['Mechanical', 'Electrical', 'Plumbing'],
            sqft: '250,000 sq ft'
        },
        {
            title: 'City Medical Center',
            category: 'healthcare',
            image: 'assets/images/electrical.png',
            location: 'Brooklyn, NY',
            services: ['Full MEP', 'Fire Protection'],
            sqft: '180,000 sq ft'
        },
        {
            title: 'Riverside Office Tower',
            category: 'commercial',
            image: 'assets/images/hero.png',
            location: 'Jersey City, NJ',
            services: ['Mechanical', 'Electrical'],
            sqft: '320,000 sq ft'
        },
        {
            title: 'Valley School District',
            category: 'education',
            image: 'assets/images/plumbing.png',
            location: 'Staten Island, NY',
            services: ['Full MEP', 'Fire Alarm'],
            sqft: '120,000 sq ft'
        },
        {
            title: 'Sunset Luxury Residences',
            category: 'residential',
            image: 'assets/images/sprinkler.png',
            location: 'Miami, FL',
            services: ['Plumbing', 'Fire Sprinklers'],
            sqft: '85,000 sq ft'
        },
        {
            title: 'Industrial Distribution Center',
            category: 'industrial',
            image: 'assets/images/alarm.png',
            location: 'Newark, NJ',
            services: ['Electrical', 'Fire Protection'],
            sqft: '400,000 sq ft'
        },
        {
            title: 'Global Tech Headquarters',
            category: 'commercial',
            image: 'assets/images/mechanical.png',
            location: 'San Francisco, CA',
            services: ['HVAC Optimization', 'Smart Controls'],
            sqft: '450,000 sq ft'
        },
        {
            title: 'St. Mary’s Children’s Hospital',
            category: 'healthcare',
            image: 'assets/images/electrical.png',
            location: 'Chicago, IL',
            services: ['Critical Power', 'Life Safety'],
            sqft: '210,000 sq ft'
        },
        {
            title: 'The Green High School',
            category: 'education',
            image: 'assets/images/plumbing.png',
            location: 'Austin, TX',
            services: ['Solar PV Integration', 'Full MEP'],
            sqft: '150,000 sq ft'
        }
    ];

    filters = ['all', 'commercial', 'healthcare', 'education', 'residential', 'industrial'];

    get filteredProjects() {
        if (this.activeFilter === 'all') return this.projects;
        return this.projects.filter((p) => p.category === this.activeFilter);
    }

    setFilter(filter: string) {
        this.activeFilter = filter;
    }
}
