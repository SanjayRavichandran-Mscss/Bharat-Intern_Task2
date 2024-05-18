const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const mongoDBURI = 'mongodb+srv://sanjayravichandran006:SanjaySanjay.@cluster0.6ab3sde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoDBURI)
.then(() => {
    console.log('App is connected to MongoDB Atlas');
    const PORT = 3000;
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })

  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.get('/',async(req,res)=>{
   const articles =await Article.find().sort({createdAt:'desc'})
    res.render('articles/index',{articles:articles});
})

app.use('/articles',articleRouter)

