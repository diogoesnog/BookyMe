/**
 * Nota: é boa prática enviar sempre que possível o código do estado do pedido HTTP
 * podem consultar a seguinte cheat sheet em caso de dúvida
 * https://kapeli.com/cheat_sheets/HTTP_Status_Codes.docset/Contents/Resources/Documents/index
 * @type {e | (() => Express)}
 */

const express = require('express');
const router = express.Router();
const Catalog = require('../../controllers/catalog');

// Os pedidos do tipo GET não têm body. Devem servir apenas para obter recursos
router.get('/', (req, res) => {

    /**
     * Uma API REST pode apresentar recursos sobre formas de filtros. Para não criar novas
     * rotas num endpoint devemos, sempre que possível, fazer uso de query strings.
     * Estas queries strings vêm sempre após o ponto de interrogação e separadas entre &
     * Um exemplo prático, listar os utilizadores ordenados pelo username ascendente
     * http://localhost:3000/v1/api/user?username=asc
     * Podemos aceder a esta query string no request (req), na property query
     */

    const queries = req.query;

    res.status(200).json({title: "Title", message: "Some message...", queries: queries});
});

// Os pedidos POST trazem um body no request. Devem servir apenas para criar novos recursos
router.post('/', (req, res) => {
    const user = req.body;

    res.status(201).jsonp(user);
    // res.jsonp({title: "Titulo", message: "olá"});
});

// Os pedidos PUT trazem um body no request. Devem servir apenas para atualizar recursos
/*router.put('/', (req, res) => { });*/

// Os pedidos PATCH trazem um body no request. Devem servir apenas para atualizar um recurso
/*router.patch('/', (req, res) => { });*/


// Os pedidos PATCH trazem um body no request. Devem servir apenas para atualizar um recurso
/*router.delete('/', (req, res) => { });*/


/**
 * Os URLs podem ainda ser dinâmicos. Por exemplo, pode ser útil aceder à página de uma
 * loja, listando informações sobre a mesma. Podemos passar um id da loja no URL do método (GET).
 */
router.get('/:id', (req, res) => {
    res.status(200).json(req.params);
});

module.exports = router;