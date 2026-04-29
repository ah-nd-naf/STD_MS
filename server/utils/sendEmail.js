const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({  // say mail truck
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        const mailOptions = {    // say it's envelope
            from: process.env.EMAIL_USER,
            to: email,
            subject: "OTP Verification",
            text: `Your OTP code is ${otp}. Will expire in 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);
        console.log("OTP sent successfully to", email);

    }catch (error) {
        console.error("Error sending OTP:", error);
    }
};

module.exports = sendEmail;
