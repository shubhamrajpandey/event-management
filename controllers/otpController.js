const sendEmail = require("../utils/sendEmail");
const { StatusCodes } = require("http-status-codes");

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Email is required",
      });
    }


    const otp = Math.floor(100000 + Math.random() * 900000);


   await sendEmail(
  email,
  "BookSansar- OTP Verification",
  `Your OTP is: ${otp}`, 
  `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border:1px solid #e0e0e0; border-radius:10px; overflow:hidden;">
    <div style="background-color:#28a745; color:white; text-align:center; padding:20px;">
      <h1>BookSansar</h1>
    </div>
    <div style="padding:30px; text-align:center;">
      <h2 style="color:#333;">Email Verification</h2>
    
      <p>Your One-Time Password (OTP) for verification is:</p>
      <div style="display:inline-block; border:2px dashed #28a745; border-radius:10px; padding:15px 30px; margin:20px 0;">
        <span style="font-size:32px; font-weight:bold; color:#28a745;">${otp}</span>
      </div>
      <p>This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
      <p>If you didn’t request this, please ignore this email.</p>
    </div>
    <div style="background-color:#f5f5f5; text-align:center; padding:15px; font-size:12px; color:#888;">
      &copy; 2025 BookSansar
    </div>
  </div>
  `
);

    console.log(`OTP sent to ${email}: ${otp}`);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "OTP sent successfully",
      otp, 
    });
  } catch (error) {
    console.error(" Error sending OTP:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

module.exports = { sendOTP };
