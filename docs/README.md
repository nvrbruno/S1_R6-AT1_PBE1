## API Reference

### Clientes 

#### GET /clientes
-**Descrição**: 0btém uma lista de todos os clientes
-**RESPONSE**: Array de clietes

#### POST /produtos
-**Descrição**: Cria um novo cadastro
-**BODY**:

```
{
    "nomeCliente": "nome",
    "cpfCliente": "00000000000"
}
```
-**RESPONSE**:
```
{
    "message": "Cliente cadastrado com sucesso"
}
```