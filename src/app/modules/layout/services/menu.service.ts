import { computed, effect, Injectable, OnDestroy, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/core/constants/menu';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService implements OnDestroy {
  private _showSidebarState = JSON.parse(localStorage.getItem('showSidebar') || 'false');
  private _showSidebar = signal(this._showSidebarState);
  private _showMobileMenu = signal(false);
  private _pagesMenu = signal<MenuItem[]>([]);
  private _subscription = new Subscription();


  constructor(private router: Router) {

    /** Set dynamic menu */
    // this._pagesMenu.set(Menu.pages);
    // const filtered: MenuItem[] = Menu.pages
    // .map(group => {
    //   const filteredItems: SubMenuItem[] = group.items
    //     .filter(item => item.route === '/dashboard') // Only allow dashboard
    //     .map(item => ({
    //       ...item,
    //       children: item.children?.filter(child => child.route === '/dashboard/nfts') // optional
    //     })) as SubMenuItem[]; // ✅ Cast since we're filtering correctly
  
    //   if (filteredItems.length > 0) {
    //     return {
    //       ...group,
    //       items: filteredItems
    //     };
    //   }
  
    //   return null;
    // })
    // .filter((group): group is MenuItem => group !== null); // ✅ valid now
    // this._pagesMenu.set(filtered);
    this._pagesMenu.set(
      Menu.pages.map(group => ({
        ...group,
        items: group.items.map(item => {
          const isDashboard = item.route === '/dashboard';
          const updatedChildren = item.children?.map(child => ({
            ...child,
            disabled: !isDashboard && child.route !== '/dashboard/nfts', // disable non-dashboard children
          }));
    
          return {
            ...item,
            disabled: !isDashboard, // disable everything except dashboard
            children: updatedChildren,
          };
        }),
      }))
    );
    

    let sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        /** Expand menu base on active route */
        this._pagesMenu().forEach((menu) => {
          let activeGroup = false;
          menu.items.forEach((subMenu) => {
            const active = this.isActive(subMenu.route);
            subMenu.expanded = active;
            subMenu.active = active;
            if (active) activeGroup = true;
            if (subMenu.children) {
              this.expand(subMenu.children);
            }
          });
          menu.active = activeGroup;
        });
      }
    });
    this._subscription.add(sub);
  }

  get showSideBar() {
    return this._showSidebar();
  }
  get showMobileMenu() {
    return this._showMobileMenu();
  }
  get pagesMenu() {
    return this._pagesMenu();
  }

  set showSideBar(value: boolean) {
    this._showSidebar.set(value);
  }
  set showMobileMenu(value: boolean) {
    this._showMobileMenu.set(value);
  }

  public toggleSidebar() {
    this._showSidebar.set(!this._showSidebar());
    localStorage.setItem('showSidebar', JSON.stringify(this._showSidebar()));
  }

  public toggleMenu(menu: any) {
    this.showSideBar = true;
    menu.expanded = !menu.expanded;
  }

  public toggleSubMenu(submenu: SubMenuItem) {
    submenu.expanded = !submenu.expanded;
  }

  private expand(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = this.isActive(item.route);
      if (item.children) this.expand(item.children);
    });
  }

  public isActive(instruction: any): boolean {
    return this.router.isActive(this.router.createUrlTree([instruction]), {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
// import { computed, effect, Injectable, OnDestroy, signal } from '@angular/core';
// import { NavigationEnd, Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { Menu } from 'src/app/core/constants/menu';
// import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class MenuService implements OnDestroy {
//   private _showSidebarState = JSON.parse(localStorage.getItem('showSidebar') || 'false');
//   private _showSidebar = signal(this._showSidebarState);
//   private _showMobileMenu = signal(false);
//   private _pagesMenu = signal<MenuItem[]>([]);
//   private _subscription = new Subscription();


//   constructor(private router: Router) {

//     /** Set dynamic menu */
//     this._pagesMenu.set(Menu.pages);
//     let sub = this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         /** Expand menu base on active route */
//         this._pagesMenu().forEach((menu) => {
//           let activeGroup = false;
//           menu.items.forEach((subMenu) => {
//             const active = this.isActive(subMenu.route);
//             subMenu.expanded = active;
//             subMenu.active = active;
//             if (active) activeGroup = true;
//             if (subMenu.children) {
//               this.expand(subMenu.children);
//             }
//           });
//           menu.active = activeGroup;
//         });
//       }
//     });
//     this._subscription.add(sub);
//   }

//   get showSideBar() {
//     return this._showSidebar();
//   }
//   get showMobileMenu() {
//     return this._showMobileMenu();
//   }
//   get pagesMenu() {
//     return this._pagesMenu();
//   }

//   set showSideBar(value: boolean) {
//     this._showSidebar.set(value);
//   }
//   set showMobileMenu(value: boolean) {
//     this._showMobileMenu.set(value);
//   }

//   public toggleSidebar() {
//     this._showSidebar.set(!this._showSidebar());
//     localStorage.setItem('showSidebar', JSON.stringify(this._showSidebar()));
//   }

//   public toggleMenu(menu: any) {
//     this.showSideBar = true;
//     menu.expanded = !menu.expanded;
//   }

//   public toggleSubMenu(submenu: SubMenuItem) {
//     submenu.expanded = !submenu.expanded;
//   }

//   private expand(items: Array<any>) {
//     items.forEach((item) => {
//       item.expanded = this.isActive(item.route);
//       if (item.children) this.expand(item.children);
//     });
//   }

//   public isActive(instruction: any): boolean {
//     return this.router.isActive(this.router.createUrlTree([instruction]), {
//       paths: 'subset',
//       queryParams: 'subset',
//       fragment: 'ignored',
//       matrixParams: 'ignored',
//     });
//   }

//   ngOnDestroy(): void {
//     this._subscription.unsubscribe();
//   }
// }
