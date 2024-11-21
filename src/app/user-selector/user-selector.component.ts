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
  @Input() updatedUserName: string = ''; // This will receive the updated username from HomeComponent
  selectedUser: string = '';

  // Method to handle user selection and emit the selected user
  updateUser(user: string) {
    this.selectedUser = user;
    this.updateSelectedUser.emit(user); // This emits the selected user
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userList'] && changes['userList'].currentValue) {
      this.userList = [...changes['userList'].currentValue]; //This ensures the changed list is updated
    }
    if (changes['updatedUserName']) {
      // If updatedUserName changes, highlight the new user
      this.selectedUser = this.updatedUserName;
    }
  }
}
