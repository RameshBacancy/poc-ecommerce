import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss']
})
export class ModalPopupComponent {
  @Input('header') header = 'Default header';
  @Input('contentBody') contentBody = 'Default body';
  @Output('modalResult') modalResult = new EventEmitter();
  
  closeResult: string;
  @ViewChild('content', { static: true }) content: ElementRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.modalService.open(this.content);
  }
 
  result(r: boolean) {
    this.modalResult.emit(r);
  }

}
