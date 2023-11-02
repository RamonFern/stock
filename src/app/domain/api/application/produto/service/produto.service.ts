import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProdutoRequest } from '../request/create-produto-request';
import { ProdutoResponse } from '../response/produto-response';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  salvarProduto(request: CreateProdutoRequest) {
    return this.httpClient.post<ProdutoResponse>(`${this.baseUrl}api/produto`, request);
  }

  listAll() {
    return this.httpClient.get<ProdutoResponse[]>(`${this.baseUrl}api/produto`);
  }


}
