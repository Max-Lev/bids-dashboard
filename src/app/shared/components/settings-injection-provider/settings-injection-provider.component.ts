import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-settings-injection-provider',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  template: `
    <ng-container
      *ngTemplateOutlet="
        template;
        context: {
          
          click: settingsHandler.bind(this)
        }
      ">
    </ng-container>
  `,
  // settingsBtnState: settingsBtnState(),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsInjectionProviderComponent {

  @Input({ required: true }) template!: TemplateRef<any>;

  settingsBtnState(){
    console.log('settingsBtnState handler');
    return true;
  }

  settingsHandler(){
    console.log('settingsHandler handler');
  }


}
