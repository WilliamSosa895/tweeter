import { Component, EventEmitter, Output, Input } from '@angular/core';

interface ReactionType {
  id: number;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-reaction-picker',
  template: `
    <div class="picker">
      <span *ngFor="let r of types"
            (click)="pick(r.id)"
            [class.selected]="r.id === selected"
            [title]="r.label">
        <img [src]="r.icon" class="icon"/>
      </span>
    </div>`,
  styleUrls: ['./reaction-picker.component.css']
})
export class ReactionPickerComponent {
  @Output() select = new EventEmitter<number>();
  @Input() selected?: number;

  types: ReactionType[] = [
    { id: 1, icon: 'assets/icons/like.png',  label: 'Me gusta' },
    { id: 2, icon: 'assets/icons/love.png',  label: 'Me encanta' },
    { id: 3, icon: 'assets/icons/sad.png',   label: 'Me entristece' },
    { id: 4, icon: 'assets/icons/angry.png', label: 'Me enfurece' },
    { id: 5, icon: 'assets/icons/hate.png',  label: 'Lo odio' },
  ];

  pick(id: number) {
    this.select.emit(id);
  }
}
