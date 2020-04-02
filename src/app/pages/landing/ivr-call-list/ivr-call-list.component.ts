import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NType, NumberList } from 'src/app/models/number-list.model';
import { NumberListService } from 'src/app/services/number-list.service';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'ivr-call-list',
  templateUrl: './ivr-call-list.component.html',
  styleUrls: ['./ivr-call-list.component.scss']
})
export class IvrCallListComponent implements OnInit {
  typeForm: FormGroup;
  headElements = ['Number', 'Address', 'Capabilities', 'Action'];
  typeOptions: NType[] = [
    {
      name: 'Local',
      value: 'local'
    },
    {
      name: 'Toll Free',
      value: 'toll-free'
    },
    {
      name: 'Mobile',
      value: 'mobile'
    }
  ];
  numberLists: NumberList[];
  selectSubmitted:boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _numberListService: NumberListService
  ) { }

  ngOnInit() {
    this.typeForm = this._formBuilder.group({
      type: [this.typeOptions[0].value, Validators.required],
      searchNumber: [''],
    });
  }

  get s() { return this.typeForm.controls; }

  onTypeSearchSubmit(): void {
    this.selectSubmitted = true;
    if (this.typeForm.valid) {
      this.numberLists = [];
      this._numberListService.getNumbersByType(this.typeForm.controls['type'].value)
        .subscribe(resNumberListRes => {
          if (resNumberListRes.respType == 'Success') {
            for (const numberList of resNumberListRes.data) {
              this.numberLists.push(new NumberList(numberList));
            }
          }

          console.log('this.numberLists :: ', this.numberLists);
        }, error => {
          console.log('error : ', error);
        });
    }
  }

  onPurchaseNumber(numberList: NumberList) {

    const Data = {  //post params purchase Number API
      type: this.typeForm.controls['type'].value,
      phoneNumber: '9574883585', //numberList.phoneNumber
      addressRequirements: numberList.addressRequirements,
      isoCountry: numberList.isoCountry,
      region: numberList.region,
    }

    this._numberListService.postPurchaseNumber(Data)
      .subscribe(res => {
        console.log('res :: ', res);
      }, error => {
        console.log('error : ', error);
      });

  }
}
