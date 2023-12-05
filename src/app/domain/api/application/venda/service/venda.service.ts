import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VendaResponse } from '../response/venda-response';
import { CreateVendaRequest } from '../request/venda-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  baseUrl = environment.baseURL;

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

  ultimaNota() {
    return this.httpClient.get<number>(`${this.baseUrl}api/venda/ultimaNota`);
  }

  listarPorData(data: string) {
    return this.httpClient.get<VendaResponse[]>(`${this.baseUrl}api/venda/por-data?data=${data}`);
  }

}
