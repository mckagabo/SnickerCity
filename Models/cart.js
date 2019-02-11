var mysql=require('mysql');
var poolConfig=require('../mysqlConfig')
var pool=mysql.createPool(poolConfig.database);


 function addShoe(snicker){
   return new Promise(function(resolve,reject){
     pool.getConnection(function(error,connection){
       if(error) reject(error);
       connection.query('insert into cart set ?',snicker,function(err,results){
       connection.release();
       if(err){
         reject(err)
       }else{
         resolve(results)
       }
     })
     })
   })
 }

function checkCart(sessionID,productID){
   return new Promise(function(resolve,reject){
     pool.getConnection(function(error,connection){
       if(error)reject(error);
       connection.query('select * from cart where sessionID=? and productID=?',[sessionID,productID],function(err,rows,fields){
         connection.release();
         if(err){
           reject(err);
         }else{
           if(rows.length>0){
             var prodID=rows[0].productID;
            resolve(prodID)
        }else{
          var prodID="kimya";
          resolve(prodID);
        }
         }
       })
     })
   })
}
function howManyItems(sessionID){
  return new Promise(function(resolve,reject){
    pool.getConnection(function(err,connection){
      if(err)reject(err);
      connection.query('select sum(quantity) as total from cart where sessionID=?',sessionID,function(error,rows,fields){
        connection.release();
        if(error){
          reject(error);
          //resolve('0')
        }else{
          //resolve(results);
          if(rows.length>0){
            resolve(rows);
          }else{
            resolve(0);
          }
        }
      })
    })
  })
}
function totalAmount(sessionID){
  return new Promise(function(resolve,reject){
    pool.getConnection(function(err,connection){
      if(err)reject(err);
      connection.query('select sum(quantity * unitPrice) as total from cart where sessionID=?;',sessionID,function(error,rows,results){
        connection.release();
        if(error){
          reject(error);
        }else{
          resolve(rows);
        }
      })
    })
  })
}
function allItemsInCart(sessionID){
  return new Promise(function(resolve,reject){
    pool.getConnection(function(err,connection){
      if(err)reject(err)
      connection.query('select * from cart where sessionID=?',sessionID,function(error,rows,results){
        connection.release();
        if(error){
          reject(error)
        }else{
          resolve(rows);
        }
      })
    })
  })
}
function updateCart(quantity,sessionID,productID){
  return new Promise(function(resolve,reject){
    pool.getConnection(function(err,connection){
      if(err)reject(err);
      connection.query('update cart set quantity=? where sessionID=? and productID=?',[quantity,sessionID,productID],function(err,results){
        connection.release();
        if(err){
          reject(err)
        }else{
          resolve(results);
        }
      })
    })
  })
}
function removeCart(sessionID,productID){
  return new Promise(function(resolve,reject){
    pool.getConnection(function(err,connection){
      if(err)reject(err);
      connection.query('delete from cart where sessionID=? and productID=?',[sessionID,productID],function(err,results){
        connection.release();
        if(err){
          reject(err)
        }else{
          resolve(results);
        }
      })
    })
  })
}
function removeAllCart(sessionID){
  return new Promise(function(resolve,reject){
    pool.getConnection(function(err,connection){
      if(err)reject(err);
      connection.query('delete from cart where sessionID=?',[sessionID],function(err,results){
        connection.release();
        if(err){
          reject(err)
        }else{
          resolve(results);
        }
      })
    })
  })
}
 module.exports.deleteAll=removeAllCart;
 module.exports.deleteCart=removeCart;
 module.exports.totalCash=totalAmount;
 module.exports.editCart=updateCart;
 module.exports.cartItems=allItemsInCart;
 module.exports.addTocart=addShoe;
 module.exports.checkIt=checkCart;
 module.exports.itemNumbers=howManyItems;
