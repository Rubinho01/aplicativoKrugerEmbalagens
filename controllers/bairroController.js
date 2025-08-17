const bairroService = require('../services/bairroService');

exports.buscarBairros = async (req, res) => {
    try{const bairros = await bairroService.buscarTodosBairros();
    return res.render('admin/bairrosParaEditar', {bairros})}
    catch(error){
        return res.status(500).send(error.message);
    }
    
};

exports.CarregarBairro = async (req,res) => {
    try {
        const {id} = req.params;
        const bairro = await bairroService.buscarPorId(id);
        return res.render('admin/bairro', {bairro});
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
}

exports.atualizarTaxaBairro = async (req, res) => {
    try {
        const {taxaAtt,bairro} = req.body;
        await bairroService.editarTaxa(bairro,taxaAtt);
        console.log(req.body);
        return res.redirect('/admin/taxas');
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
}