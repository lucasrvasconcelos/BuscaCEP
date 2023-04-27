const express = require("express")
const app = express()
const handlebars = require("express-handlebars");

app.use(express.static("public"))

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) =>{
    res.render("buscacep")
})

app.listen(3000, () => {
    console.log("Conectado a porta 3000")
})