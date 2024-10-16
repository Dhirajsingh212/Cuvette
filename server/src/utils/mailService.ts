import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mailhog",
  port: Number(process.env.SMTP_PORT) || 1025,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendVerificationEmail = async (email: string, otp: number) => {
  try {
    const response = await transporter.sendMail({
      from: "Acme <onboarding@yourdomain.com>",
      to: email,
      subject: "Email Verification",
      html: `<p>Your verification code is <strong>${otp}</strong>. Please enter this code in the application.</p>`,
    });

    console.log("Verification email sent successfully!", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email.");
  }
};

export async function sendCompanyDetails(
  emails: string[],
  jobDetails: any,
  userEmail: string
) {
  try {
    const emailPromises = emails.map((email) =>
      transporter.sendMail({
        from: "Acme <onboarding@yourdomain.com>",
        to: email,
        subject: `New Job Opening: ${jobDetails.title}`,
        html: `
          <h1>New Job Opening at ${jobDetails.title}</h1>
          <p><strong>Title:</strong> ${jobDetails.title}</p>
          <p><strong>Description:</strong> ${jobDetails.description}</p>
          <p><strong>Experience Required:</strong> ${jobDetails.experience}</p>
          <p><strong>Date Posted:</strong> ${jobDetails.date}</p>
          <p><strong>Contact Email:</strong> ${userEmail}</p>
        `,
      })
    );

    await Promise.all(emailPromises);
    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails", error);
    throw new Error("Failed to send emails");
  }
}

//********************************FOR PRODUCTION****************** */
// import { Resend } from "resend";
// import dotenv from "dotenv";

// dotenv.config();

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// export const sendVerificationEmail = async (email: string, otp: number) => {
//   try {
//     const response = await resend.emails.send({
//       from: "Acme <onboarding@resend.dev>",
//       to: email,
//       subject: "Email Verification",
//       html: <p>Your verification code is <strong>${otp}</strong>. Please enter this code in the application.</p>,
//     });

//     console.log("Verification email sent successfully!", response);
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     throw new Error("Failed to send verification email.");
//   }
// };

// export async function sendCompanyDetails(
//   emails: string[],
//   jobDetails: any,
//   userEmail: string
// ) {
//   try {
//     const emailPromises = emails.map((email) =>
//       resend.emails.send({
//         from: "Acme <onboarding@resend.dev>",
//         to: email,
//         subject: New Job Opening: ${jobDetails.title},
//         html:
//           <h1>New Job Opening at ${jobDetails.title}</h1>
//           <p><strong>Title:</strong> ${jobDetails.title}</p>
//           <p><strong>Description:</strong> ${jobDetails.description}</p>
//           <p><strong>Experience Required:</strong> ${jobDetails.experience}</p>
//           <p><strong>Date Posted:</strong> ${jobDetails.date}</p>
//           <p><strong>Contact Email:</strong> ${jobDetails.userEmail}</p>
//         ,
//       })
//     );

//     await Promise.all(emailPromises);
//     console.log("Emails sent successfully");
//   } catch (error) {
//     console.error("Error sending emails", error);
//     throw new Error("Failed to send emails");
//   }
// }
