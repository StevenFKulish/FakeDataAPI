import { Routes } from '@angular/router';
import { TopicsListComponent } from './topics/topics-list.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';

export const routes: Routes = [
    {
        path: '',
        component: TopicsListComponent,
        title: 'Topics'
    },
    {
        path: 'details/:id',
        component: TopicDetailsComponent,
        title: 'Details Page'
    }
];
