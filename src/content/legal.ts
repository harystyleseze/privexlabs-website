// The four legal documents. A body item that is a string renders as a paragraph;
// a string array renders as a bullet list.

export const LEGAL_EMAIL = 'privacy@privexlabs.com'
export const LEGAL_UPDATED = '24 October 2026'

export type LegalSlug = 'privacy' | 'terms' | 'dpa' | 'disclaimer'

export interface LegalSection {
  heading: string
  body: readonly (string | readonly string[])[]
}

export interface LegalDoc {
  eyebrow: string
  title: string
  /** Short name for links and the footer. */
  short: string
  description: string
  intro: string
  sections: readonly LegalSection[]
}

const WHO = `PrivexLabs ("PrivexLabs", "we", "us") operates privexlabs.com. If you have any question about this document, email ${LEGAL_EMAIL}.`

export const LEGAL_PAGES: Readonly<Record<LegalSlug, LegalDoc>> = {
  privacy: {
    eyebrow: 'LEGAL / PRIVACY POLICY',
    title: 'Privacy Policy',
    short: 'Privacy Policy',
    description:
      'What PrivexLabs collects when you visit the site or get in touch, why, where it is kept, and how to have it deleted.',
    intro:
      'We collect as little as possible: what you send us when you get in touch, and nothing else worth mentioning. We use it only to reply to you, we never share it with third parties, and we delete it once our conversation is over.',
    sections: [
      { heading: 'Who we are', body: [WHO] },
      {
        heading: 'What this policy covers',
        body: [
          'This policy covers the privexlabs.com website, the contact form on it, and the email and WhatsApp channels we publish for getting in touch. Work we do for clients under a services agreement is covered by that agreement and our Data Processing Agreement.',
        ],
      },
      {
        heading: 'What we collect',
        body: [
          'Contact form: the email address you give us and the message you write. Nothing else is captured by the form.',
          'Email and WhatsApp: whatever you choose to send us, together with the address or phone number you send it from.',
          'Website: we do not run analytics or tracking cookies. Your light or dark theme choice is stored in your own browser and is never sent to us. Our hosting provider keeps standard, short-lived request logs (such as IP address and browser type) that are needed to run the site securely.',
        ],
      },
      {
        heading: 'Why we use it',
        body: [
          'We use what you send us for one purpose: to read your enquiry and get back to you about it. We do not add you to mailing lists, build profiles, or use your message for anything unrelated.',
          'Under the Nigeria Data Protection Act 2023, our lawful bases are your consent (you tick a box before sending the form) and our legitimate interest in answering people who contact us.',
        ],
      },
      {
        heading: 'Where it is kept',
        body: [
          'Contact form submissions are received and stored in Google Forms, a service of Google LLC, which stores them on our behalf. Google acts only as a storage provider for this data and is not permitted to use it for its own purposes.',
          "Email is kept in our mailbox. WhatsApp messages are kept in our WhatsApp account and are also subject to WhatsApp's own terms and privacy policy.",
        ],
      },
      {
        heading: 'Sharing',
        body: [
          'We never sell your personal data and we never share it with third parties for their own purposes. The only parties that come into contact with it are the providers that store it for us (Google, our hosting provider, and WhatsApp), and anyone we are required by law to disclose it to.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'We delete your message and contact details once we have finished dealing with your enquiry, and in any case no later than 12 months after our last contact with you.',
          `You can have it deleted sooner at any time: email ${LEGAL_EMAIL} and we will remove it from the form responses, our mailbox and WhatsApp, and confirm when it is done.`,
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You have the right to:',
          [
            'ask for a copy of the personal data we hold about you',
            'have it corrected if it is wrong',
            'have it deleted',
            'withdraw your consent at any time',
            'object to how we use it',
          ],
          `To use any of these rights, email ${LEGAL_EMAIL}. We will respond within 30 days. If you are not satisfied, you can complain to the Nigeria Data Protection Commission.`,
        ],
      },
      {
        heading: 'Security',
        body: [
          'Access to messages is limited to the people who answer enquiries. The form, our email and our website use encrypted connections. No method of storage is completely secure, but we keep what we hold small and delete it promptly, which is the best protection of all.',
        ],
      },
      {
        heading: 'Children',
        body: [
          'The site and our services are aimed at businesses. We do not knowingly collect personal data from anyone under 18.',
        ],
      },
      {
        heading: 'Changes to this policy',
        body: [
          'If we change this policy we will update the date at the top of this page. Significant changes will be explained here in plain language.',
        ],
      },
      {
        heading: 'Contact',
        body: [`Questions about this policy or your data: ${LEGAL_EMAIL}.`],
      },
    ],
  },

  terms: {
    eyebrow: 'LEGAL / TERMS OF USE',
    title: 'Terms of Use',
    short: 'Terms of Use',
    description:
      'The terms that apply when you use the PrivexLabs website and its contact channels.',
    intro:
      'These terms apply to the privexlabs.com website and the ways of contacting us that it offers. Work we do for clients is governed by a separate written services agreement, not by these terms.',
    sections: [
      { heading: 'Who we are', body: [WHO] },
      {
        heading: 'Agreeing to these terms',
        body: [
          'By using the site you agree to these terms and to our Privacy Policy, which forms part of them. If you do not agree, please do not use the site.',
        ],
      },
      {
        heading: 'What the site is',
        body: [
          'The site describes what PrivexLabs does and how we work. Nothing on it is an offer, a quotation, a guarantee of results, or professional advice for your situation. Please read the Disclaimer.',
        ],
      },
      {
        heading: 'Working with us',
        body: [
          'Any engagement between PrivexLabs and a client is governed by a separate written services agreement or statement of work. If anything in these terms conflicts with that agreement, the agreement prevails.',
        ],
      },
      {
        heading: 'Contact channels',
        body: [
          'The contact form, our email address and our WhatsApp channels are for genuine enquiries about working with us. Please do not use them to send unsolicited marketing, unlawful content, or anything you do not have the right to share.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'The content, design and code of the site, and the PrivexLabs name and mark, belong to PrivexLabs. You may view and print pages for your own, non-commercial use. You may not copy, reproduce or reuse them commercially without our written permission.',
        ],
      },
      {
        heading: 'Acceptable use',
        body: [
          'You agree not to:',
          [
            'interfere with the site or the servers it runs on',
            'attempt to gain access to parts of the site or systems you are not authorised to use',
            'scrape or harvest content or data at scale',
            'use the site in any way that breaks the law',
          ],
        ],
      },
      {
        heading: 'Third-party services',
        body: [
          'The contact form is received through Google Forms, and our WhatsApp links open WhatsApp. These services, and any other sites we link to, have their own terms and privacy practices, which we do not control.',
        ],
      },
      {
        heading: 'No warranties and limited liability',
        body: [
          'The site is provided "as is". We do our best to keep it accurate and available, but we do not promise that it will be error-free, uninterrupted or complete.',
          'To the fullest extent permitted by law, PrivexLabs is not liable for any loss or damage arising from your use of, or reliance on, the site. Nothing in these terms limits liability that cannot be limited by law.',
        ],
      },
      {
        heading: 'Governing law',
        body: [
          'These terms are governed by the laws of the Federal Republic of Nigeria. Any dispute arising from them is subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.',
        ],
      },
      {
        heading: 'Changes to these terms',
        body: [
          'We may update these terms from time to time. The date at the top of this page shows when they last changed. Continuing to use the site after a change means you accept the updated terms.',
        ],
      },
      {
        heading: 'Contact',
        body: [`Questions about these terms: ${LEGAL_EMAIL}.`],
      },
    ],
  },

  dpa: {
    eyebrow: 'LEGAL / DATA PROCESSING AGREEMENT',
    title: 'Data Processing Agreement',
    short: 'Data Processing Agreement',
    description:
      'How PrivexLabs handles personal data when it processes it on behalf of a client.',
    intro:
      "When we build or run systems for a client, we often handle personal data that belongs to the client's customers, staff or suppliers. This agreement sets out how we do that. It applies alongside the services agreement, and a signed copy is available on request.",
    sections: [
      { heading: 'Who we are', body: [WHO] },
      {
        heading: 'When this agreement applies',
        body: [
          'This agreement applies whenever PrivexLabs processes personal data on behalf of a client under a services agreement or statement of work. In the language of the Nigeria Data Protection Act 2023, the client is the data controller and PrivexLabs is the data processor.',
          "It does not apply to the client's own contact details, which we handle as described in our Privacy Policy.",
        ],
      },
      {
        heading: 'Instructions',
        body: [
          "We process personal data only on the client's documented instructions, including any instruction about transferring data to another country. If we believe an instruction breaks the law, we will say so before acting on it.",
        ],
      },
      {
        heading: 'Details of the processing',
        body: [
          'The subject matter, duration, nature and purpose of the processing, the types of personal data, and the categories of data subjects are those described in the services agreement or statement of work for the engagement.',
        ],
      },
      {
        heading: 'Confidentiality',
        body: [
          'Everyone at PrivexLabs who has access to personal data, including contractors, is bound by a duty of confidentiality and is given access only to the data they need for their work.',
        ],
      },
      {
        heading: 'Security',
        body: [
          'We put in place technical and organisational measures appropriate to the risk, including:',
          [
            'access control and least-privilege permissions',
            'encryption in transit, and at rest where the platform supports it',
            'separation of development, test and production environments',
            'private-cloud, on-premise or local deployment where the services agreement requires it',
            'logging and monitoring of access to production systems',
          ],
        ],
      },
      {
        heading: 'Sub-processors',
        body: [
          "We engage another processor (for example a cloud hosting provider) only with the client's general or specific authorisation. We give notice before adding or replacing a sub-processor, bind it to terms at least as protective as these, and remain responsible for its work. A current list of sub-processors for an engagement is available on request.",
        ],
      },
      {
        heading: 'Assistance',
        body: [
          'Taking into account the nature of the processing, we help the client respond to requests from data subjects and meet its own obligations under the Nigeria Data Protection Act 2023, including security, breach notification and data protection impact assessments.',
        ],
      },
      {
        heading: 'Personal data breaches',
        body: [
          "If we become aware of a personal data breach affecting the client's data, we notify the client without undue delay and in any case within 72 hours, and give the client the information it needs to meet its own obligations.",
        ],
      },
      {
        heading: 'Deletion and return',
        body: [
          'When the services end, we delete or return all personal data as the client instructs, and delete remaining copies, unless the law requires us to keep them.',
        ],
      },
      {
        heading: 'Audit',
        body: [
          'We make available the information needed to demonstrate compliance with this agreement, and allow for and contribute to reasonable audits by the client or an auditor it appoints, on reasonable notice.',
        ],
      },
      {
        heading: 'Liability and term',
        body: [
          "Liability under this agreement is governed by the services agreement. This agreement lasts for as long as we process personal data on the client's behalf. It is governed by the laws of the Federal Republic of Nigeria.",
        ],
      },
      {
        heading: 'Contact',
        body: [
          `To request a signed copy of this agreement, a sub-processor list, or anything else about it: ${LEGAL_EMAIL}.`,
        ],
      },
    ],
  },

  disclaimer: {
    eyebrow: 'LEGAL / DISCLAIMER',
    title: 'Disclaimer',
    short: 'Disclaimer',
    description: 'What the PrivexLabs website does and does not promise.',
    intro:
      'This site explains what we do and the kind of results our work aims for. It is general information, not advice about your business, and it is not a promise of a particular outcome.',
    sections: [
      { heading: 'Who we are', body: [WHO] },
      {
        heading: 'General information only',
        body: [
          'The content of this site is provided for general information. It is not legal, financial, tax or technical advice for your specific situation, and you should not rely on it as such. Speak to us, or to a suitable professional, about your own circumstances.',
        ],
      },
      {
        heading: 'Outcomes vary',
        body: [
          'Where we describe time saved, errors avoided, costs reduced or visibility gained, those are illustrations of what our work aims for, not guarantees. Results depend on your business, your data, your processes and the people using the systems. Any commitment we make is made only in a written services agreement.',
        ],
      },
      {
        heading: 'About AI',
        body: [
          'AI systems can produce output that is incorrect, incomplete or out of date. We design the systems we build so that output can be reviewed and measured, but no AI system is error-free, and decisions that matter should always involve a person.',
        ],
      },
      {
        heading: 'Third-party tools and links',
        body: [
          'Mentions of third-party products and services, and links to other sites, are provided for convenience and are not endorsements. Those services have their own terms and privacy practices, and we are not responsible for them.',
        ],
      },
      {
        heading: 'Availability',
        body: [
          'We may change, remove or add content at any time without notice, and we do not guarantee that the site is error-free or always available.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          'To the fullest extent permitted by the laws of the Federal Republic of Nigeria, PrivexLabs is not liable for any loss or damage arising from reliance on the content of this site. Nothing here limits liability that cannot be limited by law.',
        ],
      },
      {
        heading: 'Contact',
        body: [`Questions about this disclaimer: ${LEGAL_EMAIL}.`],
      },
    ],
  },
}

export const LEGAL_SLUGS: readonly LegalSlug[] = [
  'privacy',
  'terms',
  'dpa',
  'disclaimer',
]
