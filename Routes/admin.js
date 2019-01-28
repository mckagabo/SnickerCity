var express=require('express');
var app=express();
var randomToken=require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
var snicker=require('../Models/snickers')

app.get('/upload',function(req,res,next){
   res.render('shoeUpload',{title:"Upload a shoe"})
})

app.post('/upload',function(req,res,next){
  var pic1=req.files.pic1;
  var pic2=req.files.pic2;
  var pic3=req.files.pic3;
  var picName1=randomToken(10)+req.files.pic1.name;
  var picName2=randomToken(10)+req.files.pic2.name;
  var picName3=randomToken(10)+req.files.pic3.name;

     var shoe={
          productName:req.body.model,
          description:req.body.desc,
          price:req.body.price,
          currency:'rwf',
          pic1:picName1,
          pic2:picName2,
          pic3:picName3,
          updateTime:new Date(),
          createdBy:'Cedric Kagabo',
          status:'Available',
          releaseDate:req.body.releaseDate,
          model:req.body.category
        }
    var addSnicker=snicker.addShoe(shoe);
    addSnicker.then(function(results){
      pic1.mv('Public/images/'+picName1,function(err){
                if(err)req.flash('error','Error saving profile picture try again!');
             })
      pic2.mv('Public/images/'+picName2,function(err){
        if(err)req.flash('error','Error saving profile picture try again!');
      })
      pic3.mv('Public/images/'+picName3,function(err){
                if(err)req.flash('error','Error saving profile picture try again!');
             })
        req.flash('success',shoe.productName+' succesfully added');
      res.render('shoeUpload',{title:'Snicker City'});
    }).catch(function(err){
      req.flash('error','Sory'+err)
      res.render('shoeUpload',{title:'Snicker City'})
    })

  console.log(shoe);
})

module.exports=app;
