import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';


@Component({
    selector: 'app-rating-stars',
    templateUrl: './rating-stars.component.html',
    styleUrls: ['./rating-stars.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RatingStarsComponent), multi: true },
    ]
})
export class RatingStarsComponent implements OnInit, ControlValueAccessor {

    @Input() label: string = '';

    @Input() iconClass: string = 'star-icon';

    @Input() fullIcon: string = '★';

    @Input() emptyIcon: string = '★';

    @Input() readonly: boolean;

    @Input() disabled: boolean;

    @Input() required: boolean;

    @Input() float: boolean;

    @Input() titles: string[] = [];

    @Input() value: number = 0;

    @Input() fc?: FormControl;


    @Input()
    set max(max: number) {
        this._max = max;
        this.buildRanges();
    }

    get max() {
        return this._max;
    }

    // tslint:disable-next-line:no-output-on-prefix
    @Output()
    onHover = new EventEmitter();

    // tslint:disable-next-line:no-output-on-prefix
    @Output()
    onLeave = new EventEmitter();

    // tslint:disable-next-line:no-output-on-prefix
    @Output()
    onClick = new EventEmitter();

    public model: number;
    public ratingRange: number[];
    private hovered: number = 0;
    private hoveredPercent: number = undefined;
    public newHoverValue: number = 0;

    private _max: number = 5;


    public writeValue = (value: any) => {
        this.model = value;
    }

    public onTouched = (value: any) => { };

    public onChange = (value: any) => { };

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    ngOnInit() {
        if (this.value) {
            this.model = this.value;
        }
        this.buildRanges();
    }

    calculateWidth(item: number) {
        if (this.hovered > 0) {
            if (this.hoveredPercent !== undefined && this.hovered === item) {
                return this.hoveredPercent;
            }

            return this.hovered >= item ? 100 : 0;
        }
        return this.model >= item ? 100 : 100 - Math.round((item - this.model) * 10) * 10;
    }

    setHovered(hovered: number): void {
        if (!this.readonly && !this.disabled) {
            this.hovered = hovered;
        }
    }

    changeHovered(event: MouseEvent): void {
        if (!this.float) { return; }
        const target = event.target as HTMLElement;
        const relativeX = event.pageX - target.offsetLeft;
        const percent = Math.round((relativeX * 100 / target.offsetWidth) / 10) * 10;
        this.hoveredPercent = percent > 50 ? 100 : 50;
        if (this.readonly) {
            this.newHoverValue = this.model;
        } else {
            this.newHoverValue = this.hoveredPercent ? (this.hovered - 1) + this.hoveredPercent / 100 : this.hovered;
        }
    }

    resetHovered() {
        this.hovered = 0;
        this.hoveredPercent = undefined;
    }


    rate(value: number) {
        if (!this.readonly && !this.disabled && value >= 0 && value <= this.ratingRange.length) {
            const newValue = this.hoveredPercent ? (value - 1) + this.hoveredPercent / 100 : value;
            this.onClick.emit(newValue);
            this.model = newValue;
        }
    }

    private buildRanges() {
        this.ratingRange = this.range(1, this.max);
    }

    private range(start: number, end: number) {
        const ratingStar: number[] = [];
        for (let i = start; i <= end; i++) {
            ratingStar.push(i);
        }
        return ratingStar;
    }
}
