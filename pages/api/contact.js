require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const { SG_API_KEY, FROM_EMAIL, TO_EMAIL } = process.env;
sgMail.setApiKey(SG_API_KEY);

export default async function handler(req, res) {
  const msg = {
    to: TO_EMAIL,
    from: FROM_EMAIL,
    subject: `[相談] ${req.body.name}様より`,
    text: `
【名前】
${req.body.name}
【アドレス】
${req.body.address}
【メッセージ】
${req.body.message}`,
  };
  await sgMail.send(msg);
  console.log("email sent");
  res.status(200).json({ success: true });
}