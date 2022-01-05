
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import { HttpService } from './http.service';
// import { Http1Service } from './http1.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyapiService {


  constructor(private httpService: HttpService) { }

//   public Companydetails(filterObj?) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.COMPANIES, filterObj)

//   }
//   addCompany(data) {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.CLIENTS, data)

//   }
//   getCompanyById(id) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.COMPANIES, id)
//   }
//   saveCompanyDetails(id, data) {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.COMPANIES}${id}/`, data)
//   }
//   // getting invoice detail using Invoice ID
//   getInvoiceDetailByPiId(id) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.INVOICE, id)
//   }
//   disableCompany(id) {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.COMPANIES}${id}/`, { "is_active": 0, })
//   }

//   searchBysalesPerson(size: number, owner: number) {
//   }

//   searchBySource(size: number, lead_sour: number) {
//   }

//   searchByRegion(size: number, city: number){

//   }

//   searchByDate(size: number, startdate: Date, enddate: Date){

//   }

//   public addQuotation(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.QUOTATION, data)
//   }

//   public Clientdetails(filterObj?): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.CLIENTS, filterObj)

//   }
//   getClientsById(id) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.CLIENTS, id)
//   }

//   public addClientDetails(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.CLIENT_SINGLE, data)

//   }

//   getCompanyLeadById(id) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.LEADS, id)
//   }
//   getCompanyQuotById(id) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.QUOTATION, id)
//   }
//   getCompanyPiById(id) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.INVOICE, id)
//   }

//   addNewPi(data, send_mail: any = null) {
//     return this.httpService.post(`${CONSTANTS.MAIN.APP.URLS.INVOICE}?send_mail=${send_mail}`, data);
//   }
// // api call for shipper
//   public postShipping(data) {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.SHIPPING_DETAILS, data)
    
//   }

//   //api call shipping using company id 
//   getCompanyShippingDetails(id) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SHIPPING_DETAILS,id)
//   }

//   getSellerDetails(data?) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SELLER_DETAILS, data)
//   }

//   getProductModelNames(id) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PRODUCT, {productcompany: id})
//   }

//   public AllUsers(): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.USERS)


//   }
//   public Allregion(): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.REGION)
//   }
// //getting all state
//   public AllState(): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.STATE)
//   }


//   public AllSource(): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.LEAD_SOURCE_MASTERS)


//   }
//   public Allproduct(): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.USERS)


//   }
//   public AllManufacturers(): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PRODUCT_COMPANY)
//   }
//   public AllSalespersons(): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SALESPERSONS)
//   }
  public AllCities(): Observable<any> {
    return this.httpService.get(CONSTANTS.MAIN.APP.URLS.CITY)
  }
  public AllDept(): Observable<any> {
    return this.httpService.get(CONSTANTS.MAIN.APP.URLS.DEPT)
     }
  //getting all cities details 
//   public AllCitiesDetails(filters): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.CITY,filters)
//   }
//   //getting all cities details 
//   public postCitiesDetails(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.CITY,data)
//   }

//   public AllSellers(): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SELLER_DETAILS)
//   }
//   public AllModels(): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PANEL_DESCRIPTION)
//   }
//   //get panel description 
//   public getpanelDescription(filters): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PANEL_DESCRIPTION,filters)
//   }
//   //post panel description 
//   public PostpanelDescription(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.PANEL_DESCRIPTION,data)
//   }

//   //get Inverters description 
//   public getInvertersDescription(filters): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.INVERTER_DESCRIPTION,filters)
//   }
//  //get Inverters description 
//  public postInvertersDescription(data): Observable<any> {
//   return this.httpService.post(CONSTANTS.MAIN.APP.URLS.INVERTER_DESCRIPTION,data)
// }


//   public DuplicateCompanydetails(name): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.DUPLICATE_COMPANY, {search: name})

//   }
//   public SetClientPrimary(id, isPrimary): Observable<any> {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.CLIENTS}${id}/`, { "is_primary": isPrimary})
//   }
//   public UpdateClientById(id, data): Observable<any> {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.CLIENTS}${id}/`, data)
//   }
//   public getProductItemsInPI(data): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.INVOICE_PRODUCT, data)
//   }
//   public addNewProductItemsInPI(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.INVOICE_PRODUCT, data)
//   }
//   public saveProductData(data): Observable<any> {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.INVOICE_PRODUCT}${''}`, data)
//   }
//   //Edit Invoice 
//   saveeditInvoice(id, data) {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.INVOICE}${id}/`, data)
//   }
//   getInvoiceStatus(invoice_id): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.INVOICE_STATUS, invoice_id)
//   }
//   postInvoiceStatusData(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.INVOICE_STATUS, data)
//   }
//   getPaymentApprovalData(invoice_id): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PAYMENT_APPROVAL, invoice_id)
//   }
//   postPaymentApprovalData(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.PAYMENT_APPROVAL, data)
//   }
//   getInvoiceActivityData(invoice_id): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.INVOICE_ACTIVITY, invoice_id)
//   }
//   postInvoiceActivityData(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.INVOICE_ACTIVITY, data)
//   }
//   getInvoicePaymentData(invoice_activity_id): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.INVOICE_PAYMENT, invoice_activity_id)
//   }
//   postInvoicePaymentData(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.INVOICE_PAYMENT, data)
//   }
//   getSellerBankDD(): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SELLER_BANK)
//   }
//   getMakeOrderDetails(invoice_activity_id):Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.MAKE_ORDER, invoice_activity_id)
//   }
//   postMakeOrderDetails(data):Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.MAKE_ORDER, data)
//   }
//   getTransporterDetails(filters):Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.TRANSPORTER_VEHICLE_DETAILS, filters)
//   }
//   postTransporterDetails(data):Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.TRANSPORTER_VEHICLE_DETAILS, data)
//   }
//   getEwayBillDetails(filters):Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.E_WAY_BILL, filters)
//   }
//   postEwayBillDetails(data):Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.E_WAY_BILL, data)
//   }
//   getDeliveryDetails(filters):Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.DELIVERY_DETAIL, filters)
//   }
//   postDeliveryDetails(data):Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.DELIVERY_DETAIL, data)
//   }
//   getDispatchDetails(filters):Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.DISPATCH_DETAILS, filters)
//   }
//   postDispatchDetails(data):Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.DISPATCH_DETAILS, data)
//   }
  
//   putDispatchDetails(id,data):Observable<any> {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.DISPATCH_DETAILS}?id=${id}`, data)
//   }
//   getTransporterBillDetails(filters):Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.TRANSPORTER_BILL, filters)
//   }
//   postTransporterBillDetails(data):Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.TRANSPORTER_BILL, data)
//   }
//   getTransporterPaymntData(filters):Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.TRANSPORTER_PAYMENT, filters)
//   }
//   postTransporterPaymntData(data):Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.TRANSPORTER_PAYMENT, data)
//   }
//   getInvoiceActivityFile(data):Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.INVOICE_ACTIVITY_FILE, data)
//   }
//   postInvoiceAcivityFile(data):Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.INVOICE_ACTIVITY_FILE, data)
//   }
//   getTransporterDDList():Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.GET_TRANSPORTER)
//   }
//   getTransporterPOCDetails(filters):Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.TRANSPORTER_POC, filters)
//   }
//   getRecentActivityData(invoice_id):Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.RECENT_ACTIVITY, invoice_id)
//   }
//   postApprovalPermisson(invoice_id):Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.PAYMENT_TO_APPROVE, invoice_id)
//   }
//   getActivityInvoiceDD(data):Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.CREATE_ACTIVITY_INVOICE_DD, data)
//   }
//   getDispatchProductsDetail(data):Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.REMAINING_INVOICE_PRODUCTS, data)
//   }
// //getting all pi for proforma list page
//   getAllPiList(filters) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.INVOICE, filters)
//   }
// //getting all pi for proforma list page
// getAllQuotation(filters) {
//   return this.httpService.get(CONSTANTS.MAIN.APP.URLS.QUOTATION, filters)
// }
//   sendPiMail(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SEND_PI_MAIL, {id: data})
//   }
//   sendInvoiceInMail(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SEND_INVOICE_MAIL, data)
//   }
//   getMailSentStatusForPI(filter) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SENT_MAIL, filter);
//   }
//   sendTallyinvoiceInMail(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SENT_TALLY_MAIL, data)
//   }

//   getSalesPersonReport(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SALES_REPORT,data)
//   }

//   getPendingInvoiceReport(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.INVOICES_REPORT,data)
//   }

//   postImportdata(data) {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.IMPORT_DATA,data)
//   }

//   public getAllManufacturers(data): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PRODUCT_COMPANY,data)
//   }

//   public PostManufacturers(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.PRODUCT_COMPANY,data)
//   }
//   public putManufacturers(id,data): Observable<any> {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.PRODUCT_COMPANY}?id=${id}`, data)
//   }
//   public putManufacturersPOC(id,data): Observable<any> {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.PRODUCT_COMPANY_POC}?id=${id}`, data)
//   }
 

//   public getAllregion(data): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.REGION,data)
//   }
//   public postRegion(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.REGION,data)
//   }
//   public putRegion(id,data): Observable<any> {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.REGION}?id=${id}`,data)
//   }

//   //getting all state
//   public GetAllState(data): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.STATE,data)
//   }
//   public postState(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.STATE,data)
//   }
//   public putState(id,data): Observable<any> {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.STATE}?id=${id}`,data)
//   }
  
//   //getting all Product Type
//   public GetProductType(data): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PRODUCT_TYPE,data)
//   }
//   public postProductType(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.PRODUCT_TYPE,data)
//   }
//   public putProductType(id,data): Observable<any> {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.PRODUCT_TYPE}?id=${id}`,data)
//   }

//   //getting all Product Type
//   public GetCountries(data): Observable<any> {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.COUNTRY,data)
//   }
//   public PostCountries(data): Observable<any> {
//     return this.httpService.post(CONSTANTS.MAIN.APP.URLS.COUNTRY,data)
//   }
//   public PutCountries(id,data): Observable<any> {
//     return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.COUNTRY}?id=${id}`,data)
//   }

// //get all Products 
// public getAllproduct(filterObj?): Observable<any> {
//   return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PRODUCT,filterObj)
// }

// //get all Products 
// public postProduct(data): Observable<any> {
//   return this.httpService.post(CONSTANTS.MAIN.APP.URLS.PRODUCT,data)
// }
// public Putproduct(id,data): Observable<any> {
//   return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.PRODUCT}?id=${id}`,data)
// }
// //get all Products 
// public getLeadReport(filterObj?): Observable<any> {
//   return this.httpService.get(CONSTANTS.MAIN.APP.URLS.LEAD_REPORT,filterObj)
// }

// //company owner changes ///////////////////////////
// public getCompanyOwnerCHnage(data): Observable<any> {
//   return this.httpService.get(CONSTANTS.MAIN.APP.URLS.CHNAGE_COMPANY_OWNER,data)
// }
// public PostCompanyOwnerCHnage(data): Observable<any> {
//   return this.httpService.post(CONSTANTS.MAIN.APP.URLS.CHNAGE_COMPANY_OWNER,data)
// }
// public putCompanyOwnerCHnage(id,data): Observable<any> {
//   return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.CHNAGE_COMPANY_OWNER}?id=${id}`,data)
// }
// /////////////////////////////end here//////////////////////////////////
// public getSalesRawdata(filterObj?): Observable<any> {
//   return this.httpService.get(CONSTANTS.MAIN.APP.URLS.DISPATCH_INFO_SQL,filterObj)
// }


//  //Sale Targte api call 
//  public GetallSalesTarget(data): Observable<any> {
//   return this.httpService.get(CONSTANTS.MAIN.APP.URLS.SALES_TARGET,data)
// }
// public postallSalesTarget(data): Observable<any> {
//   return this.httpService.post(CONSTANTS.MAIN.APP.URLS.SALES_TARGET,data)
// }
// public PutSalesTarget(id,data): Observable<any> {
//   return this.httpService.put(`${CONSTANTS.MAIN.APP.URLS.SALES_TARGET}?id=${id}`,data)
// }

// public postManufacturersPOC(data): Observable<any> {
//   return this.httpService2.post(CONSTANTS.MAIN1.APP.URLS.PO_PRODUCT_POC, data)
// }
}
