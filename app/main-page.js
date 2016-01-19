var app = require('application');
var contacts = require('nativescript-contacts');
var messenger = require('nativescript-messenger');
var model = require("./main-view-model");

exports.pageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = model;    
}

exports.getContact = function(args){
    contacts.one().then(function(args){        
        if(app.ios){
            // contacts.one() returns a CNContact containg several properties you
            // can use see apple docs for full list of properties
            var contact = args.ios;        
            // lets assign the first and last name to the contact_name property
            model.contact_name = contact.givenName + " " + contact.familyName;    
            // lets check to make sure we have a phone number before assigning it to the 
            // property in our model        
            if(contact.phoneNumbers.count > 0){
                // the phone is an NSArray meaning it could hold multiple values
                // we just want the first phone number in this case
                model.phone = contact.phoneNumbers[0].value.stringValue
            }
        } else {
            // android doesnt quite work yet, should soon though!
            alert("This function isn't supported in Android as of yet");
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