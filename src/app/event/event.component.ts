import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event: any;
  isOwner = false;

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.loadEvent(eventId);
    } else {
      console.error('ID do evento não encontrado na rota.');
    }
  }  

  loadEvent(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe(event => {
      this.event = event;
      this.isOwner = this.checkOwnership(event);
    }, () => {
      this.event = null;
    });
  }

  checkOwnership(event: any): boolean {
    // Lógica para verificar se o usuário atual é o dono do evento
    return true;
  }

  updateEvent(): void {
    this.eventService.updateEvent(this.event).subscribe(updatedEvent => {
      this.event = updatedEvent;
      alert('Evento atualizado com sucesso!');
    }, error => {
      console.error('Erro ao atualizar evento:', error);
      alert('Erro ao atualizar evento. Verifique o console para mais detalhes.');
    });
  }
}
