const nodemailer = require("nodemailer");

let transporter;

function getTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ EMAIL_USER or EMAIL_PASS missing from environment");
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password — not your regular password
      },
    });
  }
  return transporter;
}

async function sendWelcomeEmail(toEmail, unsubscribeToken) {
  const siteUrl = process.env.BASE_URL || "https://routesandreflections.in";
  const logoUrl = `${siteUrl}/assets/logo.png`;
  const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe/${unsubscribeToken}`;

  const mailOptions = {
    from: `"AdiRaj — Routes & Reflections" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "You're in — Welcome to Routes & Reflections ✦",

    text: `
Hi,

We're Aditi and Rajesh — and we're so glad you found us.

You've just joined a small, intentional community of people who love slow travel,
honest storytelling, and the beauty of the everyday.

This is more than travel for us. It's about how we live, what we create, and what
we notice along the way — and now we're sharing all of it with you.

WHAT'S COMING YOUR WAY:
  ✦  Stories from our journeys and everyday life
  ✦  Places we discovered and loved
  ✦  Honest, practical travel insight
  ✦  Things we learned — and unlearned — along the way
  ✦  A mix of travel, life, and our creative work

Start exploring: ${siteUrl}

With warmth,
Aditi & Rajesh
AdiRaj — Routes & Reflections

—
You're receiving this because you subscribed at routesandreflections.in
To unsubscribe: ${unsubscribeUrl}
    `.trim(),

    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Welcome to Routes &amp; Reflections</title>
</head>
<body style="margin:0;padding:0;background-color:#ede8e1;font-family:'Georgia',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ede8e1;padding:52px 16px 72px;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <!-- ════════ LOGO HEADER ════════ -->
        <tr>
          <td style="background-color:#1a1a18;border-radius:4px 4px 0 0;padding:0;">

            <!-- Top copper rule -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr><td style="height:1px;line-height:1px;font-size:1px;background:linear-gradient(90deg,#1a1a18 0%,#c0815a 28%,#e8c4a8 50%,#c0815a 72%,#1a1a18 100%);">&nbsp;</td></tr>
            </table>

            <!-- Logo -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center" style="padding:34px 48px 32px;">
                  <table cellpadding="0" cellspacing="0" role="presentation" align="center">
                    <tr>
                      <!-- Monogram image -->
                      <td style="vertical-align:middle;padding-right:12px;">
                        <img src="${logoUrl}" alt="AR" width="50" height="50"
                             style="display:block;width:50px;height:50px;border:0;"/>
                      </td>
                      <!-- Purple divider — #7c5cbf from your styles.css -->
                      <td style="vertical-align:middle;padding-right:12px;">
                        <table cellpadding="0" cellspacing="0" role="presentation">
                          <tr><td style="width:2px;height:46px;background-color:#7c5cbf;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td></tr>
                        </table>
                      </td>
                      <!-- Wordmark — fixed 108px container forces tagline flush with AdiRaj -->
                      <td style="vertical-align:middle;text-align:left;width:108px;">
                        <p style="margin:0 0 5px;display:block;width:108px;
                                  font-family:'Georgia',Times,'Times New Roman',serif;
                                  font-size:28px;font-weight:600;color:#fafaf8;
                                  letter-spacing:0.03em;line-height:1;white-space:nowrap;overflow:hidden;">AdiRaj</p>
                        <p style="margin:0;display:block;width:108px;
                                  font-family:Arial,Helvetica,sans-serif;
                                  font-size:6.8px;font-weight:400;color:#888480;
                                  letter-spacing:0.215em;text-transform:uppercase;
                                  line-height:1;overflow:hidden;white-space:nowrap;">Routes &amp; Reflections</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Bottom copper rule -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr><td style="height:1px;line-height:1px;font-size:1px;background:linear-gradient(90deg,#1a1a18 0%,#c0815a 28%,#e8c4a8 50%,#c0815a 72%,#1a1a18 100%);">&nbsp;</td></tr>
            </table>
          </td>
        </tr>

        <!-- Terracotta accent band -->
        <tr>
          <td style="height:3px;line-height:3px;font-size:3px;background:linear-gradient(90deg,#8c5a3c,#c0815a,#e8c4a8,#c0815a,#8c5a3c);">&nbsp;</td>
        </tr>

        <!-- ════════ BODY ════════ -->
        <tr>
          <td style="background-color:#ffffff;padding:56px 56px 44px;">
            <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:9px;letter-spacing:4.5px;text-transform:uppercase;color:#c0815a;">A warm welcome</p>
            <h2 style="margin:0 0 36px;font-family:'Georgia',Times,'Times New Roman',serif;font-size:30px;font-weight:400;font-style:italic;color:#1a1a18;line-height:1.3;">Hi, we're Aditi &amp; Rajesh.</h2>
            <p style="margin:0 0 22px;font-family:'Georgia',Times,'Times New Roman',serif;font-size:15.5px;color:#3e3c3a;line-height:1.9;">We're so glad you found us. You've just joined a small, intentional community of people who love slow travel, honest storytelling, and the beauty of the everyday.</p>
            <p style="margin:0 0 22px;font-family:'Georgia',Times,'Times New Roman',serif;font-size:15.5px;color:#3e3c3a;line-height:1.9;">This is more than travel for us &mdash; it's about how we live, what we create, and what we notice along the way. And now we're sharing all of it with you.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:40px 0 36px;">
              <tr>
                <td style="width:46%;height:1px;background-color:#e2ddd8;vertical-align:middle;"></td>
                <td style="width:8%;text-align:center;vertical-align:middle;padding:0 8px;"><span style="font-size:10px;color:#c0815a;">&#10022;</span></td>
                <td style="width:46%;height:1px;background-color:#e2ddd8;vertical-align:middle;"></td>
              </tr>
            </table>
            <p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:8.5px;letter-spacing:4px;text-transform:uppercase;color:#c0815a;">What's coming your way</p>
            <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 44px;">
              <tr><td style="padding:12px 0;border-bottom:1px solid #f0ebe3;"><table cellpadding="0" cellspacing="0" width="100%"><tr><td style="width:26px;vertical-align:top;padding-top:3px;font-size:9px;color:#c0815a;">&#10022;</td><td style="font-family:'Georgia',Times,'Times New Roman',serif;font-size:15px;color:#3e3c3a;line-height:1.75;">Stories from our journeys and everyday life</td></tr></table></td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid #f0ebe3;"><table cellpadding="0" cellspacing="0" width="100%"><tr><td style="width:26px;vertical-align:top;padding-top:3px;font-size:9px;color:#c0815a;">&#10022;</td><td style="font-family:'Georgia',Times,'Times New Roman',serif;font-size:15px;color:#3e3c3a;line-height:1.75;">Places we discovered and loved</td></tr></table></td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid #f0ebe3;"><table cellpadding="0" cellspacing="0" width="100%"><tr><td style="width:26px;vertical-align:top;padding-top:3px;font-size:9px;color:#c0815a;">&#10022;</td><td style="font-family:'Georgia',Times,'Times New Roman',serif;font-size:15px;color:#3e3c3a;line-height:1.75;">Honest, practical travel insight</td></tr></table></td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid #f0ebe3;"><table cellpadding="0" cellspacing="0" width="100%"><tr><td style="width:26px;vertical-align:top;padding-top:3px;font-size:9px;color:#c0815a;">&#10022;</td><td style="font-family:'Georgia',Times,'Times New Roman',serif;font-size:15px;color:#3e3c3a;line-height:1.75;">Things we learned &mdash; and unlearned &mdash; along the way</td></tr></table></td></tr>
              <tr><td style="padding:12px 0;"><table cellpadding="0" cellspacing="0" width="100%"><tr><td style="width:26px;vertical-align:top;padding-top:3px;font-size:9px;color:#c0815a;">&#10022;</td><td style="font-family:'Georgia',Times,'Times New Roman',serif;font-size:15px;color:#3e3c3a;line-height:1.75;">A mix of travel, life, and our creative work</td></tr></table></td></tr>
            </table>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background-color:#1a1a18;border-radius:2px;">
                  <a href="${siteUrl}" style="display:inline-block;padding:17px 44px;font-family:Arial,Helvetica,sans-serif;font-size:9.5px;letter-spacing:3.5px;text-transform:uppercase;color:#fafaf8;text-decoration:none;">Begin Exploring &nbsp;&rarr;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Sign-off -->
        <tr>
          <td style="background-color:#ffffff;padding:0 56px 52px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;"><tr><td style="height:1px;background-color:#ede8e1;"></td></tr></table>
            <p style="margin:0 0 5px;font-family:'Georgia',Times,'Times New Roman',serif;font-size:14px;color:#9a9490;font-style:italic;">With warmth,</p>
            <p style="margin:0;font-family:'Georgia',Times,'Times New Roman',serif;font-size:21px;font-style:italic;color:#c0815a;line-height:1;">Aditi &amp; Rajesh &nbsp;&#10084;&#65039;</p>
          </td>
        </tr>

        <!-- Bottom accent band -->
        <tr>
          <td style="height:3px;line-height:3px;font-size:3px;background:linear-gradient(90deg,#8c5a3c,#c0815a,#e8c4a8,#c0815a,#8c5a3c);">&nbsp;</td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#1a1a18;padding:30px 48px 32px;text-align:center;border-radius:0 0 4px 4px;">
            <p style="margin:0 0 16px;">
              <a href="https://www.instagram.com/adiraj.routesandreflections/" style="font-family:Arial,Helvetica,sans-serif;font-size:8.5px;letter-spacing:2.5px;text-transform:uppercase;color:#c0815a;text-decoration:none;">Instagram</a>
              <span style="color:#3a3935;margin:0 10px;">&bull;</span>
              <a href="https://in.pinterest.com/adirajroutesandreflections/" style="font-family:Arial,Helvetica,sans-serif;font-size:8.5px;letter-spacing:2.5px;text-transform:uppercase;color:#c0815a;text-decoration:none;">Pinterest</a>
              <span style="color:#3a3935;margin:0 10px;">&bull;</span>
              <a href="https://x.com/AdiRaj_RandR" style="font-family:Arial,Helvetica,sans-serif;font-size:8.5px;letter-spacing:2.5px;text-transform:uppercase;color:#c0815a;text-decoration:none;">X&nbsp;/&nbsp;Twitter</a>
            </p>
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:9.5px;color:#5a5855;line-height:2;letter-spacing:0.3px;">
              You're receiving this because you subscribed at routesandreflections.in<br/>
              <a href="${unsubscribeUrl}" style="color:#5a5855;text-decoration:underline;">Unsubscribe</a>
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
    const t = getTransporter();
    if (!t) {
      console.log("⚠️  Skipping email — transporter unavailable");
      return;
    }
    const info = await t.sendMail(mailOptions);
    console.log("✅ Welcome email sent:", info.response);
  } catch (error) {
    console.error("❌ Welcome email failed:", error);
    throw error;
  }
}

module.exports = { sendWelcomeEmail };
