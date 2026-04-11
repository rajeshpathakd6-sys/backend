const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyTransporter() {
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY missing from environment");
    return false;
  }
  console.log("✅ Resend API key found — ready to send emails");
  return true;
}

async function sendWelcomeEmail(toEmail, unsubscribeToken) {
  console.log("\n🚀 ===== sendWelcomeEmail START =====");
  console.log("📧 Recipient:", toEmail);

  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY missing");
    throw new Error("RESEND_API_KEY not set");
  }

  const siteUrl = process.env.BASE_URL || "https://routesandreflections.in";
  const logoUrl =
    "https://rajeshpathakd6-sys.github.io/personaldigital-space/assets/logo-white.png";
  const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe/${unsubscribeToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "AdiRaj- Routes & Reflections <adiraj@routesandreflections.in>",
      to: toEmail,
      subject: "Welcome to Routes & Reflections ✦",

      text: `
Hi,

We're Aditi and Rajesh- and we're so glad you found us.

You've just joined a small, intentional community of people who love slow travel,
honest storytelling, and the beauty of the everyday.

Things we’ve been meaning to tell you:
  ✦ Stories from our journeys and everyday life
  ✦ Places we discovered and loved
  ✦ Honest, practical travel insight
  ✦ Things we learned- and unlearned- along the way
  ✦ A mix of travel, life, and our creative work

Start exploring: ${siteUrl}

Warmly,
Aditi & Rajesh
AdiRaj- Routes & Reflections

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
<body style="margin:0;padding:0;background-color:#e8e2d9;font-family:'Georgia',serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#e8e2d9;padding:48px 16px 64px;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <!-- ═══ TOP ACCENT LINE ═══ -->
        <tr>
          <td style="height:2px;background:linear-gradient(90deg,transparent 0%,#b87652 25%,#e2b48a 50%,#b87652 75%,transparent 100%);border-radius:2px 2px 0 0;"></td>
        </tr>

        <!-- ═══ HEADER ═══ -->
        <tr>
          <td style="background-color:#181714;padding:36px 48px 34px;text-align:center;">
            <table cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td style="vertical-align:middle;padding-right:14px;">
                  <img src="${logoUrl}" alt="AdiRaj" width="44" height="44"
                       style="display:block;width:44px;height:44px;border:0;"/>
                </td>
                <td style="vertical-align:middle;padding-right:14px;">
                  <!-- thin vertical rule -->
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:1px;height:40px;background:linear-gradient(180deg,transparent,#b87652,transparent);font-size:0;">&nbsp;</td>
                    </tr>
                  </table>
                </td>
                <td style="vertical-align:middle;text-align:left;">
                  <p style="margin:0 0 4px;font-family:'Georgia',serif;font-size:26px;font-weight:600;color:#f5f2ee;letter-spacing:0.04em;line-height:1;">AdiRaj</p>
                  <p style="margin:0;font-family:Arial,sans-serif;font-size:6.2px;color:#7a7672;letter-spacing:0.25em;text-transform:uppercase;line-height:1;">Routes &amp; Reflections</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ═══ TERRACOTTA BAND ═══ -->
        <tr>
          <td style="height:2px;background:linear-gradient(90deg,#6b3d28,#b87652,#e2b48a,#b87652,#6b3d28);"></td>
        </tr>

        <!-- ═══ HERO IMAGE STRIP ═══ -->
        <tr>
          <td style="background-color:#2a2420;padding:52px 56px 48px;text-align:left;">

           
            <!-- Headline -->
            <h1 style="margin:0 0 28px;font-family:'Georgia',serif;font-size:34px;font-weight:400;font-style:italic;color:#f5f2ee;line-height:1.25;letter-spacing:-0.01em;">
  Hi,<br/>We’re Aditi &amp; Rajesh
</h1>

            <!-- Thin rule -->
            <table width="48" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr><td style="height:1px;background-color:#b87652;"></td></tr>
            </table>

            <!-- Body copy -->
            <p style="margin:0 0 18px;font-family:'Georgia',serif;font-size:15px;color:#c8c0b6;line-height:1.95;">
              We're so glad you found us. You've just joined a small, intentional community of people who love slow travel, honest storytelling, and the beauty of the everyday.
            </p>
            <p style="margin:0;font-family:'Georgia',serif;font-size:15px;color:#c8c0b6;line-height:1.95;">
              This is more than travel for us &mdash; it's about how we live, what we create, and what we notice along the way.
            </p>
          </td>
        </tr>

        <!-- ═══ WHAT TO EXPECT ═══ -->
        <tr>
          <td style="background-color:#ffffff;padding:48px 56px 12px;">
            <p style="margin:0 0 28px;font-family:Arial,sans-serif;font-size:14px;letter-spacing:1.5px;color:#b87652;text-transform:uppercase;">
  A few things we’ve <strong><em>been meaning to share</em></strong>
</p>
          </td>
        </tr>

        <!-- List rows — alternating subtle bg for elegance -->
        <tr>
          <td style="background-color:#ffffff;padding:0 56px;">
            <table width="100%" cellpadding="0" cellspacing="0">

              <tr>
                <td style="padding:14px 0;border-top:1px solid #f0ebe3;">
                  <table cellpadding="0" cellspacing="0" width="100%"><tr>
                    <td style="width:22px;font-size:8px;color:#b87652;vertical-align:middle;line-height:1;">&#10022;</td>
                    <td style="font-family:'Georgia',serif;font-size:14.5px;color:#2e2c2a;line-height:1.7;">Stories from our journeys and everyday life</td>
                  </tr></table>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 0;border-top:1px solid #f0ebe3;">
                  <table cellpadding="0" cellspacing="0" width="100%"><tr>
                    <td style="width:22px;font-size:8px;color:#b87652;vertical-align:middle;line-height:1;">&#10022;</td>
                    <td style="font-family:'Georgia',serif;font-size:14.5px;color:#2e2c2a;line-height:1.7;">Places we discovered and loved</td>
                  </tr></table>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 0;border-top:1px solid #f0ebe3;">
                  <table cellpadding="0" cellspacing="0" width="100%"><tr>
                    <td style="width:22px;font-size:8px;color:#b87652;vertical-align:middle;line-height:1;">&#10022;</td>
                    <td style="font-family:'Georgia',serif;font-size:14.5px;color:#2e2c2a;line-height:1.7;">Honest, practical travel insight</td>
                  </tr></table>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 0;border-top:1px solid #f0ebe3;">
                  <table cellpadding="0" cellspacing="0" width="100%"><tr>
                    <td style="width:22px;font-size:8px;color:#b87652;vertical-align:middle;line-height:1;">&#10022;</td>
                    <td style="font-family:'Georgia',serif;font-size:14.5px;color:#2e2c2a;line-height:1.7;">Things we learned &mdash; and unlearned &mdash; along the way</td>
                  </tr></table>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 0;border-top:1px solid #f0ebe3;border-bottom:1px solid #f0ebe3;">
                  <table cellpadding="0" cellspacing="0" width="100%"><tr>
                    <td style="width:22px;font-size:8px;color:#b87652;vertical-align:middle;line-height:1;">&#10022;</td>
                    <td style="font-family:'Georgia',serif;font-size:14.5px;color:#2e2c2a;line-height:1.7;">A mix of travel, life, and our creative work</td>
                  </tr></table>
                </td>
              </tr>

            </table>
          </td>
        </tr>

        <!-- ═══ CTA BUTTON ═══ -->
        <tr>
          <td style="background-color:#ffffff;padding:40px 56px 52px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background-color:#181714;border-radius:2px;">
                  <a href="https://routesandreflections.in"
                     style="display:inline-block;padding:16px 40px;font-family:Arial,sans-serif;font-size:8.5px;letter-spacing:4px;text-transform:uppercase;color:#f5f2ee;text-decoration:none;">
                    Explore More &nbsp;&rarr;
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ═══ SIGN-OFF ═══ -->
        <tr>
          <td style="background-color:#faf8f5;padding:36px 56px 40px;border-top:1px solid #ede8e1;">
            <p style="margin:0 0 6px;font-family:'Georgia',serif;font-size:13.5px;color:#9a9490;font-style:italic;">Warmly,</p>
            <p style="margin:0;font-family:'Georgia',serif;font-size:22px;font-style:italic;color:#b87652;line-height:1.2;">Aditi &amp; Rajesh &nbsp;&#10084;&#65039;</p>
          </td>
        </tr>

        <!-- ═══ BOTTOM BAND ═══ -->
        <tr>
          <td style="height:2px;background:linear-gradient(90deg,#6b3d28,#b87652,#e2b48a,#b87652,#6b3d28);"></td>
        </tr>

        <!-- ═══ FOOTER ═══ -->
        <tr>
          <td style="background-color:#181714;padding:28px 48px 32px;text-align:center;border-radius:0 0 3px 3px;">

            <!-- Social icons -->
            <table cellpadding="0" cellspacing="0" align="center" style="margin-bottom:20px;">
              <tr>

                <!-- Instagram -->
                <td style="padding:0 10px;">
                  <a href="https://www.instagram.com/adiraj.routesandreflections/" style="text-decoration:none;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:34px;height:34px;background-color:#2a2420;border-radius:50%;text-align:center;vertical-align:middle;">
                          <!--[if !mso]><!-->
                          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                               alt="Instagram" width="17" height="17"
                               style="display:block;margin:0 auto;width:17px;height:17px;filter:brightness(0) saturate(100%) invert(62%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(95%);"/>
                          <!--<![endif]-->
                        </td>
                      </tr>
                    </table>
                  </a>
                </td>

                <!-- Pinterest -->
                <td style="padding:0 10px;">
                  <a href="https://in.pinterest.com/adirajroutesandreflections/" style="text-decoration:none;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:34px;height:34px;background-color:#2a2420;border-radius:50%;text-align:center;vertical-align:middle;">
                          <img src="https://cdn-icons-png.flaticon.com/512/145/145808.png"
                               alt="Pinterest" width="17" height="17"
                               style="display:block;margin:0 auto;width:17px;height:17px;filter:brightness(0) saturate(100%) invert(62%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(95%);"/>
                        </td>
                      </tr>
                    </table>
                  </a>
                </td>

                <!-- X / Twitter -->
                <td style="padding:0 10px;">
                  <a href="https://x.com/AdiRaj_RandR" style="text-decoration:none;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:34px;height:34px;background-color:#2a2420;border-radius:50%;text-align:center;vertical-align:middle;">
                          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png"
                               alt="X / Twitter" width="17" height="17"
                               style="display:block;margin:0 auto;width:17px;height:17px;filter:brightness(0) saturate(100%) invert(62%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(95%);"/>
                        </td>
                      </tr>
                    </table>
                  </a>
                </td>

              </tr>
            </table>

            <!-- Footer text -->
            <p style="margin:0;font-family:Arial,sans-serif;font-size:9px;color:#4a4845;line-height:2;letter-spacing:0.3px;">
              You're receiving this because you subscribed at routesandreflections.in<br/>
              <a href="${unsubscribeUrl}" style="color:#4a4845;text-decoration:underline;letter-spacing:0.3px;">Unsubscribe</a>
            </p>

          </td>
        </tr>

        <!-- ═══ BOTTOM ACCENT LINE ═══ -->
        <tr>
          <td style="height:2px;background:linear-gradient(90deg,transparent 0%,#b87652 25%,#e2b48a 50%,#b87652 75%,transparent 100%);border-radius:0 0 2px 2px;"></td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`,
    });

    if (error) {
      console.error("❌ Resend API error:", error);
      throw new Error(error.message);
    }

    console.log("✅ EMAIL SENT SUCCESSFULLY via Resend");
    console.log("📬 Email ID:", data.id);
    console.log("🚀 ===== sendWelcomeEmail END =====\n");

    return { success: true, emailId: data.id };
  } catch (err) {
    console.error("❌ sendWelcomeEmail FAILED:", err.message);
    console.log("🚀 ===== sendWelcomeEmail END (FAILED) =====\n");
    throw err;
  }
}

module.exports = { sendWelcomeEmail, verifyTransporter };
