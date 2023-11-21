import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VendaResponse } from '../response/venda-response';
import { CreateVendaRequest } from '../request/venda-request';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  baseUrl = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  listAll() {
    return this.httpClient.get<VendaResponse[]>(`${this.baseUrl}api/venda`);
  }

  createVenda(venda: CreateVendaRequest) {
    return this.httpClient.post<VendaResponse>(`${this.baseUrl}api/venda`, venda);
  }

  listAllToDay() {
    return this.httpClient.get<VendaResponse[]>(`${this.baseUrl}api/venda/hoje`);
  }

}
