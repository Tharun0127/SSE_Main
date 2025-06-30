import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface EnquiryConfirmationEmailProps {
  name: string;
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

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};

export const EnquiryConfirmationEmail = ({ name }: EnquiryConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your enquiry has been received | Sri Sai Enterprises</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Heading style={heading}>Thank You For Your Enquiry</Heading>
          <Hr style={hr} />
          <Text style={paragraph}>
            Hi {name},
          </Text>
          <Text style={paragraph}>
            Thank you for contacting Sri Sai Enterprises. We have successfully received your request and our team is reviewing it.
          </Text>
          <Text style={paragraph}>
            We will get back to you as soon as possible, typically within 1-2 business days.
          </Text>
           <Text style={paragraph}>
            In the meantime, feel free to browse our{' '}
            <Link href="https://srisaienterprises-892b9.web.app/products">products</Link> or learn more{' '}
            <Link href="https://srisaienterprises-892b9.web.app/about">about us</Link>.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Sri Sai Enterprises, 123 HVAC Way, Suite 100, San Francisco, CA 94105
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EnquiryConfirmationEmail;
