var express=require('express');
var app=express();
var snicker=require('../Models/snickers')
var dateFormat=require('dateformat')
var cartOptions=require('../Models/cart');


app.get('/',function(req,res,next){

  var allShoes=snicker.allShoes();
   allShoes.then(function(results){
        var countItems=cartOptions.itemNumbers(req.sessionID);
     countItems.then(function(items){
         res.render('index',{title:'Snicker City',snickers:results,format:dateFormat,number:items[0].total});
         console.log(items.total)
     }).catch(function(err){
          res.render('index',{title:'Snicker City',snickers:results,format:dateFormat,number:0});
     })

   }).catch(function(error){
       res.render('index',{title:'Snicker City',snickers:'',format:dateFormat});
   })

})

app.get('/details/:model/:shoeID',function(req,res,next){
     var snickerModel=req.params.shoeID;
   var snickerDetails=snicker.shoeDtails(req.params.shoeID)
   snickerDetails.then(function(results){
     var countItems=cartOptions.itemNumbers(req.sessionID);
      countItems.then(function(items){
         res.render('shoeDetails',{title:snickerModel,details:results,format:dateFormat,number:items[0].total})
      }).catch(function(err){
         res.render('shoeDetails',{title:snickerModel,details:results,format:dateFormat,number:0})
      })
   }).catch(function(err){
       res.render('shoeDetails',{title:'Snicker City',details:'',format:dateFormat})
   })

})
module.exports=app;
