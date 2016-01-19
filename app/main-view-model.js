// require the observable
var observable = require("data/observable");

// define our model
var model = new observable.Observable({
 contact_name: "",
 phone: ""
});

// export it to the view
module.exports = model;