import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenav, MatDrawer, MatDrawerContainer, RouterModule,
    MatDrawerContent, MatToolbar, MatList, MatNavList, MatListItem, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  @ViewChild('drawer') public drawer!: MatDrawer;

  constructor(private sideBarService: SidebarService) { }

  ngOnInit(): void {
    this.sideBarService.sideNavToggleSubject.subscribe(
      () => {
        this.drawer.toggle(); 
      }
    )
  }

/*   ngAfterViewInit(): void { 
    // Inicialização que depende do drawer 
    this.sideBarService.sideNavToggleSubject.subscribe( () => { 
        if (this.drawer) { 
          this.drawer.toggle(); 
        } else { 
          console.error('Drawer is not initialized'); 
        } 
      } 
    ); 
  } */
}
