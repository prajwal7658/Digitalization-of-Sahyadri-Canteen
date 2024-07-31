const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")

const tempelatePath = path.join(__dirname, '../tempelates')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempelatePath)
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/brand')));
app.use(express.static(path.join(__dirname, '../public/chef')));
app.use(express.static(path.join(__dirname, '../public/blog')));
app.use(express.static(path.join(__dirname, '../public/dish')));
app.use(express.static(path.join(__dirname, '../public/testimonials')));
app.use(express.static(path.join(__dirname, '../public/juice')));
app.use(express.static(path.join(__dirname, '../public/images')));

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, '../tempelates', 'home.html'));
})

app.post("/signup", async (req, res) => {

    const data = {
        name:req.body.name,
        password:req.body.password
    }

    await collection.insertMany([data])

    res.render("login")
})

app.post("/login", async (req, res) => {

    try {
        const check = await collection.findOne({name:req.body.name})

        if(check.password === req.body.password) {
            res.sendFile(path.join(__dirname, '../tempelates', 'home.html'));
        } else {
            res.send("Wrong username or password")
        }
    } catch {
        res.send("Wrong details")
    }
})

app.listen(3000, () => {
    console.log("port connected");
})