var mysql=require('mysql');
var poolConfig=require('../mysqlConfig')
var pool=mysql.createPool(poolConfig.database);



function addSnicker(shoe){
  return new Promise(function(resolve,reject){
    pool.getConnection(function(error,connection){
      if(error) reject(error);
      connection.query('insert into product set ?',shoe,function(err,results){
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


function getShoes(){
        return new Promise(function(resolve,reject){
          pool.getConnection(function(err,connection){
            if(err)reject(err);
            connection.query('select * from product order by releaseDate desc',function(err,results){
               connection.release();
              if(err){
                reject(err);
              }else{
                resolve(results);
              }
            })
          })
        })
      }
  function oneShoe(shoeID){
    return new Promise(function(resolve,reject){
        pool.getConnection(function(error,connection){
          if(error)throw error;
          connection.query('select * from product where productID=?',[shoeID],function(err,rows,fields){
            connection.release();
            if(err){
              reject(err);
            }else{
              if(rows.length>0){
                resolve(rows);
              }else{
                reject(rows);
              }
            }
          })
        })
      })
  }
  function shoeByDate(releaseDate){
     return new Promise(function(resolve,reject){
       pool.getConnection(function(error,connection){
         if(error)reject(error);
         connection.query('select * from product where releaseDate=?',[releaseDate],function(err,rows,fields){
           connection.release();
           if(err)reject(err);
           if(rows.length>0){
              resolve(rows);
           }else{
             reject(rows);
           }
         })
       })
     })
  }

module.exports.snickD=shoeByDate;
module.exports.addShoe=addSnicker;
module.exports.allShoes=getShoes;
module.exports.shoeDtails=oneShoe;
