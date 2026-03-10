import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { AboutPageComponent } from './pages/about/about.page';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'mechanical', component: ServiceDetailComponent },
    { path: 'electrical', component: ServiceDetailComponent },
    { path: 'plumbing', component: ServiceDetailComponent },
    { path: 'fire-sprinklers', component: ServiceDetailComponent },
    { path: 'fire-alarm', component: ServiceDetailComponent },
    { path: '**', redirectTo: '' }
];
