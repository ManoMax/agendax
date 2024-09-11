import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newEvent;
  events: any[];
  upcomingEventsCount;
  pastUnfinishedEventsCount;
  pastFinishedEventsCount;

  constructor(private eventService: EventService) {
    this.newEvent = { title: '', description: '', date: new Date(), time: new Date() };
    this.events = [];
    this.upcomingEventsCount = 0;
    this.pastUnfinishedEventsCount = 0;
    this.pastFinishedEventsCount = 0;
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((events: any[]) => {
      this.events = events;
      this.updateEventCounts();
    });
  }

  createEvent(): void {
    console.log(this.newEvent)
    this.eventService.createEvent(this.newEvent).subscribe((event: any) => {
      this.events.push(event);
      this.updateEventCounts();
      this.newEvent = { title: '', description: '', date: new Date(), time: new Date() };
    });
  }

  shareEvent(eventId: string): void {
    this.eventService.shareEvent(eventId).subscribe(link => {
      navigator.clipboard.writeText(link);
      alert('Link copiado para a área de transferência!');
    });
  }

  updateEventCounts(): void {
    const now = new Date();
    this.upcomingEventsCount = this.events.filter(event => new Date(event.date) > now).length;
    this.pastUnfinishedEventsCount = this.events.filter(event => new Date(event.date) <= now && !event.finished).length;
    this.pastFinishedEventsCount = this.events.filter(event => new Date(event.date) <= now && event.finished).length;
  }

  getFormattedDateTime(event: any): string {
    const date = new Date(event.date);
    const time = new Date(`1970-01-01T${event.time}`);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} - ${formattedTime}`;
  }
}
