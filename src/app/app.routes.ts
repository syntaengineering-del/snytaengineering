import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { AboutPageComponent } from './pages/about/about.page';
import { ContactPageComponent } from './pages/contact/contact.page';
import { ProjectsPageComponent } from './pages/projects/projects.page';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: 'projects', component: ProjectsPageComponent },
    { path: 'mechanical', component: ServiceDetailComponent },
    { path: 'electrical', component: ServiceDetailComponent },
    { path: 'plumbing', component: ServiceDetailComponent },
    { path: 'fire-sprinklers', component: ServiceDetailComponent },
    { path: 'fire-alarm', component: ServiceDetailComponent },
    { path: '**', redirectTo: '' }
];
