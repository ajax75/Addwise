/* Company contact details — shared by the Contact section and the Footer.
   Update these with the real values. */
export const CONTACT = {
  phones: [
    { display: "+91 79077 68464", href: "+917907768464" },
    { display: "+91 73568 68464", href: "+917356868464" }
  ],
  email: "crystalblue8464@gmail.com",
  // WhatsApp number in international format, no "+" or spaces.
  whatsappNumber: "917356868464",
  whatsappMessage: "Hi Crystal Blue, I'd like a free water analysis for my property.",
  // Number that receives the contact-form requests. TESTING NUMBER for now —
  // change this to whatsappNumber (917356868464) before going live.
  inquiryWhatsappNumber: "919995093761",
  social: {
    // Instagram handle from the profile: @crystal_blue_water_solution
    instagram: "https://www.instagram.com/crystal_blue_water_solution/",
    // TODO: replace with the exact Facebook page URL (name is "Crystal Blue Water Solutions")
    facebook: "https://www.facebook.com/CrystalBlueWaterSolution"
  }
};

/* Click-to-chat deep link. No backend or API key involved: the visitor's own
   WhatsApp opens (app on mobile, web.whatsapp.com on desktop) with `text`
   already typed, addressed to `number`. They still press send. */
export const waHref = (number, text) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

/* Formats a contact-form submission as the WhatsApp message the office receives.
   Blank optional fields are dropped so short requests stay readable. */
export const buildInquiryMessage = ({ name, phone, email, property, solutions, message }) =>
  [
    "*New Request - Crystal Blue Website*",
    "",
    `*Name:* ${name}`,
    `*Phone:* ${phone}`,
    email ? `*Email:* ${email}` : null,
    property ? `*Property:* ${property}` : null,
    solutions && solutions.length ? `*Solutions Needed:* ${solutions.join(", ")}` : null,
    message ? `*Details:* ${message}` : null
  ]
    .filter(Boolean)
    .join("\n");
