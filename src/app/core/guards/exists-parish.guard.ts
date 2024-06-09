import { CanActivateFn } from '@angular/router';

export const existsParishGuard: CanActivateFn = (route, state) => {
  return true;
};
