import transporter, { accountEmail } from "../config/nodemailer.js";
import { emailTemplates } from "./email-template.js";
import dayjs from "dayjs";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error("Missing required fields.");

  const template = emailTemplates.find((t) => t.label === type);
  if (!template) throw new Error("Invalid email template type.");

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error, "Error sending email");
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
