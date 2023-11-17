export interface ProdutoResponse {
  id: number
  nome: string
	marca: string
	qntdEstoque: number
	valor: number
}

export interface ProdutoVendido {
  id: number
  nome: string
	qntd: number
	valorUnidade: number
  total: number
}
