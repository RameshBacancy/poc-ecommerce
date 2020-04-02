import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-guide-test',
  templateUrl: './guide-test.component.html',
  styleUrls: ['./guide-test.component.scss']
})
export class GuideTestComponent implements OnInit {
  public textareaForm: FormGroup;
  public sliderForm: FormGroup;
  public selectForm: FormGroup;
  public dateBasicForm: FormGroup;

  submitted = false; // form submitted or not
  selectSubmitted = false;
  selectOptions: any[]; // dropwown options
  selectedOptions: any; // selected option from dropdown

  sliderMin = 20; // range slider minimum value
  sliderMax = 50; // range slider maximum value

  sliderValue: any; // single slider selected value
  rangeValue: any;  // range slider selected value

  sliderOptions: {}; // options for slider display
  rangeOptions: {}; // options for range slider display

  ratingValue: number = 5; // used to display the rating value
  ratingReadValue: number = 3.5;

  public vehicleModalOpen: boolean = false;

  public rating = new FormGroup({
    rate: new FormControl(5, [Validators.required])
  });

  public ratingReadOnly = new FormGroup({
    rateReadOnly: new FormControl(3.5, [Validators.required])
  });

  public stapperForm = new FormGroup({
    val: new FormControl(5, [Validators.required])
  });

  public stapperFormWithMax = new FormGroup({
    val: new FormControl(null, [Validators.required])
  });

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // Start textara form group build
    this.textareaForm = this.fb.group({
      firstName: ['', Validators.required],
      lastname: ['', Validators.required],
      generic: ['']
    });

    // End textara form group build

    // Start slider form group build
    this.sliderForm = this.fb.group({
      singleSlider: [],
      rangeSlider: []
    });
    // End slider form group build

    // Start select form group build
    this.selectForm = this.fb.group({
      select: ['', Validators.required],
      select2: ['', Validators.required]
    });

    // Start Date Basic form group
    this.dateBasicForm = this.fb.group({
      date: new Date(2019, 5, 21)
    });

    // start Select dropdown Array value
    this.selectOptions = [
      {
        name: 'One',
        value: 1
      },
      {
        name: 'Two',
        value: 2
      },
      {
        name: 'Three',
        value: 3
      },
      {
        name: 'Four',
        value: 4
      },
      {
        name: 'Five',
        value: 5
      }
    ];
    // End Select dropdown Array value

    // Start slider options value
    this.sliderOptions = {
      step: 5,
      showTicks: true,
      ceil: 30
    };
    this.rangeOptions = {
      floor: 0,
      ceil: 100,
    };
    // End slider options value

  }

  get f() { return this.textareaForm.controls; }

  get s() { return this.selectForm.controls; }

  // Start textarea form control validation while submit form
  public onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.textareaForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.textareaForm.value));
  }
  // End textarea form control validation while submit form

  // Start Select dropdown Emitted selected options value
  public onSelectOption(val) {
    this.selectedOptions = val.value;
  }
  // End Select dropdown Emitted selected options value

  // Single Slider change value
  public onSliderChange(value) {
    this.sliderValue = value;
  }

  // Range slider change value
  public onRangeChange(value) {
    this.rangeValue = value;
  }

  // slider form submit
  public onSliderSubmit() {
    if (this.sliderForm.valid) {
      alert('Form data:' + JSON.stringify(this.sliderForm.value));
    }
  }

  public modalOpen() {
    this.vehicleModalOpen = true;
  }

  public onSelectSubmit() {
    this.selectSubmitted = true;
    if (this.selectForm.invalid) {
      return;
    }
    console.log(this.selectForm.value);
  }


  hoveringOver(val) {
    // this.ratingValue = val;
  }

  clickingOver(val) {
    this.ratingValue = val;
  }

  clickingReadOnlyOver(val) {
    this.ratingReadValue = val;
  }

  stepperValue(fval) {
    // console.log(fval);
  }

  OpenSuccessAlert() {
    this.alertService.pushSuccess('This is Success Message');
  }

  OpenWarningAlert() {
    this.alertService.pushWarning('This is Warning Message');
  }

  OpenDangerAlert() {
    this.alertService.pushError('This is Danger Message');
  }

}
