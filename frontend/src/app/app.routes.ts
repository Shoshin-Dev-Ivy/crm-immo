import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard';
import { LoginComponent } from './pages/login/login';
import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';
import { ShellComponent } from './layout/shell/shell';

export const routes: Routes = [

  {
    path: '',
    component: ShellComponent,
    children: [

      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: ['ROLE_ADMIN']
        }
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }

    ]
  },

  {
    path: 'login',
    component: LoginComponent
  }

];