const express = require("express")
const handlebars = require("express-handlebars")
const logger = require("./middlewares/logger.js")
const router = require("./router/router.js")
const sass = require("node-sass-middleware")
const cookieParser = require("cookie-parser")
const uuid = require('uuid')
const session = require('express-session')
const morgan = require('morgan')

require("dotenv").config()
const app = express()


const PORT = process.env.PORT ? process.env.PORT : 3456


app.engine("handlebars", handlebars.engine()); //express agr reconhece a engine
app.set("view engine","handlebars");
app.set("views", `${__dirname}/views`);

//app.use(morgan('tiny')) Já estamos fazendo uso do Logger que criamos, ia ficar bem poluído o terminal com o morgan, mesmo ele em modo 'tiny'

app.use(sass({
    src: `${__dirname}/../public/scss`,
    dest: `${__dirname}/../public/css`,
    outputStyle: "compressed",
    prefix: "/css"
}))


app.use(logger("complete"))
app.use(cookieParser()) 

app.use(session({
    genid: () => uuid.v4(),
    secret: "Sm$dJS45Mda@g",
    resave: true,
    cookie:{
        maxAge: 2 * 60 * 1000  //usuário pode ficar logado por 2 hrs sem acessar o servidor até ser deslogado por inatividade
    },
    saveUninitialized: true //identifica até usuário que ainda não se identificou (útil para carrinhos de compra sem login feito)
}))

app.use((req,res, next) => {
    app.locals.logado = !!req.session.uid;    
    next()
})

app.use(express.urlencoded({extended:false}))
app.use("/img", express.static(`${__dirname}/../public/img`))
app.use("/css", express.static(`${__dirname}/../public/css`))
app.use("/webfonts", express.static(`${__dirname}/../node_modules/@fortawesome/fontawesome-free/webfonts`))
app.use('/js',[
    express.static(`${__dirname}/../public/js`),
    express.static(`${__dirname}/../node_modules/bootstrap/dist/js`)
]);
app.use(router)

app.listen(PORT)
