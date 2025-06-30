'use server';

import { Resend } from 'resend';
import EnquiryAlertEmail from '@/emails/enquiry-alert';
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
    const { data, error } = await resend.emails.send({
      // IMPORTANT: The "from" address must be a domain you have verified with Resend.
      // Using "onboarding@resend.dev" is for testing purposes only and will not work long-term.
      from: 'Enquiry <onboarding@resend.dev>',
      to: ['trk0653705@gmail.com'],
      subject: `New Website Enquiry from ${payload.name}`,
      react: EnquiryAlertEmail(payload) as React.ReactElement,
    });

    if (error) {
      // Log the detailed error from Resend to the server console.
      console.error('Resend API Error:', error);
      return;
    }

  } catch (error) {
    // Catch any other exceptions during the process
    console.error('Failed to send email:', error);
  }
};
