export interface CreateVendaRequest {
	idProduto: number
	nomeproduto: string
	valorunidade: string
	quantidade: number
	desconto: number
	total: number
	status: string
	dataVenda: string
}
