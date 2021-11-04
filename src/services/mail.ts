import { MailData } from "@sendgrid/helpers/classes/mail";
import * as sendGrid from "@sendgrid/mail";

const apiKey = process.env.SENDGRID_API_KEY || "";
sendGrid.setApiKey(apiKey);
const senderEmail = "support@rehabitproperty.com";

export const sendEmail = async (params: any) => {
  console.log("params", params);
  try {
    await sendGrid.send(params);
  } catch (error) {
    console.error("sendEmail", error);
  }
};

export const setParams = (toAddress: string, html: string, subject: string) => {
  const emailParams: MailData = {
    to: toAddress,
    from: senderEmail,
    subject,
    html,
  };

  return emailParams;
};
