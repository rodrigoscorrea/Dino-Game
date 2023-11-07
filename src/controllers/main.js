const models = require('../models')
const Curso = models.Curso
const User = models.User
const bcrypt = require('bcryptjs')

const index = (request,response)=>{
    response.render("main/index")
}

const sobre = (request,response)=>{
    response.render("main/sobre")
}

const auth = (req,res) => {
    if(!('usuario' in req.cookies)){
        res.cookie('usuario', 3452)
        res.send('Usuário identificado')
    } else {
        res.send('Usuário já tinha sido identificado')
    }
} 

const signup = async (req, res) => {
    if(req.route.methods.get){
       const cursos = await Curso.findAll(); 
       res.render("main/signup", {
        cursos: cursos.map(curso => curso.toJSON())
       })
    } else {
        bcrypt.genSalt(parseInt(process.env.ROUNDS), (err, salt) => {
            bcrypt.hash(req.body.senha, salt, async (err, hash) => {
                try{
                    await User.create({
                        nome: req.body.nome,
                        email : req.body.email,
                        senha: hash,
                        cursoId: req.body.cursoId
                    })
                    res.redirect("/")
                } catch(err){
                    console.log(err)
                }
            })
        })
    }
}
const login =  async (req, res) => {
    if(req.route.methods.get){
        res.render("main/login")
    } else {
        const user = await User.findOne({ where: {email:req.body.email}})
        if(user){
            bcrypt.compare(req.body.senha, user.senha, (err, ok) => {
                if(ok){ //existe apenas no servidor 
                    req.session.uid = user.id
                    res.redirect("/")
                } else {
                    res.redirect("/login")
                }
            })
        } else {
            res.redirect("/login")
        }
    }
}
const logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.redirect("/")
            console.log(err)
        } else {
            res.redirect("/login")
        }
    })
}
//sessões apenas 1 cookie é armazenado, as variaveis ficam no lado do server. Cookies são armazenados no browser do usuário
module.exports = {index,sobre, auth, signup, login, logout}