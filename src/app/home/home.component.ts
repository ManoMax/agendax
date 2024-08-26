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
    this.newEvent = { title: '', description: '', date: '', time: '' };
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
    this.eventService.createEvent(this.newEvent).subscribe((event: any) => {
      this.events.push(event);
      this.updateEventCounts();
      this.newEvent = { title: '', description: '', date: '', time: '' };
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

  selectedTime: Date = new Date();

  onTimeSelected(event: any) {
    const selectedTime: Date = event.newValue;
    console.log('Tempo selecionado:', selectedTime);
    this.selectedTime = selectedTime;
  }
}
