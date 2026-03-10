import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-testimonials',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {
    testimonials = [
        {
            quote:
                'SynTa Engineering delivered exceptional MEP design for our 250,000 sq ft commercial campus. Their attention to energy efficiency resulted in a 30% reduction in projected operating costs.',
            name: 'James Richardson',
            title: 'VP of Facilities, Metro Development Group',
            initials: 'JR'
        },
        {
            quote:
                'The fire protection design for our hospital expansion was handled with the utmost professionalism. Their team coordinated seamlessly with our architects and the AHJ throughout the entire process.',
            name: 'Sarah Martinez',
            title: 'Project Manager, City Health Systems',
            initials: 'SM'
        },
        {
            quote:
                'Working with SynTa on our school district renovation was a pleasure. They provided innovative HVAC solutions that improved indoor air quality while staying within our tight budget.',
            name: 'David Chen',
            title: 'Director of Operations, Valley School District',
            initials: 'DC'
        }
    ];
}
