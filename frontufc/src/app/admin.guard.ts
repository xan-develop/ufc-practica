import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './service/user.service';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserService);
  const router = inject(Router);

  const isAdmin = authService.isAdmin();
  console.log('isAdmin:', isAdmin);

  if (isAdmin) {
    return true;
  } else {
    Swal.fire({
      icon: "info",
      title: "No tienes Permiso",
      text: "No eres Administrador",
    });
    router.navigate(['/home']);
    return false;
  }
};
