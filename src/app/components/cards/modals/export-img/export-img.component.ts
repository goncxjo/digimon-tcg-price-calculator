import { AfterContentInit, Component, ElementRef, OnInit, Renderer2, ViewChild, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import download from 'downloadjs';
import html2canvas from 'html2canvas';
import { Card, Dolar } from '../../../../backend';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrencySelectComponent } from '../../../../shared/currency-select/currency-select.component';
import { YesNoSelectComponent } from '../../../../shared/yes-no-select/yes-no-select.component';
import { DolarDataService } from '../../../../core/services/dolar.data.service';
import { DataService } from '../../../../core/services/data.service';
import { faCopy, faDownload, faSearchMinus, faSearchPlus, faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-export-img',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, ReactiveFormsModule, CurrencyPipe, DatePipe, FontAwesomeModule, CurrencySelectComponent, YesNoSelectComponent],
  templateUrl: './export-img.component.html',
  styleUrls: ['./export-img.component.scss']
})
export class ExportImgComponent implements OnInit, AfterContentInit {

  searchMinusIcon = faSearchMinus;
  searchPlusIcon = faSearchPlus;
  downloadIcon = faDownload;
  copyIcon = faCopy;
  syncIcon = faSync;

  @ViewChild('content') content!: ElementRef;

  form = this.buildForm();

  cards = computed(() => this.dataService.cards());
  actualDate: Date = new Date();

  getPrecioTotal() {
    return this.dataService.totals()
  }

  getPrecioTotalUSD() {
    return Math.round(this.dataService.totals() / this.dolarService.venta * 100) / 100;
  }
  
  colExport: number = 3;
  cardHeight: string = `calc(88px * ${this.colExport})`;
  cardWidth: string = `calc(64px * ${this.colExport})`;
  
  descargandoFoto: boolean = false;
  capturarFoto: boolean = false;

  dolarService = inject(DolarDataService);
  dataService = inject(DataService);

  constructor(
    private modalService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
  ) { }
  
  ngOnInit(): void {
    this.cards().forEach(card => {
      if (!card.image_base64) {
        this.getBase64ImageFromUrl(card.image_url)
        .then(result => {
          card.image_base64 = result as Blob
        })
        .catch(err => console.error(err)); 
      }
    }); 
  }

  ngAfterContentInit(): void {
    this.form.get('currency')?.setValue('ARS');
    this.form.get('showCurrency')?.setValue(true);
  }

  get formFields() {
    return this.form.controls;
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      currency: [''],
      showCurrency: ['']
    });
  }


  dismiss(reason?: string) {
    this.modalService.dismiss(reason)
  }

  close(response: string): void {
    this.descargandoFoto = false;
    this.capturarFoto = false;
    this.modalService.close(response)
  }

  getPrecio(c: Card) {
    var price = c.price.currency_value;
    if (this.selectedCurrency == 'ARS') {
      return price;
    }
    return this.getPrecioUSD(price);
  }

  getPrecioUSD(price: number) {
    return Math.round(price / this.dolarService.venta * 100) / 100;
  }

  zoom(i: number){
    this.colExport += i;
    this.cardHeight = `calc(88px * ${this.colExport})`;
    this.cardWidth = `calc(64px * ${this.colExport})`;
  }

  get mostrarPrecios() {
    return this.form.get('showCurrency')?.value;
  }

  get selectedCurrency() {
    return this.form.get('currency')?.value;
  }

  async download() {
    this.descargandoFoto = true;
    setTimeout(() => {
      this.handleExport();
      this.downloadImg();
      this.close('download');        
    }, 100);
  }

  async screenshot() {
    this.capturarFoto = true;
    setTimeout(() => {
      this.handleExport();
      this.copyImgToClipboard();
      this.close('screenshot');
    }, 100);
  }

  handleExport() {
    const elements2Hide: Array<Element> = this.content.nativeElement.querySelectorAll(`.screenshot-hide`);
    elements2Hide.forEach(element => {
      this.renderer.setStyle(element, 'display', 'none');
    });

    const elements2Show: Array<Element> = this.content.nativeElement.querySelectorAll(`.screenshot-show`);
    elements2Show.forEach(element => {
      this.renderer.removeClass(element, 'd-none');
    });
  } 

  private async downloadImg() {
    html2canvas(this.content.nativeElement).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      download(imageData, `digi-calcu_${new Date().toISOString()}.png`);
    });
  }

  private async copyImgToClipboard() {
    html2canvas(this.content.nativeElement).then((canvas) => {
      canvas.toBlob((blob) => {
        const dataType = "image/png";
        if (blob) {
          const data = [new ClipboardItem({ [dataType]: blob })];
          navigator.clipboard.write(data);
        }  
      });
    });
  }

  share(type: string, data: string) {
    switch (type) {
      case 'wsp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(data)}`, '_blank');
        break;
      default:
        break
    }
  }

  async getBase64ImageFromUrl(imageUrl: string) {
    var url = imageUrl.replace('https://product-images.tcgplayer.com', 'tcgplayer-images');
    var res = await fetch(url);
    var blob = await res.blob();
  
    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);
  
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }
}