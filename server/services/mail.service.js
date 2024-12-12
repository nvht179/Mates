require("dotenv").config();
const nodemailer = require("nodemailer");
const { logger } = require("../utils/logger");
const { ErrorHandler } = require("../helpers/error");
const { google } = require("googleapis");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,  
                pass: process.env.APP_PASSWORD, 
            },
        });
    }

    sendVerificationEmail = async (to, verificationLink) => {
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: to,
            subject: 'Please verify your email',
            html: `<p>Thank you for signing up. Please click the link below to verify your email:</p>
                   <a href="${verificationLink}">Verify your email</a>`,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            logger.info(`Verification email sent to: ${to} - ${info.response}`);
            return info;
        } catch (error) {
            logger.error(`Error sending verification email to ${to}: ${error.message}`);
            throw new ErrorHandler(500, "Error sending verification email");
        }
    };
}

module.exports = new MailService(); 