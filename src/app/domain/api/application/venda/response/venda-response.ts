import { ProdutoVendido } from "../../produto/response/produto-response"

export interface VendaResponse {
  id: number
  numeronota: number
	idProduto: number
	nomeproduto: string
	valorunidade: number
	quantidade: number
	desconto: number
	total: number
	status: string
  formaPag: string
	dataVenda: string
}

export interface VendaFiltradas {
  id: number
  numeronota: number
  produtos: ProdutoVendido[]
  totalGeral: number
}
