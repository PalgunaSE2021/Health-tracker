import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSelectorComponent } from './user-selector.component';
import { By } from '@angular/platform-browser';

describe('UserSelectorComponent', () => {
  let component: UserSelectorComponent;
  let fixture: ComponentFixture<UserSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSelectorComponent], // Using standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(UserSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of user cards', () => {
    component.userList = ['Alice', 'Bob', 'Charlie'];
    fixture.detectChanges();

    const userCards = fixture.debugElement.queryAll(By.css('.user-card'));
    expect(userCards.length).toBe(3);
    expect(userCards[0].nativeElement.textContent.trim()).toBe('Alice');
    expect(userCards[1].nativeElement.textContent.trim()).toBe('Bob');
    expect(userCards[2].nativeElement.textContent.trim()).toBe('Charlie');
  });

  it('should update selectedUser when updatedUserName input changes', () => {
    component.userList = ['Alice', 'Bob', 'Charlie'];
    fixture.detectChanges();

    // Initially, no user is selected
    expect(component.selectedUser).toBe('');

    // Simulate input change for updatedUserName
    component.updatedUserName = 'Bob';
    component.ngOnChanges({
      updatedUserName: {
        currentValue: 'Bob',
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    fixture.detectChanges();

    // Assert that the selectedUser is updated to 'Bob'
    expect(component.selectedUser).toBe('Bob');

    // Ensure the correct user is highlighted
    const userCards = fixture.debugElement.queryAll(By.css('.user-card'));
    expect(userCards[1].classes['active']).toBeTrue();
    expect(userCards[0].classes['active']).toBeFalsy();
    expect(userCards[2].classes['active']).toBeFalsy();
  });

  it('should apply the "active" class to the selected user', () => {
    component.userList = ['Alice', 'Bob', 'Charlie'];
    fixture.detectChanges();

    const userCards = fixture.debugElement.queryAll(By.css('.user-card'));
    userCards[1].triggerEventHandler('click', null); // Simulate clicking on "Bob"
    fixture.detectChanges();

    expect(userCards[1].classes['active']).toBeTrue();
    expect(userCards[0].classes['active']).toBeFalsy();
    expect(userCards[2].classes['active']).toBeFalsy();
  });

  it('should emit the selected user when a card is clicked', () => {
    spyOn(component.updateSelectedUser, 'emit');
    component.userList = ['Alice', 'Bob', 'Charlie'];
    fixture.detectChanges();

    const userCards = fixture.debugElement.queryAll(By.css('.user-card'));
    userCards[2].triggerEventHandler('click', null); // Simulate clicking on "Charlie"

    expect(component.updateSelectedUser.emit).toHaveBeenCalledWith('Charlie');
  });

  it('should update selectedUser when updateUser is called', () => {
    component.updateUser('Alice');
    expect(component.selectedUser).toBe('Alice');
  });

  it('should handle userList changes via ngOnChanges', () => {
    const changes = {
      userList: {
        currentValue: ['Alice', 'Bob'],
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    };
    component.ngOnChanges(changes);
    expect(component.userList).toEqual(['Alice', 'Bob']);
  });
});
