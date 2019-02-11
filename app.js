var express=require('express');
var app=express();
var path=require('path')
var index=require('./Routes/index')
var bodyParser=require('body-parser')
var fileUpload=require('express-fileupload')
var flash=require('express-flash')
var mysql=require('mysql')
var myConnection=require('express-myconnection')
var session=require('express-session')
var MySQLStore=require('express-mysql-session')(session);
var configurations=require('./mysqlConfig')
var dbOptions={
  host:configurations.database.host,
  user:configurations.database.user,
  password:configurations.database.password,
  port:configurations.database.port,
  database:configurations.database.database,
}
var sessionStore=new MySQLStore(dbOptions);
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'/Public')))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(fileUpload())
app.use(flash());
app.use(session({
	secret: 'we never give up and we always reach our destination everytime',
  store:sessionStore,
	resave: false,
	saveUninitialized: true,
	 saveUninitialized: false
}))


app.listen(7001)
app.use(myConnection(mysql,dbOptions,'pool'));
app.use('/',index)
console.log('Yupiiii The server is started and listening on port:7001 :)')
