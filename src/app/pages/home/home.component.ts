import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServicesComponent } from '../../components/services/services.component';
import { AboutComponent } from '../../components/about/about.component';
import { WhyChooseUsComponent } from '../../components/why-choose-us/why-choose-us.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { ProcessComponent } from '../../components/process/process.component';
import { ClientsComponent } from '../../components/clients/clients.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        HeroComponent,
        ServicesComponent,
        AboutComponent,
        WhyChooseUsComponent,
        ProjectsComponent,
        ProcessComponent,
        ClientsComponent,
        TestimonialsComponent,
        CtaBannerComponent
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent { }
