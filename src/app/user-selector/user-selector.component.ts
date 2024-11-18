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
  @Output() updateSelectedUser = new EventEmitter<string>(); // EventEmitter to send the selected user to the parent component

  @Input() userList: string[] = [];
  @Input() selectedUser: string = '';

  // Method to handle user selection and emit the selected user
  updateUser(user: string) {
    this.updateSelectedUser.emit(user); // Emits the selected user to the parent component
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userList'].currentValue) {
      this.userList = this.userList; // Updates the user list when it changes
    }
  }
}
