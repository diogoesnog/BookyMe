/**
 * Nota: é boa prática enviar sempre que possível o código do estado do pedido HTTP
 * podem consultar a seguinte cheat sheet em caso de dúvida
 * https://kapeli.com/cheat_sheets/HTTP_Status_Codes.docset/Contents/Resources/Documents/index
 * @type {e | (() => Express)}
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../../controllers/users');
const User = require('../../models/user');
//const Response = require('../../models/response')

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
/**
 * Register a new username
 */
router.post('/register', (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) console.log(err);

        const user = req.body;
        user.password = hash;

        Users.createUser(user)
        .then(dataTemp => {
            let data = dataTemp.toObject()
            delete data.password
            res.status(201).jsonp(data)
        })
        .catch( err => res.status(500).jsonp(err));
    })
});


/**
 * Returns all users in db
 * Only for test purpose
 */
router.get('/findAll', (req, res) => {
    Users.getUsers()
        .then(data => {res.status(201).jsonp(data);})
        .catch(err => {res.status(500).jsonp(err);})
})

// Os pedidos PUT trazem um body no request. Devem servir apenas para atualizar recursos
/*router.put('/', (req, res) => { }); -> pass (antiga e nova), atualizar info -> tudoo que envolva a conta tem de ter middleware*/

// Os pedidos PATCH trazem um body no request. Devem servir apenas para atualizar um recurso
/*router.patch('/', (req, res) => { }); -> faorites*/


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