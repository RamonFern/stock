export interface CreateVendaRequest {
  numeronota: number
	idProduto: number
	nomeproduto: string
	valorunidade: string
	quantidade: number
	desconto: number
	total: number
	status: string
  formaPag: string
	// dataVenda: string
}
