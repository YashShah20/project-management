import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-project-tabs',
  templateUrl: './project-tabs.component.html',
  styleUrls: ['./project-tabs.component.scss']
})
export class ProjectTabsComponent {
  @Input() tabsArray: string[] = [];
  @Output() onTabChange = new EventEmitter<number>();
  activatedTab: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  setTab(index:number) {
    this.activatedTab = index;
    debugger;
    this.onTabChange.emit(this.activatedTab);
  }
}
