import { Component, ChangeDetectorRef } from '@angular/core';
import { ConnectivityService } from './services/connectivity.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  

  isConnected: boolean = true;
  previousState!: boolean;

  constructor(
    private connectivityService: ConnectivityService,
    private changeDetector: ChangeDetectorRef,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.connectivityService.isConnected$.subscribe((result) => {
      this.isConnected = result;
      this.changeDetector.detectChanges();
      if(!this.isConnected) {
        this.toast.error('INTERNET NOT CONNECTED', 'Warning!', { tapToDismiss: true, timeOut: 500})
      } else
        {
          // this.toast.clear()
        }
    });
  }
}
