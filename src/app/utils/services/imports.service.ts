import { CONSTANTS } from './../constants/index';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment1 } from 'src/environments/environment';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class ImportsService {

  constructor(private httpService: HttpService,) { }
  
 
  public postEmployeeDetails(data:any) {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.USER_DETAILS, data)
   }
//   public getPOdetails(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PURCHASE_ORDER, data);
//   }
//   public getCompanyPOC(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PRODUCT_COMPANY_POC, data)
//   }
//   public getCountry() {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.COUNTRY);
//   }
//   public postPOdetails(data) {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.PURCHASE_ORDER, data);
//   }
//   public getPODetailsById(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PURCHASE_ORDER, data);
//   }
//   public putPODetailsById(data) {
//     return this.httpService.put(CONSTANTS.MAIN.APP.URLS.PURCHASE_ORDER, data);
//   }
//   public getPOproductDetails(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PRODUCT_DETAILS_PO, data);
//   }
//   public putPOproductDetails(id, data?) {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.PURCHASE_ORDER}?id=${id}`, data);
//   }
//   public getPOInvoceData(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORTS_INVOICE, data);
//   }
//   public getPOContainerData(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.CONTAINER_DETAILS, data);
//   }
//   public getPIproductsData(filterObj) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORTS_PI_PRODUCTS, filterObj);
//   }
//   public postFTWZtoChallanData(data) {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.IMPORTS_DTA_CHALLAN, data);
//   }
//   public getAllFTWZtoChallanData(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORTS_DTA_CHALLAN, data);
//   }

//   public getTOPSupplier(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORT_DATA_SUPPLIER, data);
//   }

//   public getTOPImporter(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORT_DATA_IMPORTER, data);
//   }

//   public getImporterValue(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORT_DATA_IMPORTER_VALUE, data);
//   }
//   public getSupplierValue(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORT_DATA_SUPPLIER_VALUE, data);
//   }
//   public getMonthlySate(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORT_DATA_SUPPLIER_MONTHLY_STATS, data);
//   }
//   public getMonthlyBECal(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORT_DATA_MONTHLY_STATS, data);
//   }

//   public getImporterDetails(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORT_DETAILS, data);
//   }
//   public getImporterDetails2(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORT_DETAILS2, data);
//   }

//   public getSupplierDetails(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SUPPLIER_DETAILS, data);
//   }
//   public getSupplierDetails2(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SUPPLIER_DETAILS2, data);
//   }
// //Importers method 
//   public getImporters(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORTERS, data);
//   }
//   public postImporters(data) {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.IMPORTERS, data);
//   }
//   public putImporters(id,data) {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.IMPORTERS}?id=${id}`, data);
//   }
//    public getImportersType() {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORTERS_TYPE);
//   }
//   /// end here///////
//   public getSuppliers(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SUPPLIERS, data);
//   }
//   public getAllSuppliers() {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SUPPLIER_LIST);
//   }
//   public postSuppliers(data) {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.SUPPLIERS, data);
//   }
//   public putSuppliers(id,data) {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.SUPPLIERS}?id=${id}`, data);
//   }
//    public getSuppliersType() {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SUPPLIERS_TYPE);
//   }
//    //get appi for IMporter And Supplier details
//   public getImportersWiseStats(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORTER_WISE_STATS, data);
//   }
//   public getSupplierWiseStats(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SUPPLIER_WISE_STATS, data);
//   }
//   //get all raw import data
//   public getImportsrowData(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORT_DATA, data);
//   }
// //Products get post and put 
//   public getimportProduct(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORTERS_PRODUCT, data);
//   }
//   public postImportersProduct(data) {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.IMPORTERS_PRODUCT, data);
//   }
//   public putImportersProduct(id,data) {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.IMPORTERS_PRODUCT}?id=${id}`, data);
//   }
// //safe guard 
//   public getsafeGuard(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SAFE_GUARD_DUTY, data);
//   }
//   public postsafeGuard(data) {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.SAFE_GUARD_DUTY, data);
//   }
//   public putsafeGuard(id,data) {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.SAFE_GUARD_DUTY}?id=${id}`, data);
//   }

//   public GetimporterLinegraph(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORTER_LINE_GRAPH, data);
//   }
//   getProductType() {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PRODUCT_TYPE)

//   }

//   public putrawDatafile(id,data) {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.IMPORT_DATA}?id=${id}`, data);
//   }

//   public getproductManufacturer(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.IMPORT_PRODUCT_MANUFACTURER, data);
//   }

//   public getDistributor(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.GET_DISTRIBUTOR, data);
//   }
//   public getDistributorSupllier(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.DISTRIBUTOR_SUPPLIER, data);
//   }
//   public getDistributorGraph(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.DISTRIBUTOR_GRAPH, data);
//   }

//   public getDistributorMonthStats(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.DISTRIBUTOR_MONTH_STATS, data);
//   }

//   public getDistributorGraphStats(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.DISTRIBUTOR_TABLE_STATE, data);
//   }

  
//   //MANUFACTURER AND IMPORTERS 
//   public getManufacturerImp(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.MANUFACTURER_IMPORTERS, data);
//   }

//   public getsupplierlineGraph(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SUPPLIER_LINE_GRAPH, data);
//   }

// //New PO from 
//   public getPOList(data) {
//     return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PURCHASE_ORDER_LIST,data)
//   }
//   public postPo(data): Observable<any> {
//     return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.PO,data)
//   }
//   public putPoData(data) {
//     return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.PO, data);
//   }

//   public postPoProduct(data): Observable<any> {
//     return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.PO_PRODUCT,data)
//   }
//   public putPoProduct(data) {
//     return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.PO_PRODUCT, data);
//   }

//   public getPODetails(id) {
//     return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PO,id)
//   }
//   public getPoProduct(data): Observable<any> {
//     return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PO_PRODUCT,data)
//   }
//   public getProductType1(id): Observable<any> {
//     return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PO_PRODUCT_TYPE,id)
//   }

//   //PLANT POST 
//   public postPostPlant(data): Observable<any> {
//     return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.PLANT,data)
//   }
//   public getPlants(data): Observable<any> {
//     return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PLANT,data)
//   }
//   public putPlants(data): Observable<any> {
//     return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.PLANT,data)
//   }

//   //get currency
//   public getCurrency(): Observable<any> {
//     return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.CURRENCY)
//   }
// //aDD Import PI from
//   public postPiData(data): Observable<any> {
//     return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.IMPORT_PI,data)
//   }

//   public postPiProductData(data): Observable<any> {
//     return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.IMPORT_PI_PRODUCT,data)
//   }
//   public getPiData(data): Observable<any> {
//     return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.IMPORT_PI,data)
//   }
//   public putPiData(data): Observable<any> {
//     return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.IMPORT_PI,data)
//   }
  
//   public putPiDataDoc(data): Observable<any> {
//     return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.IMPORT_PI_DOC,data)
//   }

//   public getPiProductData(data): Observable<any> {
//     return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.IMPORT_PI_PRODUCT,data)
//   }
// //To check remaining amount //
//   public getPiProductTotal(data): Observable<any> {
//     return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PI_TOTAL_PRODUCT,data)
//   }
//   public putPiProductData(data): Observable<any> {
//     return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.IMPORT_PI_PRODUCT,data)
//   }

//   //post Method for LC 
//   public PostLcData(data): Observable<any> {
//     return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.LC_DATA,data)
//   }
//   public getLcData(data): Observable<any> {
//     return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.LC_DATA,data)
//   }
//   public PutLcData(data): Observable<any> {
//     return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.LC_DATA,data)
//   }
//   //get all Invoice for Import
//   public PostInvoiceImport(data): Observable<any> {
//     return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.INVOICE,data)
//   }
//   public putInvoiceImport(data): Observable<any> {
//     return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.INVOICE,data)
//   }
//   public putInvoiceImportDoc(data): Observable<any> {
//     return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.INVOICE_DOC,data)
//   }
//   public getImportInvoice(data): Observable<any> {
//     return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.INVOICE,data)
//   }

//   public PostInvoiceFiles(data): Observable<any> {
//     return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.INVOICE_FILES,data)
//   }
// //CHARGES
// public PostInvoiceCharges(data): Observable<any> {
//   return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.CHARGES,data)
// }
// public PutInvoiceCharges(data): Observable<any> {
//   return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.CHARGES,data)
// }
// public getInvoiceCharges(data): Observable<any> {
//   return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.CHARGES,data)
// }
// // CONTAINER
// public PostInvoiceContainer(data): Observable<any> {
//   return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.CONTAINER,data)
// }
// public PutInvoiceContainer(data): Observable<any> {
//   return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.CONTAINER,data)
// }
// public getInvoiceContainer(data): Observable<any> {
//   return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.CONTAINER,data)
// }
// // BILLING_ADDRESS added in master from 
// public PostBillingAdd(data): Observable<any> {
//   return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.BILLING_ADDRESS,data)
// }
// public getBillingAdd(data): Observable<any> {
//   return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.BILLING_ADDRESS,data)
// }
// public putBillingAdd(data): Observable<any> {
//   return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.BILLING_ADDRESS,data)
// }
// // PAYMENT
// public PostPayments(data): Observable<any> {
//   return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.PAYMENT,data)
// }
// public PUTPayments(data): Observable<any> {
//   return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.PAYMENT,data)
// }
// public getPayments(data): Observable<any> {
//   return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PAYMENT,data)
// }
// /// end here 
// // PO_BACKUP code here for PO 

// public postPOBackup(data): Observable<any> {
//   return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.PO_BACKUP,data)
// }
// public getPOBackup(data): Observable<any> {
//   return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PO_BACKUP,data)
// }
// public postPOProductBackup(data): Observable<any> {
//   return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.PO_PRODUCT_BACKUP,data)
// }
// public getPOProductBackup_pre(data): Observable<any> {
//   return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PO_PRODUCT_BACKUP,data)
// }


// //getting PO backup data 
// public GetPOBackup(data?): Observable<any> {
//   return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PO_BACKUP_GET,data)
// }
// //getting POProduct Backup
// public getPO_productBackup(data?): Observable<any> {
//   return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PO_PRODUCT_BACKUP_GET,data)
// }
// //BILL_OF_ENTRY
// public PostBillOfEntry(data?): Observable<any> {
//   return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.BILL_OF_ENTRY,data)
// }
// public getBillOfEntry(data?): Observable<any> {
//   return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.BILL_OF_ENTRY,data)
// }
// public putBillOfEntry(data?): Observable<any> {
//   return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.BILL_OF_ENTRY,data)
// }
// ///DOMASTIC_CHARGES
// public PostdomasticCharge(data): Observable<any> {
//   return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.DOMASTIC_CHARGES,data)
// }
// public getdomasticCharge(data): Observable<any> {
//   return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.DOMASTIC_CHARGES,data)
// }
// public putdomasticCharge(data): Observable<any> {
//   return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.DOMASTIC_CHARGES,data)
// }

// ///// PO_ISSUED_REPORT    REPORT/////
//       public getPoIssuedReport(data): Observable<any> {
//         return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PO_ISSUED_REPORT,data)
//       }
//       public getPoIssuedReport_Product(data): Observable<any> {
//         return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PO_ISSUED_PRODUCT_REPORT,data)
//       }
      
//       public getPoIssuedReport_LC(data): Observable<any> {
//         return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PO_ISSUED_LC_REPORT,data)
//       }
      
//       public getPoIssuedReport_invoice(data): Observable<any> {
//         return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PO_ISSUED_INVOICE_REPORT,data)
//       }
      
//       public getPoReport(data): Observable<any> {
//         return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PO_REPORT,data)
//       }
//       public getPoPIReport(data): Observable<any> {
//         return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.PO_PI_REPORT,data)
//       }

//       // INVOICE_CHARGES_PAYMENT
//       public postInvoicePayment(data): Observable<any> {
//         return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.INVOICE_CHARGES_PAYMENT,data)
//       }

//       public getInvoicePayment(data): Observable<any> {
//         return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.INVOICE_CHARGE_PAY,data)
//       }

// //geting contract Detaills
//       public gettContract(data): Observable<any> {
//         return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.CONTRACT,data)
//       }
//      //// CONTRACT_PRODUCTS
//      public gettContractProducts(data): Observable<any> {
//       return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.CONTRACT_PRODUCTS,data)
//     }
//     ///CONTRACT_PO_PRODUCTS
//     public gettContractPOProducts(data): Observable<any> {
//       return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.CONTRACT_PO_PRODUCTS,data)
//     }



//     public CompanyList(): Observable<any> {
//       return this.httpService1.get(CONSTANTS.MAIN1.APP.URLS.CONTRACT)
//     }
//     public postContract(data): Observable<any> {
//       return this.httpService1.post(CONSTANTS.MAIN1.APP.URLS.CONTRACT,data)
//     }

//     public putContract(data): Observable<any> {
//       return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.CONTRACT,data)
//     }
  
//     public putContractDoc(data): Observable<any> {
//       return this.httpService1.put(CONSTANTS.MAIN1.APP.URLS.CONTRACT_DOC,data)
//     }

//     public downloadFile(docFile: string): Observable < Blob > {  
//       return this.httpService1.get(environment1.apiURL+ '/ornate_import_pi/pi_file/' + docFile, {  
//           responseType: 'blob'  
//       });  
//   }  
}
