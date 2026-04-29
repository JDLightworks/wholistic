# EmailJS Setup Guide for Contact Form

To enable the contact form to send emails directly to `wholistic.outreach@yahoo.com`, follow these steps:

## 1. Create an EmailJS Account
- Go to [EmailJS](https://www.emailjs.com) and sign up for a free account
- Verify your email address

## 2. Add Your Email Service
- In your EmailJS dashboard, go to **Email Services**
- Click **Create New Service**
- Choose **Gmail** or your preferred email provider
- Connect your email (wholistic.outreach@yahoo.com)
- Name it something like "Gmail Service"
- Note the **Service ID** (you'll need this)

## 3. Create an Email Template
- Go to **Email Templates**
- Click **Create New Template**
- Use this template structure:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}} ({{from_email}})
Phone: {{phone}}
Inquiry Type: {{inquiry_type}}

Message:
{{message}}
```

- Name this template something like "Contact Form"
- Note the **Template ID** (you'll need this)

## 4. Get Your Public Key
- Go to **Account** > **API Keys**
- Copy your **Public Key**

## 5. Update the Contact Form
Replace these placeholders in `src/pages/Contact.tsx`:

```typescript
// Line ~24
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');  // Replace with your Public Key

// Line ~63
await emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', {
```

With your actual credentials:
- `YOUR_EMAILJS_PUBLIC_KEY` → Your Public Key from step 4
- `YOUR_EMAILJS_SERVICE_ID` → Your Service ID from step 2
- `YOUR_EMAILJS_TEMPLATE_ID` → Your Template ID from step 3

## Example:
```typescript
emailjs.init('abc123def456ghi789');
await emailjs.send('gmail_service_123', 'contact_form_456', {
```

## 6. Test the Form
- Save your changes
- Run `npm run dev`
- Open the contact page
- Submit a test message
- Check that the email arrives at wholistic.outreach@yahoo.com

## Notes
- The free EmailJS plan includes 200 emails/month
- Emails will show as sent from your Gmail account but include the sender's details from the form
- All form data is encrypted in transit

## Troubleshooting
If emails aren't sending:
1. Verify your Public Key is correct
2. Check that your Email Service is connected properly
3. Confirm your email template has all required variables
4. Check browser console for error messages
5. Test sending from the EmailJS dashboard directly
