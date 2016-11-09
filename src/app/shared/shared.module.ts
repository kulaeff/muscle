import { NgModule, ModuleWithProviders } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { ButtonComponent } from './components/button/button.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { NavigationPaneComponent } from './components/navigation-pane/navigation-pane.component';
import { NavigationPaneItemComponent } from './components/navigation-pane/navigation-pane-item/navigation-pane-item.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { ToolButtonComponent } from './components/tool-button/tool-button.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';

// Directive
import { TooltipDirective } from './components/tooltip/tooltip.directive';

// Pipes
import { NumberPipe } from './pipes/number/number.pipe';
import { PercentPipe } from './pipes/percent/percent.pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        NumberPipe,
        PercentPipe,

        ButtonComponent,
        ListViewComponent,
        NavigationPaneComponent,
        NavigationPaneItemComponent,
        ProgressBarComponent,
        SwitcherComponent,
        ToolButtonComponent,
        TooltipComponent,

        TooltipDirective,
    ],
    exports: [
        NumberPipe,
        PercentPipe,

        ButtonComponent,
        ListViewComponent,
        NavigationPaneComponent,
        NavigationPaneItemComponent,
        ProgressBarComponent,
        SwitcherComponent,
        ToolButtonComponent,
        TooltipComponent,

        TooltipDirective,

        CommonModule,
        FormsModule,
    ],
    entryComponents: [
        TooltipComponent,
    ],
})

export class SharedModule {
}