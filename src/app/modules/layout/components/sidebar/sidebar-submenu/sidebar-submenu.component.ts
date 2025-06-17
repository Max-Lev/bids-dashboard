import { NgClass, NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, computed, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SubMenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-sidebar-submenu',
  templateUrl: './sidebar-submenu.component.html',
  styleUrls: ['./sidebar-submenu.component.css'],
  imports: [NgClass, NgFor, NgTemplateOutlet, RouterLinkActive, RouterLink, AngularSvgIconModule],
})
export class SidebarSubmenuComponent implements OnInit,OnChanges {
  @Input() public submenu = <SubMenuItem>{};

  constructor(public menuService: MenuService) {

  }

  isNftSaveActive = computed(()=>this.menuService.isNftSaveActive());

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.submenu)
  }

  ngOnInit(): void {}

  public toggleMenu(menu: any) {
    this.menuService.toggleSubMenu(menu);
  }

  private collapse(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = false;
      if (item.children) this.collapse(item.children);
    });
  }
}
