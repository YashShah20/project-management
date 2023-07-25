const nodemailer = require("nodemailer");
// const { google } = require("googleapis");

// const clientId = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;
// const accessToken = process.env.ACCESS_TOKEN;
// const refreshToken = process.env.REFRESH_TOKEN;
// const user = process.env.USER_EMAIL;

// const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
// oAuth2Client.setCredentials({ refresh_token: refreshToken });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error.message);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

const sendMail = async (to, subject, { text, html }) => {
  try {
    console.log(to, subject, text, html);

    const info = await transporter.sendMail({
      from: process.env.USER_EMAIL, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    return info;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { sendMail };
