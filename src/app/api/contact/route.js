import nodemailer from "nodemailer";

// POST route handler for sending emails
export async function POST(req) {
  try {
    // Extract the email from the request body
    const { email } = await req.json();
     
    // Create a test SMTP account (only works for testing via Ethereal)
    let testAccount = await nodemailer.createTestAccount();
    console.log(testAccount);

    // Create a transporter object using the test account credentials
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email", // Ethereal test SMTP server
      port: 587,                   // Non-secure port for testing
      secure: false,               // True for port 465, false for 587
      auth: {
        user: testAccount.user,    // Test account username
        pass: testAccount.pass,    // Test account password
      },
    });

    // Send an email using the transporter
    const emailInfo = await transporter.sendMail({
      from: testAccount.user,          // Sender address
      to: email,                       // Recipient email from request
      subject: `New Contact Form Message`, // Subject line
      text: `Hello`,                   // Plain text body
      html: "<b>Hello world?</b>",     // HTML body
    });

    // Generate a preview URL (only works with Ethereal test accounts)
    const previewUrl = nodemailer.getTestMessageUrl(emailInfo);
    console.log(previewUrl);

    // Return success response
    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    // Log and return error response
    console.error("Email sending error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Email sending failed" }),
      { status: 500 }
    );
  }
}
