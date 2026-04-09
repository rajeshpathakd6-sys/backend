const nodemailer = require("nodemailer");

let transporter;

/**
 * Create or reuse transporter
 */
function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.error("❌ EMAIL CONFIG ERROR");
    console.error(`   EMAIL_USER: ${user ? "✅ set" : "❌ missing"}`);
    console.error(`   EMAIL_PASS: ${pass ? "✅ set" : "❌ missing"}`);
    return null;
  }

  if (!transporter) {
    console.log("🔧 Creating new transporter...");

    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },

      // Important for Render / cloud environments
      tls: {
        rejectUnauthorized: true,
      },

      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }

  return transporter;
}

/**
 * Verify transporter at startup (optional but recommended)
 */
async function verifyTransporter() {
  console.log("🔍 Verifying email transporter...");

  const t = getTransporter();
  if (!t) return false;

  try {
    await t.verify();
    console.log("✅ SMTP connection verified successfully");
    return true;
  } catch (err) {
    console.error("❌ SMTP verification failed:", err.message);
    transporter = null;
    return false;
  }
}

/**
 * Send Welcome Email
 */
async function sendWelcomeEmail(toEmail, unsubscribeToken) {
  console.log("\n🚀 ===== sendWelcomeEmail START =====");
  console.log("📧 Recipient:", toEmail);

  const siteUrl = process.env.BASE_URL || "https://routesandreflections.in";

  console.log("🌐 BASE_URL:", siteUrl);
  console.log("🔐 ENV CHECK:", {
    EMAIL_USER: process.env.EMAIL_USER ? "SET" : "MISSING",
    EMAIL_PASS: process.env.EMAIL_PASS ? "SET" : "MISSING",
  });

  // ✅ Use public image URL (reliable for emails)
  const logoUrl =
    "https://rajeshpathakd6-sys.github.io/personaldigital-space/assets/logo.png";

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

What's coming your way:
  ✦ Stories from our journeys and everyday life
  ✦ Places we discovered and loved
  ✦ Honest, practical travel insight
  ✦ Things we learned — and unlearned — along the way
  ✦ A mix of travel, life, and our creative work

Start exploring: ${siteUrl}

With warmth,
Aditi & Rajesh
AdiRaj — Routes & Reflections

—
You're receiving this because you subscribed
To unsubscribe: ${unsubscribeUrl}
    `.trim(),

    // Keep your full HTML template — just use logoUrl inside it
    html: `
      <div style="font-family:Georgia,serif;padding:20px">
        <img src="${logoUrl}" width="60" />
        <h2>Hi, we're Aditi & Rajesh.</h2>
        <p>Welcome to our world of slow travel & storytelling.</p>
        <a href="${siteUrl}">Explore</a>
      </div>
    `,
  };

  const maxRetries = 2;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📨 Attempt ${attempt}: Sending email...`);

      const t = getTransporter();
      if (!t) throw new Error("Transporter unavailable");

      const info = await t.sendMail(mailOptions);

      console.log("✅ EMAIL SENT SUCCESSFULLY");
      console.log("📬 Message ID:", info.messageId);
      console.log("📡 Response:", info.response);

      console.log("🚀 ===== sendWelcomeEmail END =====\n");

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      console.error(`❌ Attempt ${attempt} FAILED`);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);

      // 🔴 Gmail auth issue — don't retry
      if (error.code === "EAUTH" || error.responseCode === 535) {
        console.error("🔑 AUTH ERROR: Check Gmail App Password");
        transporter = null;
        throw error;
      }

      // Last attempt → fail
      if (attempt === maxRetries) {
        console.error("❌ ALL RETRIES FAILED");
        console.log("🚀 ===== sendWelcomeEmail END (FAILED) =====\n");
        throw error;
      }

      console.log("🔁 Retrying in 2 seconds...\n");
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
}

module.exports = {
  sendWelcomeEmail,
  verifyTransporter,
};
