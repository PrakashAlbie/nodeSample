const Blog =require('../models/blogs')

blog_index =(req, res) => { 
    const pageTitle='All Blogs'
    Blog.find()  //sort({ createdAt: -1})
    .then((result) => {
        res.render('blogs/index',{pageTitle, blogs : result})
    })
    .catch((err) => {
        console.log(err);
    })
};

blog_create_post=(req, res)=> {
    const blog = new Blog(req.body);
    blog.save()
    .then((result) =>{
        res.redirect('/blogs');
    })
    .catch((err) => console.log(err))  
};

blog_create_get= (req,res) => {
    const pageTitle='CreateBlog';
    res.render('blogs/create',{pageTitle});
};

blog_details=(req,res) => {
    const pageTitle='Blog Details';
    const id= req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('blogs/details',{blog: result, pageTitle});
    })
    .catch((err) => {
        res.render('404',{pageTitle:'404'})
        console.log(err);
    })
};

blog_update_get=(req,res) => {
    const pageTitle='Update';
    const id=req.params.id;
  
    Blog.findById(id)
    .then(result => {
         res.render('blogs/update',{pageTitle, blogs: result});
    })
    .catch(err => console.log(err));
}

blog_update_post=(req,res)=> {
    const id =req.params.id;
    console.log(id);
    const {title,snippet,body}=req.body;

    const updatedPost={title,snippet,body, _id:id};

    console.log("Updated Post: " +updatedPost);

    Blog.findByIdAndUpdate(id,updatedPost,{new:true})
    .then(result => {
        res.redirect('/blogs');
    })
    .catch(err => console.log(err))
};


blog_delete=(req,res) => {
    const id= req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/blogs'})
    })
    .catch(err => console.log(err))
};

module.exports={
    blog_index,
    blog_create_post,
    blog_create_get,
    blog_details,
    blog_update_get,
    blog_update_post,
    blog_delete
}