import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface EnquiryAlertEmailProps {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  projectDetails?: string;
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #e6ebf1',
  borderRadius: '8px',
};

const box = {
  padding: '0 48px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const heading = {
  color: '#1a202c',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
};

const detailLabel = {
  fontWeight: 'bold',
  color: '#1a202c',
};

const preformatted = {
  whiteSpace: 'pre-wrap' as const,
  wordWrap: 'break-word' as const,
  backgroundColor: '#f8f8f8',
  padding: '12px',
  borderRadius: '4px',
  border: '1px solid #eaeaea',
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
};

export const EnquiryAlertEmail = ({
  name,
  email,
  phone,
  message,
  projectDetails,
}: EnquiryAlertEmailProps) => (
  <Html>
    <Head />
    <Preview>New Website Enquiry from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Heading style={heading}>New Website Enquiry</Heading>
          <Hr style={hr} />
          <Text style={paragraph}>
            You have received a new enquiry from your website contact form.
          </Text>
          
          <Section style={{ border: '1px solid #e6ebf1', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
            <Text style={paragraph}>
              <span style={detailLabel}>Name:</span> {name}
            </Text>
            <Text style={paragraph}>
              <span style={detailLabel}>Email:</span> <a href={`mailto:${email}`}>{email}</a>
            </Text>
            {phone && (
              <Text style={paragraph}>
                <span style={detailLabel}>Phone:</span> {phone}
              </Text>
            )}
          </Section>

          {message && (
             <>
                <Text style={{...paragraph, ...detailLabel, marginBottom: '4px'}}>Message:</Text>
                <Text style={paragraph}>{message}</Text>
             </>
          )}

          {projectDetails && (
            <>
              <Text style={{...paragraph, ...detailLabel, marginBottom: '4px'}}>Product Enquiry Details:</Text>
              <pre style={preformatted}>{projectDetails}</pre>
            </>
          )}

          <Hr style={hr} />
          <Text style={{ ...paragraph, fontSize: '12px', color: '#8898aa', textAlign: 'center' }}>
            This is an automated notification from Sri Sai Enterprises.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EnquiryAlertEmail;
