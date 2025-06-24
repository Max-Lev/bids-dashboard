import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, computed, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SubMenuItem } from 'src/app/core/models/menu.model';
import { MessageService } from 'src/app/shared/providers/message.service';

@Component({
  selector: 'div[navbar-submenu]',
  templateUrl: './navbar-submenu.component.html',
  styleUrls: ['./navbar-submenu.component.css'],
  imports: [NgFor, NgTemplateOutlet, RouterLinkActive, RouterLink, NgIf, AngularSvgIconModule],
})
export class NavbarSubmenuComponent implements OnInit {
  @Input() public submenu = <SubMenuItem[]>{};
  @ViewChild('submenuRef') submenuRef: ElementRef<HTMLDivElement> | undefined;

  #messageService = inject(MessageService);
  saveBtnState = computed(() => this.#messageService.saveBtnState());

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    /**
     * check if component is out of the screen
     */
    if (this.submenuRef) {
      const submenu = this.submenuRef.nativeElement.getBoundingClientRect();

      const bounding = document.body.getBoundingClientRect();

      if (submenu.right > bounding.right) {
        const childrenElement = this.submenuRef.nativeElement.parentNode as HTMLElement;
        if (childrenElement) {
          childrenElement.style.left = '-100%';
        }
      }
    }
  }


saveHandler() {
  this.#messageService.saveState();
  this.#messageService.notifyProductsHandler(true);
  setTimeout(() => { this.#messageService.notifyProductsHandler(false); }, 250);
}

}


