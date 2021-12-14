import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReportComponent } from './add-report/add-report.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: '', children:[{ path: '', component: SearchComponent}]},
  {path: "search", component: SearchComponent},
  {path: "add-report", component: AddReportComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
