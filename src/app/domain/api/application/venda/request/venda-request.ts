export interface CreateVendaRequest {
  numeronota: number
	idproduto: number
	nomeproduto: string
	valorunidade: string
	quantidade: number
	desconto: number
	total: number
	status: string
  formapag: string
	// dataVenda: string
}
