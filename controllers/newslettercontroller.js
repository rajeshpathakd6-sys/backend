const Newsletter = require("../models/newsletter");
let sendWelcomeEmail;

try {
  ({ sendWelcomeEmail } = require("../utils/sendEmail"));
} catch (err) {
  console.error("Email module failed to load:", err.message);
}

// POST /api/newsletter
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    // Check if email already exists
    const existing = await Newsletter.findOne({ email });

    if (existing) {
      // Re-subscribe silently if they had previously unsubscribed
      if (!existing.isSubscribed) {
        existing.isSubscribed = true;
        await existing.save();

        if (sendWelcomeEmail) {
          await sendWelcomeEmail(existing.email, existing.unsubscribeToken);
        }

        return res.status(200).json({
          success: true,
          message: "Welcome back! You've been re-subscribed.",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    const subscriber = await Newsletter.create({ email });

    // Fire welcome email — non-blocking: log error but don't fail the request
    if (sendWelcomeEmail) {
      sendWelcomeEmail(subscriber.email, subscriber.unsubscribeToken).catch(
        (err) => console.error("Welcome email failed:", err.message),
      );
    }

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (err) {
    console.error("Newsletter subscribe error:", err.message);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET /api/newsletter/unsubscribe/:token
exports.unsubscribe = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid unsubscribe link",
      });
    }

    const subscriber = await Newsletter.findOne({ unsubscribeToken: token });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    if (!subscriber.isSubscribed) {
      return res.status(200).json({
        success: true,
        message: "You are already unsubscribed",
      });
    }

    subscriber.isSubscribed = false;
    await subscriber.save();

    return res.status(200).json({
      success: true,
      message: "You've been unsubscribed successfully",
    });
  } catch (err) {
    console.error("Newsletter unsubscribe error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
