import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: unknown): unknown {
    switch (value) {
      case 1:
        return "Created"
        break;
      
        case 2:
          return "In progeress"
          break;
      
        case 3:
          return "kuchh bhi"
          break;
      
        case 4:
          return "Completed"
          break;

        case 5:
          return "Delayed"
          break;
    
      default:
        return "unknown"
        break;
    }
  }

}
