import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private toast: ToastrService) {}

  handle(error: any) {
    if (Array.isArray(error.error)) {
      error.error.map((e: any) => {
        this.toast.error(`${e.msg} for ${e.path}`, 'Error');
      });
    } else {
      this.toast.error(error.error, 'Error');
    }
  }
}
