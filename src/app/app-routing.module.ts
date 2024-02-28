import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminguardGuard } from './guards/adminguard.guard';
import { normalGuard } from './guards/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
const routes: Routes = [
  // for mapping components with paths

  {
    path:'',
    component:HomeComponent,
    pathMatch:'full',
  },
  {
    
    path:'signup',
    component:SignupComponent,
    pathMatch:'full',
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
  },
  {
    path:'admin',
    component:DashboardComponent,
    // pathMatch:'full',---->removing it for child component
    canActivate:[adminguardGuard],
    // ye admin ke andar ka component bnega...path-->admin/profile
    children:[
      {
        path:'',
        component:WelcomeComponent,
      }
      ,
      {
        // admin comp.ke andar router-outlet use krne se aaega ye
        path:'profile',
        component:ProfileComponent,
      }
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    pathMatch:'full',
    canActivate:[normalGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
