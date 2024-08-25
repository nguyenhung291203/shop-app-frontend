import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [NotFoundComponent,AdminComponent],
  imports: [CommonModule, PagesRoutingModule,UserModule],
  exports: [],
})
export class PagesModule {}