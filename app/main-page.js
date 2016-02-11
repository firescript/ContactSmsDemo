var app = require('application');
var contacts = require('nativescript-contacts');
var messenger = require('nativescript-messenger');
var model = require("./main-view-model");

exports.pageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = model;    
}

exports.getContact = function(args){
    contacts.getContact().then(function(args){        
        
            // contacts.getContact() returns an object containing the contacts data
            var contact = args.data;        
            // lets assign the first and last name to the contact_name property
            model.contact_name = contact.name.given + " " + contact.name.family;    
            // lets check to make sure we have a phone number before assigning it to the 
            // property in our model        
            if(contact.phoneNumbers.length > 0){
                // we just want the first phone number in this case
                model.phone = contact.phoneNumbers[0]
            }
            
    });
}

exports.sendMessage = function(args){
    var phonenumber = model.phone;
    messenger.send(phonenumber, "my message", "my subject").then(function(args){
        alert("Message sent to: " + phonenumber);
    }, function (e) {
        // if something went wrong
        alert(e.toString());
        console.log("Error occurred " + e);
    });  
}