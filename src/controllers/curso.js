const models = require("../models/index");
const Curso = models.Curso;
const Op = models.Sequelize.Op;
const Area = models.Area;

const index = async (req, res) => {
    const cursos = await Curso.findAll();
    res.render("curso/index",{
        cursos: cursos.map((curso)=> curso.toJSON())
    })
}
const create = async (req, res) => {
    if(req.route.methods.get){ 
        res.render("curso/create");
    } else {
        try {
            await Curso.create(req.body); //req.body = dados enviados pela requisição (formulário)
            res.redirect("/");
        } catch(err){
            throw new Error(err);
        }
    }
    
}

const read = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findOne({where: { id }, include:models.Area });
    res.render("curso/read",{
        curso: curso.toJSON()
    })

}
const update = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findOne({where: { id }, include:models.Area });
    if(req.route.methods.get){ 
        res.render("curso/update", {
            curso: curso.toJSON()
        });
    } else { //se for POST
        try {
            var seletor = { 
                where: {id}
            }
            
            await Curso.update({
                sigla: req.body.sigla,
                nome: req.body.nome,
                descricao: req.body.descricao,
                areaId: req.body.areaId,
            }, seletor);  
            
            res.redirect("/");
        } catch(err){
            throw new Error(err);
        }
    }  
}
const remove = async (req, res) => { //delete , mas é palavra reservada
    const { id } = req.params;
    try {
        await Curso.destroy({
            where: {id:id}
        })
        res.redirect("/curso")
    } catch(err){
        throw new Error(err)
    }
}  

module.exports = {index, create, read, update, remove}