const connection = require('../database/connection')
const md5 = require('md5')
const ip = require("ip");
const uuidv4 = require('uuid/v4')

require("dotenv-safe").config()
const jwt = require('jsonwebtoken')

module.exports = {
    async login (req, res, next) {
        const cnpj = req.body.cnpj
        const pwd = req.body.password

        const company = await connection('company')
        .where('cnpj', cnpj)
        .select('*')
        .first()
        
        
        if(cnpj == company.cnpj && md5(pwd) == md5(company.password)){
            const id = company.id
            
            var token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 3600 // expires in 1 hour
            })
            
            return res.json({ auth: true, token: token })
        }
        
        res.status(500).json({message: 'Login inválido!'})
    },
    
    async auth(req, res, next){
        var token = req.headers['x-access-token']
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' })
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            
            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id
            next()
        })
    },
    
    async logout (req, res) {
        res.json({ auth: false, token: null })
    },
    
    async register(request, response) {
        const {username, password, rpassword, name, email, birthdate, secretquestion, secretanswer, toscheckbox} = request.body

        const encryptedPassword = md5(password)
        const uuid = uuidv4()

        const databaseuser = await connection('users')
        .where('username', username)
        .select('username')

        if(databaseuser[0] == undefined){
            if(password == rpassword) {
                await connection('users').insert({
                    uuid,
                    username: username,
                    password: encryptedPassword,
                    name: name,
                    email: email,
                    birth_date: birthdate,
                    secret_question: secretquestion,
                    secret_answer: secretanswer,
                    network_ip: ip.address(),
                    activated: true
                })
    
                response.status(200).json({message: 'Usuário cadastrado.'})
            } else {
                return response.status(400).json({isEqual: false})
            }
            return response.json({ uuid })
        } else {
            return response.status(200).json({userExists: false})
        }
    }
}