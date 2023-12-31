import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProdutoRequest } from '../request/create-produto-request';
import { ProdutoResponse } from '../response/produto-response';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = environment.baseURL;

  constructor(private httpClient: HttpClient) { }

  salvarProduto(request: CreateProdutoRequest) {
    return this.httpClient.post<ProdutoResponse>(`${this.baseUrl}api/produto`, request);
  }

  listAll() {
    return this.httpClient.get<ProdutoResponse[]>(`${this.baseUrl}api/produto`);
  }

  buscarPorId(id: number) {
    return this.httpClient.get<ProdutoResponse>(`${this.baseUrl}api/produto/${id}`);
  }

  update(produto: CreateProdutoRequest, id: number) {
    return this.httpClient.put<ProdutoResponse>(`${this.baseUrl}api/produto/${id}`, produto);
  }


}
