import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, TemplateRef } from '@angular/core';
import { MessageService } from '../../providers/message.service';
import { NgTemplateOutlet } from '@angular/common';
@Component({
  selector: 'app-save-state',
  imports: [
    NgTemplateOutlet
  ],
  template: `
  <ng-container
    *ngTemplateOutlet="template; context: { 
      saveBtnState: saveBtnState(), click: saveHandler.bind(this) ,
      settingsBtnState: settingsBtnState(), settingsClick: settingsHandler.bind(this) 
      }">
  </ng-container>
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveStateComponent {
  @Input({ required: true }) template!: TemplateRef<any>;
  #messageService = inject(MessageService);
  saveBtnState = computed(() => this.#messageService.saveBtnState());
  settingsBtnState = computed(() => this.#messageService.saveBtnState());

  constructor(){

  }

  settingsHandler(){
    
  }

  saveHandler() {
    this.#messageService.saveState();
    this.#messageService.notifyProductsHandler(true);
    setTimeout(() => {this.#messageService.notifyProductsHandler(false);}, 250);
  }

}
