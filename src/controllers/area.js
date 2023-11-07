const models = require("../models/index")
const Area = models.Area;

async function index(req, res){
    const areas = await Area.findAll()
    
    res.render("area/index", {
        areas: areas.map((area) => area.toJSON())
    })
}



module.exports = { index }