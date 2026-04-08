const nodemailer = require("nodemailer");

// Transporter is created once and reused for all emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // 16-character App Password (NOT your Gmail login password)
  },
});

/**
 * Sends a branded welcome email to a new newsletter subscriber.
 * @param {string} toEmail - Recipient email address
 * @param {string} unsubscribeToken - Unique token for the unsubscribe link
 */
async function sendWelcomeEmail(toEmail, unsubscribeToken) {
  const unsubscribeUrl = `${process.env.BASE_URL}/api/newsletter/unsubscribe/${unsubscribeToken}`;

  const mailOptions = {
    from: `"AdiRaj – Routes & Reflections" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Welcome to Routes & Reflections by AdiRaj ❤️",
    text: `
Hi, We're Aditi and Rajesh,

    We're so glad you're here. You've offically made it to our community and we're are so happy you're here!!!
    
    This is more than travel for us.

    It’s about how we live, what we create, and what we experience — and now we’re sharing it with you.

What to expect:
  - Stories from our journeys and everyday life
  - Places we found and loved
  - Simple and honest travel tips
  - Things we learned along the way
  - A mix of travel, life, and our creative work

Start exploring: ${process.env.BASE_URL}

We're just getting started.
Aditi & Rajesh ❤️


You're receiving this because you subscribed at routesandreflections.adiraj
To unsubscribe: ${unsubscribeUrl}
    `.trim(),
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Routes & Reflections by AdiRaj ❤️</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f0eb;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0eb;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.07);">
          <tr>
            <td style="background-color:#1a1a1a;padding:36px 48px;text-align:center;">
              <p style="margin:0;font-family:'Georgia',serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#a08060;">Routes &amp; Reflections</p>
              <h1 style="margin:10px 0 0;font-family:'Georgia',serif;font-size:28px;font-weight:normal;color:#f5f0eb;letter-spacing:1px;">AdiRaj</h1>
            </td>
          </tr>
          <tr><td style="height:6px;background:linear-gradient(90deg,#a08060,#c4a882,#a08060);"></td></tr>
          <tr>
            <td style="padding:48px 48px 36px;">
              <p style="margin:0 0 24px;font-size:22px;font-weight:normal;color:#1a1a1a;line-height:1.4;">Hi, We're Aditi and Rajesh,</p>
              <p style="margin:0 0 20px;font-size:15px;color:#4a4a4a;line-height:1.8;">We're so glad you're here. You've offically made it to our community and we're are so happy you're here!!!</p>
              <p style="margin:0 0 20px;font-size:15px;color:#4a4a4a;line-height:1.8;">This is more than travel for us.</p>
              <p style="margin:0 0 20px;font-size:15px;color:#4a4a4a;line-height:1.8;">It’s about how we live, what we create, and what we experience- and now we’re sharing it with you.</p>
              <p style="margin:0 0 8px;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#a08060;">What to expect</p>
              <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr><td style="padding:6px 0;font-size:15px;color:#4a4a4a;line-height:1.6;">✦ &nbsp;Stories from our journeys and everyday life</td></tr>
                <tr><td style="padding:6px 0;font-size:15px;color:#4a4a4a;line-height:1.6;">✦ &nbsp;Places we found and loved</td></tr>
                <tr><td style="padding:6px 0;font-size:15px;color:#4a4a4a;line-height:1.6;">✦ &nbsp;Simple and honest travel tips</td></tr>
                <tr><td style="padding:6px 0;font-size:15px;color:#4a4a4a;line-height:1.6;">✦ &nbsp;Things we learned along the way</td></tr>
                <tr><td style="padding:6px 0;font-size:15px;color:#4a4a4a;line-height:1.6;">✦ &nbsp;A mix of travel, life, and our creative work</td></tr>
              </table>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:2px;background-color:#1a1a1a;">
                    <a href="${process.env.BASE_URL}" style="display:inline-block;padding:14px 32px;font-family:'Georgia',serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#f5f0eb;text-decoration:none;">Start Exploring &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 48px 40px;">
              <p style="margin:32px 0 4px;font-size:15px;color:#1a1a1a;">We're just getting started.</p>
              <p style="margin:0;font-size:17px;font-style:italic;color:#a08060;">Aditi & Rajesh ❤️</p>
              <div style="font-size:26px;color:#1a1a1a;margin-top:6px;font-weight:500;">
<img src="./assets/logo.png" width="120">
</div>
            </td>
          </tr>
          <tr><td style="height:1px;background-color:#e8e0d5;"></td></tr>
          <tr>
            <td style="padding:24px 48px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#aaa;line-height:1.8;">
                You're receiving this because you subscribed at adiraj.com.<br/>
                <a href="${unsubscribeUrl}" style="color:#a08060;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
}

module.exports = { sendWelcomeEmail };
