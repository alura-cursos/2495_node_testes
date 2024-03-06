import Editora from '../models/editora.js';

class EditorasController {
  static listarEditoras = async (_, res) => {
    try {
      const resultado = await Editora.pegarEditoras();
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static listarEditoraPorId = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await Editora.pegarPeloId(params.id);
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static cadastrarEditora = async (req, res) => {
    const { body } = req;
    const editora = new Editora(body);
    try {
      if (Object.keys(body).length === 0) {
        throw new Error('corpo da requisicao vaio');
      }
      const resposta = await editora.salvar(editora);
      return res.status(201).json({ message: 'editora criada', content: resposta });
    } catch (err) {
      if (err.message === 'corpo da requisicao vaio') {
        return res.status(400).json(err.message);
      }
      return res.status(500).json(err.message);
    }
  };

  static atualizarEditora = async (req, res) => {
    const { params } = req;
    const { body } = req;
    try {
      const editoraAtual = await Editora.pegarPeloId(params.id);
      const novaEditora = new Editora({ ...editoraAtual, ...body });
      const resposta = await novaEditora.salvar(novaEditora);
      return res.status(204).json({ message: 'editora atualizada', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static excluirEditora = async (req, res) => {
    const { params } = req;
    try {
      await Editora.excluir(params.id);
      return res.status(200).json({ message: 'editora excluída' });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static listarLivrosPorEditora = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await Editora.pegarPeloId(params.id);
      const listaLivros = await Editora.pegarLivrosPorEditora(params.id);
      return res.status(200).json({ editora: resultado[0], livros: listaLivros });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };
}

export default EditorasController;
