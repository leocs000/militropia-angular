import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderAdminComponent } from "../header-adm/header-admin/header-admin.component";

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [SidebarComponent, FooterComponent, HeaderAdminComponent],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {

}
