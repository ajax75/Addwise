import emailjs from "@emailjs/browser";

/* Contact-form email delivery via EmailJS — sends straight from the browser,
   no backend. All three values below are public by design (EmailJS expects
   them in client code); the account's PRIVATE key must never appear here.
   Lock the account to this domain under EmailJS > Account > Security so the
   IDs can't be reused from elsewhere. */
export const EMAILJS = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  // Only takes effect if the EmailJS template's "To Email" field is set to
  // {{to_email}}. Leave blank to use whatever address the template hardcodes.
  toEmail: process.env.REACT_APP_EMAILJS_TO_EMAIL
};

// False until the three env vars are filled in, so the form can fail loudly
// in development instead of silently pretending the mail went out.
export const isEmailConfigured = () =>
  Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey);

/* Sends one inquiry. The keys here are the variable names the EmailJS template
   uses — {{name}}, {{phone}} and so on — so renaming one means editing the
   template too. Rejects on failure; the caller shows the fallback contacts. */
export const sendInquiryEmail = ({ name, phone, email, property, solutions, message }) => {
  if (!isEmailConfigured()) {
    return Promise.reject(new Error("EmailJS is not configured — see frontend/.env"));
  }

  return emailjs.send(
    EMAILJS.serviceId,
    EMAILJS.templateId,
    {
      name,
      phone,
      email: email || "Not provided",
      property: property || "Not specified",
      solutions: solutions && solutions.length ? solutions.join(", ") : "Not specified",
      message: message || "No additional details",
      // Lets the office hit reply and land in the visitor's inbox
      reply_to: email || "",
      to_email: EMAILJS.toEmail || ""
    },
    { publicKey: EMAILJS.publicKey }
  );
};
