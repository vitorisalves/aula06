const produtos = [];

function listarTodos(req, res) {
  res.json(produtos);
}
function exibir(req, res) {
  const { produtoEncontrado } = req;
  res.json(produtoEncontrado);
}



function buscarPeloId(req, res, next) {
  const { produtoId } = req.params;
  const produtoEncontrado = produtos.find((item) => item.id == produtoId);
  if (produtoEncontrado) {
    req.produtoEncontrado = produtoEncontrado;
    next();
  } else {
    res.status(404).json({ msg: "Produto não encontrado!" });
  }
}

function criar(req, res) {
  const { nome, preco } = req.body;
  const produtoNovo = { id: produtos.lenght + 1, nome, preco };
  produtos.push(produtoNovo);
  res.status(201).json(produtoNovo);
}

function atualizar(req, res) {
  const { produtoId } = req.params;
  const produtoEncontrado = produtos.find((item) => item.id == produtoId);
  if (produtoEncontrado) {
    produtoEncontrado.nome = nome;
    produtoEncontrado.preco = preco;
    res.json(produtoEncontrado);
  } else {
    res.status(404).json({ msg: "Produto não encontrado!" });
  }
}

function remover(req, res) {
  const { produtoId } = req.params;
  const posicao = produtos.findIndex((item) => item.id == produtoId);
  if (posicao >= 0) {
    produtos.splice(posicao, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ msg: "Produto não encontrado!" });
  }
}

module.exports = { listarTodos, exibir, buscarPeloId, criar, atualizar, remover };
