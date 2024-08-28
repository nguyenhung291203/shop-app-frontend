import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, PagesRoutingModule, UserModule, AdminModule,FormsModule],
  exports: [],
})
export class PagesModule {}
