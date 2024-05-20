import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './service/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserService);
  const router = inject(Router);

  const isAdmin = authService.isAdmin();
  console.log('isAdmin:', isAdmin);

  if (isAdmin) {
    return true;
  } else {
    alert('No eres admin');
    router.navigate(['/home']);
    return false;
  }
};
