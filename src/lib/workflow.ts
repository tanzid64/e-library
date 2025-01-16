import { Client as QStashClient, resend } from "@upstash/qstash";
import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async (
  subject: string,
  email: string,
  message: string,
) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "eLibrary <elibrary.tanzid.icu>",
      to: [email],
      subject,
      html: message,
    },
  });
};
