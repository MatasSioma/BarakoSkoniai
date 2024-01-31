const nodemailer = require("nodemailer");
require("dotenv").config();
	
const transporter = nodemailer.createTransport({
	service: "gmail",
	port: 465,
	secure: true, 
	auth: {
	  user: process.env.email, 
	  pass: process.env.email_AppPass, 
	},
});

console.log("E-mail system authenticated.");

module.exports.transporter = transporter;