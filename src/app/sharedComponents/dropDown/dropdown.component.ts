import { Component , Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  // viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class DropDownComponent implements OnInit {
  public selectedItemKey!: {};
  @Input() isAgGrid = false;

  @Input()
  actionDDArr!: any[];

  public isDDOpened = false;
  public showErrMsg = false;
  public searchFilterText :any = '';
  public _selectedItem : any= {}; // hold info of selected item from dropdown
  public _placeHolder = '--Select--'; // placeholder to show when nothing is selected in dropdown
  public _dropDownList : any = []; // dropdown list
  public _filteredDDList: any[] = [];
  public isDropDownOpened = false;
  public _isToolTip = false;
  @Input() isDDClickedToOpen = false;
  @Input() makeDDListOnClick = true;
  @Input() dropup = false;
  @Input() placement = '';
  @Input() isInForm = false;
  @Input() isSearchEnabled = true;
  @Input() name = 'FormDD';
  _key = ''; // key of the list which represents unique key attribute
  _value = ''; // value of the list which represents is shown on html page
  @Input()
  extendedSeperator: any; // if extended value then what seperator to be used
  @Input()
  isDisabled = false; // dropdown is disabled or not
  @Input()
  customStyle = false; // custom class which are required on dropdown
  @Input()
  isDatePlaceholder = false; // set date vale in dropdown
  @Input()
  isError = false; // if its a form and error div needs to be shown
  @Input()
  errorMsg = ''; // if error then show error message
  @Input()
  isShowDefaultSelection = false;
  @Input() currentIndex = -1; // to get the current list index
  @Input()
  public set placeholder(value: any) {
    // set placeholder when no value of dropdown is selected
    if (!value) {
      // if no placeholder is passed then show --select--
      this._placeHolder = '--Select--';
    } else {
      // if placeholder is passed then show given placeholder
      if (this.isDatePlaceholder === true) {
        this._placeHolder = `${value}`;
      } else {
        this._placeHolder = `--${value}--`;
      }
    }
    // this.addFirstItemAsDefault();
  }
  @Input()
  public set key(value: string) {
    // set selected item if it comes
    if (!value) {
      // set default blank selected item
      this._key = 'key';
    } else {
      // set selected item value in required format
      this._key = value;
    }
  }
  @Input()
  public set value(value: string) {
    // set selected item if it comes
    if (!value) {
      // set default blank selected item
      this._value = 'value';
    } else {
      // set selected item value in required format
      this._value = value;
    }
  }

  @Input() isContainer = false

  @Input()
  public set selectedItem(value: { [x: string]: any; }) {
    // set selected item if it comes
    if (!value) {
      // set default blank selected item
      this._selectedItem = {
        [this._key] : '',
        [this._value] : ''
      };
    } else {
      // set selected item value in required format
      this._selectedItem = {
        [this._key] :  value[this._key],
        [this._value] : value[this._value]
      };
    }
  }

  @Input()
  public set dropDownList(value: Array<any>) {
    // set dropdown list in required format
    if (!value) {
      // if no list is provided then make it blank array
      this._dropDownList = [];
    } else {
      // if array list is provided then make it in required format
      this._dropDownList = [];
      for (let count = 0; count < value.length; count++) {
        const objectLocal = {
          ...{
              [this._key]: value[count][this._key],
              [this._value]: value[count][this._value]
        },  ...value[count]
        };
        this._dropDownList.push(objectLocal);
      }
      // this.addFirstItemAsDefault();
      this._filteredDDList = (this._dropDownList);
    }
  }
  @Input() DDname = '';
  DDFilterObj: any = {};
  @Input() isReactiveForm = false;
  @Input()
  formControlGroup!: FormGroup;
  @Input()
  formControlText!: '';

  @Output()
  public selectItemEvent = new EventEmitter(); // event emitter when item is selected
  constructor(private elementRef: ElementRef) {
    this._selectedItem = {
      [this._key] : '',
      [this._value] : ''
    };
  }
  ngOnInit() {
  }


  public addFirstItemAsDefault() {
    if (this.isShowDefaultSelection && this._dropDownList && this._dropDownList.length > 0 && this._dropDownList[0][this._key] !== '') {
      const insertObj =  {
        [this._key] : '',
        [this._value] : this.placeholder ? this.placeholder : '--Select--'
      };
      this._dropDownList.splice(0, 0, insertObj);
    }
  }
  rowIdentify(index: any, item: { key: any; }) {
    return (item ? (item.key ? item.key :  index) : index);
  }
  /***
   * @name selectItem
   * @desc select Item from dropdown and emit event
   ***/
  public selectItem(item: {}) {
    // // console.log(item);
    if (item) {
    this.selectedItemKey = item;
    } else {
      this.selectedItemKey = {};
    }
    this._selectedItem = item;

    this.DDFilterObj = {
      [window.location.pathname.slice(1)] : {
        [this.DDname] : {...this._selectedItem}
      }
    }
    // set DD FILTERS IN LOCAL STORAGE
    const pathName = [window.location.pathname.slice(1)]
    const obj = JSON.parse(localStorage.getItem('filterObj' + pathName) || '{}')?.[window.location.pathname.slice(1)] || {}
    const obj2 = {...obj, ...this.DDFilterObj[window.location.pathname.slice(1)]}
    const filterObj = {
      [window.location.pathname.slice(1)] : {...obj2}
    }
    localStorage.setItem('filterObj'+ pathName, JSON.stringify(filterObj))
    this.selectItemEvent.emit(item);
  }
  /***
   * @name resetFilterData
   * @desc reset Filter Data
   ***/
  resetFilterData() {
    this.searchFilterText = '';
    this._dropDownList = this._filteredDDList;
  }
  /***
   * @name handlerOnHide
   * @desc handler On Hide DD incase of error
   ***/
  handlerOnHide(): void {
    if (this.isAgGrid) {
      this.elementRef.nativeElement.querySelector('.dropdown').focus();
    }
    this.showErrMsg = true;
    this.resetFilterData();
  }
  /***
   * @name handlerOnShown
   * @desc handler On Show DD incase of error
   ***/
  handlerOnShown() {
    this.showErrMsg = false;
  }
  /***
   * @name filterData
   * @desc filter Data on basis of search
   ***/
  filterData(searchText: { toLowerCase: () => { (): any; new(): any; toString: { (): any; new(): any; }; }; }) {
      const selfvalue = this._value;
      this._dropDownList = this._filteredDDList.filter(function(sText:any) {
        return (
          sText[selfvalue].toLowerCase().indexOf(searchText.toLowerCase().toString()) !== -1
        );
      });
  }
  /***
   * @name preventDDClose
   * @desc preventDDClose when clicked on input field
   ***/
  preventDDClose(e: { preventDefault: () => void; stopPropagation: () => void; }) {
    e.preventDefault();
    e.stopPropagation();
  }
  isEmptyObject(obj: {}) {
    return (obj && (Object.keys(obj).length === 0));
  }
  onOpenChange(data: boolean) {
    this.isDDOpened = data;
  }
}

