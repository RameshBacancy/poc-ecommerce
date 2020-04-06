import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Category } from 'src/app/models/category.model';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NumberValidator } from 'src/app/core/custom-validators/number.validator';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {

  name = '';
  productForm: FormGroup;
  productId: string;
  selectedFile: File = null;
  // fb;
  selectForm;
  demoForm: FormGroup;
  downloadURL: Observable<string>;
  numberErrorMessage: string = 'Please enter product price';
  //single product
  singleP: Product = {
    productCategory: '',
    productDeliveryType: '',
    productDetail: '',
    productImageUrl: '',
    productImage: '',
    productLink: '',
    productPrice: 0,
    productSiteLink: '',
    productSiteName: '',
    productAffiliateLink: '',
    productTitle: ''
  };
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  categories: Category[] = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: AngularFireStorage,
    private spinnerService: SpinnerService,
    private alertService: AlertService
  ) {
  }


  ngOnInit() {
    // paramId for edit product come form route
    this.activatedRoute.paramMap.subscribe(param => {
      this.productId = param.get('id');
      if (this.productId) {
        if (this.productService.singleProduct.productTitle !== '') {
          this.singleP = this.productService.singleProduct;
        } else {
          this.router.navigate(['', 'admin', 'dashboard', 'products']);
        }
      }
      // this.loadProductForm();
      this.loadCategory();
    });
  }

  /** Start: load all category for product category */
  loadCategory() {
    this.spinnerService.openSpinner();
    this.categoryService.getCategory().subscribe((res: any) => {
      this.categories = res;
      this.categories.forEach(category => {
        category.value = category.name;
      });
      this.loadProductForm();
      this.spinnerService.closeSpinner();
    }, err => this.errorHandel(err));
  }
  /** End: loadCategory */

  /** Start: load product form */
  loadProductForm() {
    this.productForm = new FormGroup({
      productCategory: new FormControl(this.singleP.productCategory, Validators.required),
      productTitle: new FormControl(this.singleP.productTitle, Validators.required),
      productDetail: new FormControl(this.singleP.productDetail, Validators.required),
      productImageUrl: new FormControl(this.singleP.productImageUrl),
      productImage: new FormControl(this.singleP.productImage, Validators.required),
      productLink: new FormControl(this.singleP.productLink, Validators.required),
      productPrice: new FormControl(this.singleP.productPrice, [Validators.required, NumberValidator]),
      productDeliveryType: new FormControl(this.singleP.productDeliveryType, Validators.required),
      productSiteName: new FormControl(this.singleP.productSiteName, Validators.required),
      productSiteLink: new FormControl(this.singleP.productSiteLink, Validators.required),
      productAffiliateLink: new FormControl(this.singleP.productAffiliateLink, Validators.required),
    });
  }
  /** End: loadProductForm */

  /** Start: when productForm Submit for store data in database and delete if productId and if image change*/
  onProductSubmit() {
    this.spinnerService.openSpinner();
    if (this.productId) {
      // if productId and image file is change then first delete from storage old image then afterupload new image
      if (this.selectedFile) {
        this.productService.deleteImage(this.singleP.productImageUrl)
          .then(res => {
            this.productForm.controls['productImageUrl'].setValue('');
            this.uploadImage();
          }).catch(err => this.errorHandel(err));
      } else {
        this.saveDate();
      }
    } else {
      this.uploadImage();
    }
  }
  /** End: onProductSubmit */

  /** Start: when photo select */
  onPhotoSelected(e) {
    this.selectedFile = e.target.files[0];
    this.productForm.controls['productImage'].setValue(this.selectedFile.name);
  }
  /** End: onPhotoSelected */


  /** Start: upload image in firebase storage */
  uploadImage() {
    if (this.selectedFile) {
      this.productService.imageUpload(this.selectedFile)
        .subscribe(url => {
          if (url.bytesTransferred == url.totalBytes) {
            const fileRef = this.storage.ref(`ProductImages/${this.productService.imageCreatedDate}`);
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                this.productForm.controls['productImageUrl'].setValue(url);
                this.productService.removeDate();
                this.saveDate();
              }
            });
          }
        }, err => this.errorHandel(err));
    }
  }
  /** End: uploadImage */

  /** Start: When all data and file upload is success full then after all data store in firebase database */
  saveDate() {
    if (this.productId) {
      this.productService.editProduct(this.productId, this.productForm.value).subscribe(res => {
        this.spinnerService.closeSpinner();
        this.router.navigate(['', 'admin', 'dashboard', 'products']);

        this.productForm.reset();
        this.productService.removeSingleProduct();
      }, err => this.errorHandel(err));
    } else {
      this.productService.addProduct(this.productForm.value).subscribe(res => {
        this.spinnerService.closeSpinner();
        this.router.navigate(['', 'admin', 'dashboard', 'products']);
        this.productForm.reset();
        this.selectedFile = null;
      }, err => this.errorHandel(err));
    }
  }
  /** End: saveData */

  /** start: handel error from server side */
  errorHandel(err) {
    this.spinnerService.closeSpinner();
    this.alertService.pushError("Error: Something wrong");
  }
  /** close: errorHandel */
}