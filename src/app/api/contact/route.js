import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // --- IMPORTANT: This is where you would integrate your email sending service ---
    // You would typically use a library like Nodemailer (for SMTP), SendGrid, Resend, Mailgun, etc.
    // Example (conceptual):
    /*
    const nodemailer = require('nodemailer'); // or import your chosen library

    let transporter = nodemailer.createTransport({
      host: "smtp.your-email-provider.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    await transporter.sendMail({
      from: `"MyThoughts Contact Form" <no-reply@mythoughts.com>`, // sender address
      to: "your-support-email@example.com", // list of receivers (your email)
      subject: `New Contact Form Submission: ${subject}`, // Subject line
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    */
    // --- END IMPORTANT SECTION ---

    console.log("Received contact form submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("--- (Email sending logic would go here) ---");

    // Simulate a delay for demonstration
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error handling contact form submission:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
