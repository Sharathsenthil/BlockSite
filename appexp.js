const express = require('express');
const morgan =require('morgan');
const mongoose=require('mongoose');
const Anime=require('./models/Anime');
const { result } = require('lodash');

//urlstring
const dburl='mongodb+srv://sharath:spooky03@shacluster.7h8q1to.mongodb.net/?retryWrites=true&w=majority';

//connect mongoose
mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>console.log(app.listen(3000)))
.catch((err)=>console.log(err));
// express app
const app = express();


// listen for requests
//app.listen(3000);


//external middleware and static files
app.use(express.static('public'));

//to show and access data stored in create.ejs
app.use(express.urlencoded({extended:true}));

//app.set('views','myviews');
// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');


//external middleware....
app.use(morgan('dev'));
app.use(morgan('tiny'));




//middleware
app.use((req,res,next)=>
{
    //console.log('middleware is running');
    next();//to run next get ...if not given next prgm get stuck...🤣🤣
});
app.get('/', (req, res) => {
   res.redirect('/home');
  // const blogs = [
  //   {title: 'tokyo revengers', snippet: 'genre: Love Action Drama'},
  //   {title: 'attack on titan ', snippet: 'genre: Action Adventure Drama Fantasy Horror'},
  //   {title: 'dead note', snippet: 'genre: Crime Drama Fantasy Mystery Thriller'},
  //   {title: 'demon slayer', snippet: 'genre: Action Adventure Fantasy Thriller'},
  //   {title: 'jujustu kaisen',snippet: 'genre: Action Adventure Fantasy Thriller'}
  // ];
  // res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/home/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});
//backend mongodb
app.get('/add',(req,res)=>
{
  const blog=new Anime(
    {
    anime:'attack on titan',
    animegenre:'Action Adventure Drama Fantasy Horror',
    });
    blog.save()
    .then((result)=>
    {
      res.send(result)
    })
    .catch((err)=>
    {
      console.log(err);
    });
});
//redirect to index 
app.get('/home',(req,res)=>
{
  Anime.find().sort({createdAt:-1})
 .then((result)=>
 {
  res.render('index',{title:'Diaries',blogs:result})
 })
 .catch((err)=>
 {
  console.log(err);
 });
});
//post method in form
app.post('/home',(req,res)=>
{
  const blog=new Anime(req.body);
  //console.log(req.body);
  blog.save()
    .then(result => {
      res.redirect('/home');
    })
    .catch(err => {
      console.log(err);
    });
});
app.get('/anime/:id', (req, res) => {
  const id = req.params.id;
  Anime.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log(err);
    });
});
//find the document
app.get('/find',(req,res)=>
{
  Anime.find()
  .then((result)=>
  {
    res.send(result);
  })
  .catch((err)=>
  {
    console.log(err);
  });
});
//find by id
app.get('/findid',(req,res)=>
{
  Anime.findById('6416da3be4e2b33fa22671a0')
  .then((result)=>
  {
    res.send(result);
  })
  .catch((err)=>
  {
    console.log(err);
  });
});
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
