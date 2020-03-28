import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate: [TutorialGuard]
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [TutorialGuard]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [TutorialGuard]
  },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule',canActivate: [TutorialGuard] },
  { path: 'live-payload', loadChildren: './live-payload/live-payload.module#LivePayloadPageModule', canActivate: [TutorialGuard] },
  { path: 'actions', loadChildren: './actions/actions.module#ActionsPageModule' },
  { path: 'payload-mac', loadChildren: './payload-mac/payload-mac.module#PayloadMacPageModule' },
  { path: 'payload-linux', loadChildren: './payload-linux/payload-linux.module#PayloadLinuxPageModule' },
  { path: 'payload-windows', loadChildren: './payload-windows/payload-windows.module#PayloadWindowsPageModule' },
  { path: 'payload-bios', loadChildren: './payload-bios/payload-bios.module#PayloadBiosPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' },
  { path: 'exfiltration', loadChildren: './exfiltration/exfiltration.module#ExfiltrationPageModule' },
  { path: 'exfiltrated-data', loadChildren: './exfiltrated-data/exfiltrated-data.module#ExfiltratedDataPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
