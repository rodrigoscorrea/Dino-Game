function logger(type) {
    if(type == "complete"){
        return (req,res,next) => {
            const date = new Date()
            console.log(`${date} ${req.method} ${req.url}`)
            next()
        }
    } else if(type == "tiny"){
        return (req,res,next) => {
            const date = new Date()
            console.log(`${req.url}`)
            next()
        }
    }
}

module.exports = logger