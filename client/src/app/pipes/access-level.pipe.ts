import { Pipe, PipeTransform } from '@angular/core';
import { USER_ACCESS_LEVEL } from '../utils';

@Pipe({
  name: 'accessLevel',
})
export class AccessLevelPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return USER_ACCESS_LEVEL.find((status) => status.value === value)?.title;
  }
}
