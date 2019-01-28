var express=require('express')
var app=express();
var index=require('./home')
var admin=require('./admin')
var cart=require('./cart')

app.use('/',index)
app.use('/admin',admin)
app.use('/cart',cart)
module.exports=app;
