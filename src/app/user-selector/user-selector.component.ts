import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-user-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-selector.component.html',
  styleUrl: './user-selector.component.scss',
})
export class UserSelectorComponent implements OnChanges {
  @Output() updateSelectedUser = new EventEmitter<string>();

  @Input() userList: string[] = [];

  updateUser(user: string) {
    console.log('user:', user);
    this.updateSelectedUser.emit(user);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userList'].currentValue) {
      this.userList = this.userList;
    }
  }
}
