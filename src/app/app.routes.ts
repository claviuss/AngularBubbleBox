import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/host-moon-phases/host-moon-phases.component').then(m => m.HostMoonPhasesComponent)
    },
    {
        path: 'moon-phase',
        loadComponent: () => import('./components/moon-phase/moon-phase.component').then(m => m.MoonPhaseComponent)
    },
    {
        path: 'registration',
        loadComponent: () => import('./components/registration/registration.component').then(m => m.RegistrationComponent)
    }
];
