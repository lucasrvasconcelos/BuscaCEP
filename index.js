const express = require("express")
const app = express()
const handlebars = require("express-handlebars");
const port = process.env.PORT || 3000 

app.use(express.static("public"))

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) =>{
    res.render("buscacep")
})

app.get('/home', (req, res) =>{
    res.send("Página home")
})

app.listen(port, () => {
    console.log("Conectado a porta " + port)
})