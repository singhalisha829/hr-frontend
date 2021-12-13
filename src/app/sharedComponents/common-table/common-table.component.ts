import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-common-table',
  template: `
  <div class="table-responsive-sm">
  <table style="overflow:auto;" [ngStyle]="{'height.px' : (tableHeight), 'min-height.px' : (!rows || rows.length === 0 ? 110 : 100)}" (window:resize)="onResize($event)" class="table table-bordered table-hover table-striped1">
  <thead id="header" class="sticky-top"  style="">
    <tr>
      <ng-container *ngFor="let h of headers; index as headerIndex; trackBy:headerIdentify">
      <th [ngStyle]="{'width.px': (h.width ? h.width : '120'), 'font-weight': 'bold'}" class="tableHeader" (click)="onSort(h)" scope="col">{{h.headerName}}
      <i *ngIf="!h?.requireMenu && h?.clicked && !h.ascending" class="fa fa-arrow-up" aria-hidden="true"></i>
      <i *ngIf="!h?.requireMenu && h?.clicked && h.ascending" class="fa fa-arrow-down" aria-hidden="true"></i>
      </th>
      </ng-container>
    </tr>
  </thead>
  <tbody id="body">
    <tr *ngIf="!rows || rows.length === 0 " style="width:99.1%;text-align:center; margin:10px">
    No rows to show.
    </tr>
    <ng-container *ngIf="rows && rows.length > 0 " >
    <tr class="tableRow" (contextmenu)="openInNewTab(r)" (click)="clickedOnRow(r);" *ngFor="let r of rows; index as rowIndex; trackBy:rowIdentify">
      <td [ngStyle]="{'width.px': (h.width ? h.width: '120')}" *ngFor="let h of headers; index as headerIndex; trackBy:headerIdentify">
      <ng-container *ngIf="h.requireMenu;" >
      <app-dropdown
        [actionDDArr]="h.actionArr"
        [isAgGrid]="true"
        [currentIndex]="rowIndex">
      </app-dropdown>
      </ng-container>
      <ng-container *ngIf="h.requireButton;" >
        <button class="btn btn btn-primary">
          +{{h.buttonName}}
        </button>
      </ng-container>
      <ng-container *ngIf="!h.requireButton && !h.requireMenu && h.type !== 'number' && !h.showDropdown && h.type !== 'text' && h.type !== 'date'" >
      {{ h.date ? ((r[h.field] * 1000) | date: 'dd-MM-yyyy') : (r[h.field])}}
      </ng-container>
      <ng-container *ngIf="h.type === 'number' && h.subType !== 'float'">
      <input (keypress)="numberOnly($event)" style="width:100%" [(ngModel)]="r[h.field]" (change)="h.func({index: rowIndex, rowObj: r})" [disabled]="!h.isEditable" type="text" [name]="('name' + rowIndex)">
      </ng-container>
      <ng-container *ngIf="h.type === 'text'">
      <input style="width:100%" (change)="h.func({index: rowIndex, rowObj: r})" [disabled]="!h.isEditable" type="text" [name]="('name' + rowIndex)" [(ngModel)]="r[h.field]">
      </ng-container>
      
      <ng-container *ngIf="h.type === 'file'">
      <input style="width:100%" (change)="h.func({index: rowIndex, rowObj: r})" [disabled]="!h.isEditable" type="file" [name]="('name' + rowIndex)" [(ngModel)]="r[h.field]">
      </ng-container>
      <ng-container *ngIf="h.type === 'date'">
      <input style="width:100%" (change)="h.func({index: rowIndex, rowObj: r})" [disabled]="!h.isEditable" type="date" [name]="('name' + rowIndex)" [(ngModel)]="r[h.field]">
      </ng-container>
      <ng-container *ngIf="h.type === 'number' && h.subType === 'float'">
      <input style="width:100%" (change)="h.func({index: rowIndex, rowObj: r})" [disabled]="!h.isEditable" type="number" step="0.01" [name]="('name' + rowIndex)" [(ngModel)]="r[h.field]">
      </ng-container>
      <ng-container *ngIf="h.field === 'deleteBTN'" >
      <button style="margin: 0px;height: 35px;" type="button" class="btn btn-danger clearBtn" (click)="deleteRow(rowIndex); h.func({index: rowIndex, rowObj: r});" >
                      <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
      </ng-container>
      <ng-container *ngIf="h.field === 'editBTN'" >
      <button style="margin: 0px;height: 35px;" type="button" class="btn btn-dark editBtn" (click)="editRow(rowIndex); h.func({index: rowIndex, rowObj: r});" >
                      <i class="fa fa-edit" aria-hidden="true"></i>
      </button>
      </ng-container>
      <ng-container *ngIf="h.field === 'checkstatus'" >
      <button style="margin: 0px;height: 35px;" type="button" class="btn btn-sucesses" (click)=" h.func({index: rowIndex, rowObj: r}); " >
            Detail
      </button>
      </ng-container>
      <ng-container *ngIf="h.field === 'warranty'" >
      <button style="margin: 0px;height: 35px;" type="button" class="form-control btn-sucesses" (click)=" h.func({index: rowIndex, rowObj: r}); " >
       Warranty </button>
      </ng-container>
      <ng-container *ngIf="h.field === 'DownloadBtn'" >
      <button style="margin: 0px;height: 35px;" type="button" class="form-control btn-sucesses" (click)=" h.func({index: rowIndex, rowObj: r}); " >
      <i class="fa fa-download" aria-hidden="true"></i></button>
      </ng-container>
      <ng-container *ngIf="h.field === 'PaymentLCbtn'" >
      <button style="margin: 0px;height: 35px;" type="button" class="form-control btn-sucesses" (click)=" h.func({index: rowIndex, rowObj: r}); " >
       LC Payment </button>
      </ng-container>
      <ng-container *ngIf="h.showDropdown && !h.dropDownInRow">
        <app-dropdown
          [customStyle] ="true"
          [key]="h.key"
          [value]="h.value"
          [selectedItem]="r[h.field]?.selectedDDList"
          [placeholder]="'Choose'"
          [dropDownList]="h.ddList"
          [isContainer]=true
          (selectItemEvent)="
          r[h.field]= { selectedDDList: $event};
          onDropDownSelected.emit({rowObj : r, field: h.field,index: rowIndex} )
          ">
        </app-dropdown>
      </ng-container>
      <ng-container *ngIf="h.showDropdown && h.dropDownInRow">
      <app-dropdown
        [customStyle] ="true"
        [key]="h.key"
        [value]="h.value"
        [selectedItem]="r[h.field]?.selectedDDList"
        [placeholder]="'Choose'"
        [dropDownList]="r.ddList"
        [isContainer]=true
        (selectItemEvent)="
        r[h.field]= { selectedDDList: $event};
        onDropDownSelected.emit({rowObj : r, field: h.field, index: rowIndex} )
        ">
      </app-dropdown>
    </ng-container>
      <ng-container *ngIf="h.isStarRequired;">
        <form>
          <span (click)="h.fun(r)">
            <i *ngIf="r[h.value]" class="fa fa-star starIcon checked" aria-hidden="false"></i>
            <i *ngIf="!r[h.value]" class="fa fa-star-o starIcon unchecked" aria-hidden="true"></i>
          </span>
          </form>
      </ng-container>
      <ng-container *ngIf="h.icon;">
        <span>
          <i class="fa {{h.iconClass}}" aria-hidden="true"></i>
        </span>
      </ng-container>
      <ng-container *ngIf="h.downloadLink;">
        <div *ngFor="let item of r[h.link]; let i = index">
          <a href="{{item}}" target="_blank">{{h.linkText}}</a>
        </div>
        <div *ngIf="!r[h.link].length"> - </div>
      </ng-container>
    </td>
    </tr>
    </ng-container>
  </tbody>
</table>
</div>
`
})

export class CommonTableComponent implements OnInit {
  @Input() pagination = true;
  tableHeight = window.innerHeight - 1000;
  @Input() headers: any[] = [];
  @Input() rows : any[]= [];
  @Input() showMenu = false;
  selectedMenu: any;
  @Input() enableSorting = true;
  @Output() onSortClicked = new EventEmitter;
  @Output() onRowClicked = new EventEmitter;
  @Output() onDropDownSelected = new EventEmitter;
  @Input() routeInfo: any;
  displayBlock!: boolean;

  constructor() { }
  onResize(e: any) {
    this.tableHeight = e.target.innerHeight - 250
  }

  ngOnInit() {
    if (!this.pagination)  this.tableHeight = window.innerHeight - 310;
    const pathName = window.location.pathname.slice(1);
    const dataObj = JSON.parse(localStorage.getItem('filterObj' + pathName) || '{}' )
    const fieldName = dataObj[pathName]?.sortBy && dataObj[pathName]?.sortBy[0] === '-' ? dataObj[pathName]?.sortBy.slice(1) : dataObj[pathName]?.sortBy;
    dataObj[pathName]?.sortBy && this.headers.forEach(h => {
      if (h.field === fieldName) {
        h.clicked = true;
        h.ascending = dataObj[pathName]?.sortBy[0] === '-' ? false : true;
      } else {
        h.clicked = false;
      }
    })
  }

  onSort(h: { clicked: boolean; ascending: boolean; field: any; }) {
    if (this.enableSorting) {
      for (let i = 0; i < this.headers.length; i++) {
        this.headers[i].clicked = false;
      }
      h.clicked = true;
      h.ascending = !h.ascending;
      const obj = {
        headerField: h.field,
        ascending: h.ascending
      }
      this.onSortClicked.emit(obj)
    }
  }

  clickedOnRow(rowObj: any) {
    this.onRowClicked.emit(rowObj)
  }

  deleteRow(i: number) {
    this.rows.splice(i, 1);
  }
   editRow(i: any){

   }
  numberOnly(e:any) {
    const regex = new RegExp('^[0-9]+$');
    if ((e.target.value + e.key).match(regex)) {
    } else {
      e.preventDefault();
    }
  }

  headerIdentify(index: any) {
    return index;
  }

  rowIdentify(index: any) {
    return index;
  }

  openInNewTab(row: { [x: string]: any; }) {
    let url
    if(this.routeInfo && this.routeInfo?.path !== '/')
    {
      url = window.location.origin + this.routeInfo?.path + (row[this.routeInfo.key] || '');
      window.open(url, '_blank');
    }
  }
}