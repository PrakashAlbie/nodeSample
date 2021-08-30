const express=require('express');
const mongoose=require('mongoose');
const { render } = require('ejs');
const blogRoute=require('./routes/blogRoutes')


const app=express();

//connect to mongodb
const dbURI='mongodb+srv://prakash1:albie7398@blogs.npn8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true}) //this is a asynchronous method and takes some time to load
 .then((result) => app.listen(8080))
 .catch((err) => console.log(err));

//register view engine
app.set('view engine','ejs'); // this will take current directory

//middle & static files(files that are public)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));

app.get('/about',(req, res) => {
    const pageTitle='About';
    res.render('about',{pageTitle});
})

app.get('/',(req, res) => {
    res.redirect('/blogs');
})

//blog routes
app.use('/blogs',blogRoute);

app.use((req,res) => {
    //const pageTitle='404';
    res.status(404).render('404',{pageTitle:'404'});
})

