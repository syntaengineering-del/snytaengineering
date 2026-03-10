import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-projects-page',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './projects.page.html',
    styleUrls: ['./projects.page.scss']
})
export class ProjectsPageComponent implements OnInit {
    activeFilter = 'all';
    projects$: Observable<Project[]> = of([]);
    loading = true;
    error: string | null = null;
    seeding = false;

    // Gallery State
    showGallery = false;
    selectedProject: Project | null = null;
    currentImageIndex = 0;

    filters = ['all', 'commercial', 'healthcare', 'education', 'residential', 'industrial'];

    constructor(private projectService: ProjectService) { }

    ngOnInit() {
        console.log('ProjectsPageComponent initialized. Fetching projects...');
        this.projects$ = this.projectService.getProjects().pipe(
            map(projects => {
                this.loading = false;
                console.log('Firestore projects received:', projects);
                if (projects.length === 0) {
                    console.log('Firestore is empty, showing static projects.');
                    return this.staticProjects;
                }
                return projects;
            }),
            catchError(err => {
                console.error('Firestore Fetch Error:', err);
                this.loading = false;
                this.error = 'Failed to connect to Firebase. Using local backup. Please check your Firestore rules.';
                return of(this.staticProjects);
            })
        );
    }

    getFilteredProjects(projects: Project[]) {
        if (this.activeFilter === 'all') return projects;
        return projects.filter((p) => p.category === this.activeFilter);
    }

    setFilter(filter: string) {
        this.activeFilter = filter;
    }

    // Gallery Methods
    openGallery(project: Project, index: number = 0) {
        if (!project.images || project.images.length === 0) {
            project.images = [project.mainImage];
        }
        this.selectedProject = project;
        this.currentImageIndex = index;
        this.showGallery = true;
        document.body.style.overflow = 'hidden';
    }

    closeGallery() {
        this.showGallery = false;
        this.selectedProject = null;
        document.body.style.overflow = 'auto';
    }

    nextImage(event?: Event) {
        if (event) event.stopPropagation();
        if (this.selectedProject && this.selectedProject.images) {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedProject.images.length;
        }
    }

    prevImage(event?: Event) {
        if (event) event.stopPropagation();
        if (this.selectedProject && this.selectedProject.images) {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.selectedProject.images.length) % this.selectedProject.images.length;
        }
    }

    async seedData() {
        if (confirm('Are you sure you want to seed static data to Firebase?')) {
            this.seeding = true;
            try {
                console.log('Attempting to seed data to Firestore...');
                await this.projectService.seedInitialData(this.staticProjects);
                console.log('Seed successful!');
                alert('Data seeded successfully! It should appear in the grid shortly.');
            } catch (err: any) {
                console.error('Seed Error:', err);
                alert('Error seeding data: ' + (err.message || 'Check Firestore Rules'));
            } finally {
                this.seeding = false;
            }
        }
    }

    private staticProjects: Project[] = [
        {
            title: 'Metro Commercial Plaza',
            category: 'commercial',
            mainImage: 'assets/images/mechanical.png',
            images: ['assets/images/mechanical.png', 'assets/images/electrical.png', 'assets/images/plumbing.png'],
            location: 'New York, NY',
            services: ['Mechanical', 'Electrical', 'Plumbing'],
            sqft: '250,000 sq ft'
        },
        {
            title: 'City Medical Center',
            category: 'healthcare',
            mainImage: 'assets/images/electrical.png',
            images: ['assets/images/electrical.png', 'assets/images/mechanical.png'],
            location: 'Brooklyn, NY',
            services: ['Full MEP', 'Fire Protection'],
            sqft: '180,000 sq ft'
        },
        {
            title: 'Riverside Office Tower',
            category: 'commercial',
            mainImage: 'assets/images/hero.png',
            images: ['assets/images/hero.png', 'assets/images/mechanical.png'],
            location: 'Jersey City, NJ',
            services: ['Mechanical', 'Electrical'],
            sqft: '320,000 sq ft'
        },
        {
            title: 'Valley School District',
            category: 'education',
            mainImage: 'assets/images/plumbing.png',
            images: ['assets/images/plumbing.png', 'assets/images/sprinkler.png'],
            location: 'Staten Island, NY',
            services: ['Full MEP', 'Fire Alarm'],
            sqft: '120,000 sq ft'
        }
    ];
}
