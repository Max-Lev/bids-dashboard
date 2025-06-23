import { NgClass, NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SubMenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';
import { MessageService } from 'src/app/shared/providers/message.service';

@Component({
  selector: 'app-sidebar-submenu',
  templateUrl: './sidebar-submenu.component.html',
  styleUrls: ['./sidebar-submenu.component.css'],
  imports: [NgClass, NgFor, NgTemplateOutlet, RouterLinkActive, RouterLink, AngularSvgIconModule],
})
export class SidebarSubmenuComponent implements OnInit, OnChanges {
  @Input() public submenu = <SubMenuItem>{};

  #messageService = inject(MessageService);

  saveBtnState = computed(() => this.#messageService.saveBtnState());

  constructor(public menuService: MenuService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

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

  //This function is used to save data

  saveHandler() {
    this.#messageService.saveState();
    this.#messageService.notifyProductsHandler(true);
    setTimeout(() => {this.#messageService.notifyProductsHandler(false);}, 250);
  }

}
