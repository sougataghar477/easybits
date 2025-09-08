import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
     
    let testAccount = await nodemailer.createTestAccount();
    console.log(testAccount)
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, 
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const emailInfo = await transporter.sendMail({
      from: testAccount.user,
      to: email,
      subject: `New Contact Form Message`,
      text: `Hello`,
      html: "<b>Hello world?</b>",
    });
    const previewUrl = nodemailer.getTestMessageUrl(emailInfo);
    console.log(previewUrl)
    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Email sending failed" }),
      { status: 500 }
    );
  }
}
