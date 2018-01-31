var request = require('request');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var jsonfile = require('jsonfile');
var file = './adn3.json';

var allAdns = require("./alladnsFunctions.js");

app.post('/', function (req, res) {
	console.log("request received");
	var pc = false;
	var op = null;
	var ty = -1;
	var to = null;
	var rqi;

// AE Mandatory attributes
	var api= "0.2.481.2.0001.001.000111";
	var rr="true";

//Optional Attributes
	var lbl=["my_label"];
	var rn="my_ressource";
	var et="20180101T000000";
	var apn="my_application";
	var poa=["http://127.0.0.1:42"];
	var nl="my_node";
	var csz="JSON";
	var cr="my_creator";
	var mni="100";
	var mbs="10000";
	var mia="500";
	var cnf="text/json";
	var conr="content_ref";
	var con="1";

	var requestType = req.get('content-type');

	var body = {};			
	console.log(req.body);

	if(!req.body.hasOwnProperty("rqp") || requestType != "application/json" || !req.body.rqp.hasOwnProperty("to") || !req.body.rqp.hasOwnProperty("op")){
			console.log("error rqp, content-type, to, op");
			var err = new Error("BAD_REQUEST");
			return next(err);
	}
	try{	
// jsonfile.writeFile(file, req.body, {flag: 'a',spaces: 2, EOL: '\r\n'}, function (err) {
// 	  console.error(err)
// 	});
// 	})
			if(req.body.rqp.hasOwnProperty("rqi"))
				rqi = req.body.rqp.rqi;
			console.log("rqi: "+ rqi);
			// mandatory attribute
			if(req.body.rqp.hasOwnProperty("to")){
				if(req.body.rqp.to[0] != '/')
					to = '/' + req.body.rqp.to;
				else if(req.body.rqp.to[0] == '/' && req.body.rqp.to[1] == '/')
					to = '/_' + req.body.rqp.to.substring(1,req.body.rqp.to.length);
				else if(req.body.rqp.to[0] == '/' && req.body.rqp.to[1] != '/')
					to = '/~' + req.body.rqp.to;
				console.log(to);
			}
			// mandatory attribute
			if(req.body.rqp.hasOwnProperty("op")){
				if(req.body.rqp.op == "1"){
					op=1;
				}
				else if(req.body.rqp.op == "2"){
					op=2;
				}
				else if(req.body.rqp.op == "3"){
					op=3;
				}
				else if(req.body.rqp.op == "4"){
					op=4;
				}
				else if(req.body.rqp.op == "5"){
					op=5;
				}
				console.log(op);
			}
			// optional attribute
			if(req.body.rqp.hasOwnProperty("ty")){
				if(req.body.rqp.ty == "1")
					ty=1;
				else if(req.body.rqp.ty == "2")
					ty=2;
				else if(req.body.rqp.ty == "3")
					ty=3;
				else if(req.body.rqp.ty == "4")
					ty=4;
				else if(req.body.rqp.ty == "5")
					ty=5;
				else if(req.body.rqp.ty == "23")
					ty=25;
				console.log(ty);
			}
			// optional attribute
			if(req.body.rqp.hasOwnProperty("pc")){
				var ae;
				pc = req.body.rqp.pc;
				//pc = req.body.rqp.uh;
				if(pc.hasOwnProperty("m2m:ae") || pc.hasOwnProperty("ae") || pc.hasOwnProperty("aE")){
					ae = pc["m2m:ae"] || pc["ae"] || pc["aE"];
					body["m2m:ae"] = pc["m2m:ae"] || pc["ae"] || pc["aE"];
					ty = 2;
				}
				if(pc.hasOwnProperty("m2m:cnt") || pc.hasOwnProperty("cnt") || pc.hasOwnProperty("container")){
					ae = pc["m2m:cnt"] || pc["cnt"] || pc["container"];
					body["m2m:cnt"] = pc["m2m:cnt"] || pc["cnt"] || pc["container"];
					ty = 3;
				}
				if(pc.hasOwnProperty("m2m:cin") || pc.hasOwnProperty("cin") || pc.hasOwnProperty("contentInstance")){
					ae = pc["m2m:cin"] || pc["cin"] || pc["contentInstance"];
					body["m2m:cin"] = pc["m2m:cin"] || pc["cin"] || pc["contentInstance"];
					ty = 4;		
				}
				console.log(ae);
				Object.keys(ae).forEach(function(k){
				   if(k == "lbl")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = lbl;
					}
					else if(k == "rn")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = rn;
					}
					else if(k == "api")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = api;
					}
					else if(k == "et")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = et;
					}
					else if(k == "apn")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = apn;
					}
					else if(k == "api")
					{
						if(ae[k] == "UNINITIALIZED")
							api=ae[k];
					}
					else if(k == "poa")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = poa;
					}
					else if(k == "nl")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = nl;
					}
					else if(k == "csz")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = csz;
					}
					else if(k == "rr")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = rr;
					}
					else if(k == "cr")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = cr;
					}
					else if(k == "mni")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = mni;
					}
					else if(k == "mbs")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = mbs;
					}
					else if(k == "mia")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = mia;
					}
					else if(k == "cnf")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = cnf;
					}
					else if(k == "conr")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = conr;
					}
					else if(k == "apn")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = apn;
					}
					else if(k == "con")
					{
						if(ae[k] == "UNINITIALIZED")
							ae[k] = con;
					}
				});
				console.log(body);
				body[Object.keys(body)[0]] = ae;
			}
			console.log("ty: "+ ty);
			console.log("to: "+ to);
			console.log("op: "+ op);
			console.log("body : " );
			console.log(body);
			if(body.hasOwnProperty("m2m:cin")){
				console.log(body["m2m:cin"]);
				if(Object.keys(body["m2m:cin"]).length == 0){
					console.log("inside empyt");
					body["m2m:cin"]={"con": "on"};
					console.log(body);
				}
			}
			// chooseFunction(to, op, ty, body);
	// 		jsonfile.writeFile(file, req.body, {flag: 'a',spaces: 2, EOL: '\r\n'}, function (err) {
	//   console.error(err)
	// });
			//get();
}catch(error){
	next(error);
}
res.status= 2000;
res.setHeader('X-M2M-RSC', 2000);
res.setHeader('X-M2M-RI', 2000);
  res.send({
  'rsp': {
  	"rsc" : 2000,
  	"rqi" : 'asdas'
  }
});
  chooseFunction(to, op, ty, body);
})


app.use(function(err, req, res, next) {
res.setHeader('X-M2M-RSC', 4000);
   res.status(400).send({
  'rsp': {
  	"rsc" : 4000
  }
});
});


app.listen(3000, function () {
  console.log('Upper Testing is listening on port 3000!')
})

function chooseFunction(to, op, ty, body){
	if(op == 1 ){
		allAdns.create(to, ty, body);
	}
	else if(op == 2 ){
		allAdns.get(to, ty, body);
	}
	else if(op == 3 ){
		allAdns.update(to,body);
	}
	else if(op == 4 ){
		allAdns.delete(to);
	}

}