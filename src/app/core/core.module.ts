import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputBasicComponent } from './input-basic/input-basic.component';
import { CheckboxBasicComponent } from './checkbox-basic/checkbox-basic.component';
import { TextariaBasicComponent } from './textaria-basic/textaria-basic.component';
import { SelectBasicComponent } from './select-basic/select-basic.component';
import { SearchStringPipe } from './pipe/search-string.pipe';
import { SliderBasicComponent } from './slider-basic/slider-basic.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ClickOutsideDirective } from './directive/click-outside.directive';
import { RangeSliderBasicComponent } from './range-slider-basic/range-slider-basic.component';
import { CheckboxMultipleComponent } from './checkbox-multiple/checkbox-multiple.component';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    InputBasicComponent,
    CheckboxBasicComponent,
    TextariaBasicComponent,
    SelectBasicComponent,
    SearchStringPipe,
    SliderBasicComponent,
    ClickOutsideDirective,
    RangeSliderBasicComponent,
    CheckboxMultipleComponent,
    RatingStarsComponent,
    ProgressBarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng5SliderModule,
    AngularFontAwesomeModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InputBasicComponent,
    CheckboxBasicComponent,
    TextariaBasicComponent,
    SelectBasicComponent,
    SearchStringPipe,
    SliderBasicComponent,
    RangeSliderBasicComponent,
    ClickOutsideDirective,
    CheckboxMultipleComponent,
    RatingStarsComponent,
    ProgressBarComponent,
    AngularFontAwesomeModule
  ],
  providers: [ ]
})
export class CoreModule { }
