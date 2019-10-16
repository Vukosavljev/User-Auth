import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() text: string;
  @Input() success: boolean;

  constructor() { }

  ngOnInit() {
  }
  applyClass() {
    return this.success ? 'success' : 'fail';
  }

}
