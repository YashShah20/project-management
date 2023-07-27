import { Pipe, PipeTransform } from '@angular/core';
import { PROJECT_STATUS } from '../utils';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: unknown): unknown {
    return PROJECT_STATUS.find((status) => status.id === value)?.title;
  }
}
