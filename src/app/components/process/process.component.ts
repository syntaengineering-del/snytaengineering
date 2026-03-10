import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-process',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss']
})
export class ProcessComponent {
    steps = [
        {
            number: '01',
            title: 'Consultation',
            description:
                'We begin with an in-depth consultation to understand your project requirements, goals, timeline, and budget constraints.'
        },
        {
            number: '02',
            title: 'Concept Design',
            description:
                'Our engineers develop preliminary system concepts, perform load calculations, and create schematic designs for review.'
        },
        {
            number: '03',
            title: 'Design Development',
            description:
                'We refine the selected concept into detailed construction documents with full specifications and coordination.'
        },
        {
            number: '04',
            title: 'Construction Support',
            description:
                'Our team provides construction administration, shop drawing reviews, RFI responses, and site inspections.'
        }
    ];
}
