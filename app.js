const express = require('express')

const app = express()

const bodyparser = require('body-parser')

var _ = require('lodash');
 
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogdb",{useNewUrlParser:true})

const postschema=new mongoose.Schema({
  title:String,
  post:String
})
const post=mongoose.model("post",postschema)

let posts=[]
//const posts=[]


const home =
'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.'

posts.push(home)
const about=
'Its not only writers who can benefit from this free online tool. If youre a programmer whos working on a project where blocks of text are needed, this tool can be a great way to get that. Its a good way to test your programming and that the tool being created is working well'

const contact=
'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur totam maiores tempora, perferendis dolores cumque reprehenderit maxime aliquid eaque delectus facilis repellat dolore! Iste nobis nihil et dolores quidem nostrum'
app.engine('ejs', require('ejs').__express);


app.use(bodyparser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {

 
          res.render("home",{
          start:home,
          postss:posts
       
})
})

app.get('/about', (req, res) => {
    res.render("about",{
       about:about
    }); 
})

app.get('/contact', (req, res) => {
    res.render("contact",{
    contact:contact
    }); 
})


app.get('/compose', (req,res)=>{
  res.render("compose")
})


app.post('/compose',(req,res)=>{
   

  const postss=new post({
    title:req.body.title,
    post:req.body.post
  })
  postss.save();
  posts.push(postss)
  

  res.redirect("/")
})
app.get("/posts/:postid",(req,res)=>{
  const reqpostid= _.lowerCase(req.params.postid);
  
  posts.forEach((post) => {
    
    
    
      const storedtitle=_.lowerCase(post.title);
      if(storedtitle===reqpostid);
      res.render("post",{
       title:post.title,
       bodyis:post.post
      })
    
  });
})




app.listen(3000, () => {
  console.log('Server started at port 300')
})
