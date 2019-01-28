var express=require('express');
var app=express();
var cartOptions=require('../Models/cart');
var snicker=require('../Models/snickers');
var dateFormat=require('dateformat')


//Thank you Page
app.get('/thanks',function(req,res,next){

  var allShoes=snicker.allShoes();
   allShoes.then(function(results){
        var countItems=cartOptions.itemNumbers(req.sessionID);
     countItems.then(function(items){
        var deleteItems=cartOptions.deleteAll(req.sessionID)
        deleteItems.then(function(ok){
          //res.redirect('/cart/thanks');
          res.render('ThankYou',{title:'Snicker City',snickers:results,format:dateFormat,number:items[0].total});
        //  console.log(items.total)
        }).catch(function(err){
        //  res.render('ThankYou',{title:'Snicker City',snickers:results,format:dateFormat,number:items[0].total});
          console.log(items.total)
        })

     }).catch(function(err){
          res.render('ThankYou',{title:'Snicker City',snickers:results,format:dateFormat,number:0});
     })

   }).catch(function(error){
       res.render('index',{title:'Snicker City',snickers:'',format:dateFormat});
   })
})

//Checkout
app.get('/checkout',function(req,res,next){

  var allItems=cartOptions.cartItems(req.sessionID);
 var countItems=cartOptions.itemNumbers(req.sessionID);
   allItems.then(function(results){
     countItems.then(function(items){
        var cartTotal=cartOptions.totalCash(req.sessionID);
        cartTotal.then(function(cash){
         res.render('checkout',{title:'Checkout Page',number:items[0].total,items:results,total:cash[0].total})
       //  console.log(cash[0].total);
        }).catch(function(err){
         res.render('checkout',{title:'Snicker City',number:items[0].total,items:results,total:0})
        })
   //  res.render('cart',{title:'Snicker City',number:items[0].total,items:results})

     }).catch(function(err){
       req.flash('success','A product is added in cart')
      //  res.redirect("/details/"+results[0].productName+"/"+results[0].productID);
     res.render('checkout',{title:'Snicker City',number:0,items:''})
    })
   }).catch(function(err){
       console.log('Amakosa'+err);
   })
    /*    var countItems=cartOptions.itemNumbers(req.sessionID);
     countItems.then(function(items){
         res.render('checkout',{title:'Checkout',format:dateFormat,number:items[0].total});
         console.log(items.total)
     }).catch(function(err){
          res.render('checkout',{title:'checkCart',format:dateFormat,number:0});
     })*/


})

//displauing the cart page
app.get('/',function(req,res,next){
   var allItems=cartOptions.cartItems(req.sessionID);
  var countItems=cartOptions.itemNumbers(req.sessionID);
    allItems.then(function(results){
      countItems.then(function(items){
         var cartTotal=cartOptions.totalCash(req.sessionID);
         cartTotal.then(function(cash){
          res.render('cart',{title:'Snicker City',number:items[0].total,items:results,total:cash[0].total})
        //  console.log(cash[0].total);
         }).catch(function(err){
          res.render('cart',{title:'Snicker City',number:items[0].total,items:results,total:0})
         })
    //  res.render('cart',{title:'Snicker City',number:items[0].total,items:results})

      }).catch(function(err){
        req.flash('success','A product is added in cart')
       //  res.redirect("/details/"+results[0].productName+"/"+results[0].productID);
      res.render('cart',{title:'Snicker City',number:0,items:''})
     })
    }).catch(function(err){
        console.log('Amakosa'+err);
    })
 /**/
})

//adding to cart
app.post('/',function(req,res,next){
   var cart={
     sessionID:req.sessionID,
     productID:req.body.id,
     productName:req.body.model,
     quantity:1,
     unitPrice:req.body.price,
     size:req.body.sizes,
     model:req.body.category,
     pic:req.body.pic
    }

  var snickerDetails=snicker.shoeDtails(cart.productID)
  snickerDetails.then(function(results){
      var checkCart=cartOptions.checkIt(cart.sessionID,cart.productID);
        var fillThecart=cartOptions.addTocart(cart);
     checkCart.then(function(bougi){
          if(bougi==cart.productID){
      req.flash('error','The cart contain this product already')
      res.render('shoeDetails',{title:'Snicker City',details:results,format:dateFormat,number:''})
        console.log("The cart contain this product already")
          }else {
            //entering a product into the cart
            fillThecart.then(function(result){
              //count the cart
              var countItems=cartOptions.itemNumbers(req.sessionID);
             countItems.then(function(items){
               req.flash('success','A product is added in cart')
              // res.redirect("/details/"+results[0].productName+"/"+results[0].productID);
             res.render('shoeDetails',{title:cart.productName,details:results,format:dateFormat,number:items[0].total})
                console.log('OKKK'+bougi[0])
             }).catch(function(err){
               req.flash('success','A product is added in cart')
              //  res.redirect("/details/"+results[0].productName+"/"+results[0].productID);
             res.render('shoeDetails',{title:cart.productName,details:results,format:dateFormat,number:0})
             })
         }).catch(function(err){
             req.flash('error',''+err)
          res.render('shoeDetails',{title:'Snicker City',details:'',format:dateFormat,number:0})
          console.log("Dore ibibazo unteza"+err)
      })
        }
      }).catch(function(err){
        req.flash('error',''+err)
        res.render('shoeDetails',{title:'Snicker City',details:'',format:dateFormat,number:0})
        console.log('Hey dore sasa:'+err)
      })
  }).catch(function(error){
    req.flash('error',''+err)
      res.render('shoeDetails',{title:'Snicker City',details:'',format:dateFormat,number:0})
          console.log(error)
  })
})
//updating cartItems
 app.post('/update/:id',function(req,res,next){
   var productID=req.params.id;
   var allItems=cartOptions.cartItems(req.sessionID);
  var countItems=cartOptions.itemNumbers(req.sessionID);
    allItems.then(function(results){
      countItems.then(function(items){
          var updateCart=cartOptions.editCart(req.body.qty,req.sessionID,productID)
          updateCart.then(function(ok){
            res.redirect('/cart')
            //  res.render('cart',{title:'Snicker City',number:items[0].total,items:results})
          }).catch(function(err){
              res.render('cart',{title:'Snicker City',number:items[0].total,items:results})
              console.log('Dore re:'+err);
          })


      }).catch(function(err){
        req.flash('success','A product is added in cart')
       //  res.redirect("/details/"+results[0].productName+"/"+results[0].productID);
      res.render('cart',{title:'Snicker City',number:0,items:''})
     })
    }).catch(function(err){
        console.log('Amakosa'+err);
    })

 })

 //deleting from cartItem
 app.post('/delete/:id',function(req,res,next){
   var productID=req.params.id;
   var allItems=cartOptions.cartItems(req.sessionID);
  var countItems=cartOptions.itemNumbers(req.sessionID);
    allItems.then(function(results){
      countItems.then(function(items){
          var deleteCart=cartOptions.deleteCart(req.sessionID,productID)
          deleteCart.then(function(ok){
            res.redirect('/cart')
            //  res.render('cart',{title:'Snicker City',number:items[0].total,items:results})
          }).catch(function(err){
              res.render('cart',{title:'Snicker City',number:items[0].total,items:results})
              console.log('Dore re:'+err);
          })


      }).catch(function(err){
        req.flash('success','A product is added in cart')
       //  res.redirect("/details/"+results[0].productName+"/"+results[0].productID);
      res.render('cart',{title:'Snicker City',number:0,items:''})
     })
    }).catch(function(err){
        console.log('Amakosa'+err);
    })

 })
module.exports=app;
