'use server';

import { Resend } from 'resend';
import EnquiryAlertEmail from '@/emails/enquiry-alert';
import EnquiryConfirmationEmail from '@/emails/enquiry-confirmation';
import type { EnquiryPayload } from '@/app/actions/types';
import * as React from 'react';

// NOTE: This will only work in a deployed environment where RESEND_API_KEY is set.
// You must get an API key from https://resend.com and set it as an environment secret.
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const sendEnquiryEmail = async (payload: EnquiryPayload) => {
  if (!resend) {
    console.warn("Resend is not configured. Skipping email sending. Please set RESEND_API_KEY.");
    // In a local dev environment, we don't want to block the user flow.
    // In production, this should be configured.
    return;
  }
  
  try {
    // Promise.all to send both emails concurrently for better performance
    const [adminEmail, userEmail] = await Promise.all([
      // 1. Email to Admin
      resend.emails.send({
        // IMPORTANT: The "from" address must be a domain you have verified with Resend.
        // Using "onboarding@resend.dev" is for testing purposes only and will not work long-term.
        from: 'Enquiry <onboarding@resend.dev>',
        to: ['trk0653705@gmail.com'],
        subject: `New Website Enquiry from ${payload.name}`,
        react: EnquiryAlertEmail(payload) as React.ReactElement,
      }),
      // 2. Confirmation Email to User
      resend.emails.send({
        from: 'Sri Sai Enterprises <onboarding@resend.dev>',
        to: [payload.email],
        subject: 'We have received your enquiry',
        react: EnquiryConfirmationEmail({ name: payload.name }) as React.ReactElement,
      })
    ]);

    if (adminEmail.error) {
      console.error('Resend API Error (Admin Email):', adminEmail.error);
    }
    if (userEmail.error) {
      console.error('Resend API Error (User Email):', userEmail.error);
    }

  } catch (error) {
    // Catch any other exceptions during the process
    console.error('Failed to send emails:', error);
  }
};
