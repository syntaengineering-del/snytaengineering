import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Observable, of } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';
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
    projects$: Observable<Project[]>;
    loading = true;
    error: string | null = null;

    // Gallery State
    showGallery = false;
    selectedProject: Project | null = null;
    currentImageIndex = 0;

    filters = ['all', 'commercial', 'healthcare', 'education', 'residential', 'industrial'];

    constructor(private projectService: ProjectService) {
        // Basic initialization
        this.projects$ = of([]);
    }

    ngOnInit() {
        console.log('ProjectsPage: Initializing...');

        // Fetch projects and merge with static ones
        this.projects$ = this.projectService.getProjects().pipe(
            map(liveProjects => {
                console.log('ProjectsPage: Live projects received:', liveProjects.length);
                this.loading = false;
                const staticProjects = this.projectService.getStaticProjects();
                return [...staticProjects, ...liveProjects];
            }),
            catchError(err => {
                console.error('ProjectsPage: Error loading live projects:', err);
                this.loading = false;
                this.error = 'Live projects could not be loaded. Showing static portfolio.';
                return of(this.projectService.getStaticProjects());
            })
        );
    }

    getFilteredProjects(projects: Project[] | null) {
        if (!projects) return [];
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
}
