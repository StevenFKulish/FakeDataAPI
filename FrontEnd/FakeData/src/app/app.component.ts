import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopicsListComponent } from './topics/topics-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopicsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FakeData';
}
