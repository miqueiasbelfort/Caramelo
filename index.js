const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()
const port = 3000

//Chamando o a conecção com o banco de dados
const conn = require('./db/conn')

//Chamando os Models
const User = require('./models/User')
const InsurancesHel = require("./models/InsurancesHel")
const MyInsurances = require("./models/MyInsurances")
const Likes = require("./models/LikesOfInsurances")

// Importando as rotas
const authRoutes = require('./routers/authRoutes')
const insuranceRoutes = require("./routers/insuranceRoutes")

// configurações do handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// configuração para pegar os dados do body
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// configuração da session *Lugar onde fica as interações do usuário com a página
app.use(
    session({
        name: "session",
        secret: "pet_and_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), "session")
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

//configuração das mensagens de flash (Alertas)
app.use(flash())

// Arquivos css e imagem
app.use(express.static('public'))

// Salvar a session na resposta
app.use((req, res, next) => {
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})

// Rotas
app.use("/", authRoutes)
app.use("/insurance", insuranceRoutes)

// Rondando a conexão com o banco de dados
conn.sync(/*{force: true}*/).then(() => app.listen(port)).catch(err => console.log(err))