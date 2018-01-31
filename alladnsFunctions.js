  /* Copyright (c) 2017, Sejong University. All rights reserved

  oneM2M ADN Profiles 1-4, CRUD functions for Testing with oneM2MTester
  This document contains the implementation code of oneM2M ADN profiles 1-4 CRUD hadnling according to oneM2M specifications. oneM2M is open standard for IoT. The purpose of this implementation is Testing.
  Author : Abdullah Aziz
  Email : mister.abdullah.aziz@gmail.com
  */

  var request = require('request-promise');
  var cseName = "/Mobius"; // to concatenate with url in any request
  var aeNameForUpdate = "/ae_test";
  var cnt_test = "/cnt_test";
  var cinLatest = "/latest";
  var cinOldest = "/oldest";
  var cinName = "/my_ressource";

  var testerIP = "http://192.168.0.12:4000";
  var origin = "S";

  //===========  Fundamental features ==========//

  // ### Create request
  exports.create = function(url,ty,body){
    console.log("Create Request....");
    var headers={
      'X-M2M-Origin': origin,
      'X-M2M-RI' :12345,
      'Content-Type': 'application/json;ty='+ty
      };
      const options = {
        headers: headers,
        method: 'POST',
        uri: testerIP+url,
        body: JSON.stringify(body) 
      };
      request({
        headers: headers,
        url:testerIP+url,
        method:'POST',
        body:
            JSON.stringify(body)
      },function(error, response, body)
      {
        if(!error)
        {
           try {
            var obj = JSON.parse(body);
          console.log("Response=",obj)
          } catch (e) {
            return console.error(e);
          }
        }
        else
        {
           console.log("error is: "+ error);
        }
      });
  }

  // ****************** Update Request

  exports.update =function (url,body){
    console.log("Update Function");
    var headers={
      'X-M2M-Origin': origin,
      'X-M2M-RI' :12345,
      'Content-Type': 'application/json'
      };
      request({
        headers: headers,
        url:testerIP+url,
        method:'PUT',
        body:
            JSON.stringify(body)
      },function(error, response, body)
      {
        if(!error)
        {
          var obj = JSON.parse(body);
          console.log("Response=",obj)
        }
        else
        {
           console.log("error is: "+ error);
        }
      });
  }

  // ******************** Get Request

  exports.get = function(url){
    console.log("Retrieve Function");
    var headers={
      'X-M2M-Origin': origin,
      'X-M2M-RI' :12345,
      'Content-Type': 'application/json'
      };
      const options = {
        headers: headers,
        method: 'GET',
        uri: testerIP+url
          // JSON stringifies the body automatically
      };
         request(options)
      .then(function (response) {
        // Handle the response
        console.log(response);

      })
      .catch(function (err) {
        // Deal with the error
        console.log(err);

      });
  }

  // ************* Delete Request

  exports.delete = function(url){
    console.log("Delete FUnction");
    var headers={
      'X-M2M-Origin': origin,
      'X-M2M-RI' :12345,
      'Content-Type': 'application/json'
      };
      request({
        headers: headers,
        url:testerIP+url,
        method:'DELETE'
      },function(error, response, body)
      {
        if(!error)
        {
          var obj = JSON.parse(body);
          console.log("Response=",obj)
        }
        else
        {
           console.log("error is: "+ error);
        }
      });
  }
