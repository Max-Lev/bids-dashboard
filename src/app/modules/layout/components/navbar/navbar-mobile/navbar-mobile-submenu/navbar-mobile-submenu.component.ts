import { NgClass, NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SubMenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from 'src/app/modules/layout/services/menu.service';
import { MessageService } from 'src/app/shared/providers/message.service';

@Component({
  selector: 'app-navbar-mobile-submenu',
  templateUrl: './navbar-mobile-submenu.component.html',
  styleUrls: ['./navbar-mobile-submenu.component.css'],
  imports: [NgClass, NgFor, NgTemplateOutlet, RouterLinkActive, RouterLink, AngularSvgIconModule],
})
export class NavbarMobileSubmenuComponent implements OnInit {
  @Input() public submenu = <SubMenuItem>{};

  #messageService = inject(MessageService);
  saveBtnState = computed(() => this.#messageService.saveBtnState());

  constructor(public menuService: MenuService) { }

  ngOnInit(): void { }

  public toggleMenu(menu: any) {
    this.menuService.toggleSubMenu(menu);
  }

  private collapse(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = false;
      if (item.children) this.collapse(item.children);
    });
  }

  public closeMobileMenu() {
    this.menuService.showMobileMenu = false;
  }
  
  saveHandler() {
    this.#messageService.saveState();
    this.#messageService.notifyProductsHandler(true);
    setTimeout(() => { this.#messageService.notifyProductsHandler(false); }, 250);
  }
}
