import { ProdutoVendido } from "../../produto/response/produto-response"

export interface VendaResponse {
  id: number
  numeronota: number
	idproduto: number
	nomeproduto: string
	valorunidade: number
	quantidade: number
	desconto: number
	total: number
	status: string
  formapag: string
	datavenda: string
}

export interface VendaFiltradas {
  id: number
  numeronota: number
  datavenda: string
  produtos: ProdutoVendido[]
  totalGeral: number
}
