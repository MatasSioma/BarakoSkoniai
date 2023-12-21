const nodemailer = require("nodemailer");
require("dotenv").config();
	
const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true, 
	auth: {
	  user: process.env.email, 
	  pass: process.env.email_pass, 
	},
});

console.log("E-mail system authenticated.");

module.exports.transporter = transporter;