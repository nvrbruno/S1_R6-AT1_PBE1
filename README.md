## API Reference

### Produtos 

#### GET /produtos
-**Descrição**: 0btém uma lista de produtos
-**RESPONSE**: Array de produtos

#### POST /produtos
-**Descrição**: Cria um novo produto
-**BODY**:

```
{
    "nomeProduto": "Produtoexemplo",
    "precoProduto": "0.00"
}
```
-**RESPONSE**:
```
{
    "message": "Produto cadastrado com sucesso"
}
```