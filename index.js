// express config and the view engine (ejs)
const express = require('express');
const app = express();
const ejs = require('ejs');
app.set("view engine", "ejs")

// Middleware for serving static files from the 'public' directory and bodyparser
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//port  
const port = process.env.PORT || 3010;

// variable
const list = []

// Routes
app.get('/', (req,res)=>{
    res.render('index', {list});
})
app.get('/noise',(req,res)=>{
    res.render('noise');
})

app.post('/noiseMaker',(req,res)=>{
    const name = req.body.name;
    const user = {name,
        num : 0
    };
    list.push(user)
    res.redirect('/');
})
// delete
app.post('/del',(req,res)=>{
    const index = req.body.index;
    list.splice(index, 1);
    res.redirect('/');
})

//edit
app.post('/edit',(req,res)=>{
    const index = req.body.index;
    res.render('edit', {index, list});
})

app.post('/edited',(req,res)=>{
    const {name, index} = req.body;
    let numb = list[Number(index)].num
    const editedUser = {name,
        num : numb
    };
    list.splice(index,1,editedUser);
    res.redirect('/');
})
app.post('/dec',(req,res)=>{
    const index = req.body.index;
    // let numb = list[index].num;
    if ( list[index].num > 0) {
        list[index].num -= 1;
    }else{
        list[index].num = 0;
    }
    res.redirect('/');
})
app.post('/inc',(req,res)=>{
    const index = req.body.index;
    list[index].num += 1;
    res.redirect('/');
})
app.listen(port, (err)=>{
    if(err) console.log(err);
    console.log(`Server running on port ${port}`);
})
