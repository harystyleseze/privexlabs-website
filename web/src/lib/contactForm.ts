// The contact card posts straight to a Google Form (no API side needed).
// Google Forms sends no CORS headers, so the request must be `no-cors`: the
// response is opaque and the only failure we can observe is a network error.

const FORM_ID = '1FAIpQLScRf_IPyNbvTbjpdcDEPzparjXj_Clhyt9YObV3c_oVjQjIoQ'

export const CONTACT_FORM_VIEW_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`
export const CONTACT_FORM_ACTION = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`

/** Field names on the form: "Collect email addresses" (responder input) and the one paragraph question. */
export const CONTACT_FORM_FIELDS = {
  email: 'emailAddress',
  problem: 'entry.474418936',
} as const

export interface ContactSubmission {
  email: string
  problem: string
}

export const contactFormBody = ({ email, problem }: ContactSubmission) =>
  new URLSearchParams({
    [CONTACT_FORM_FIELDS.email]: email.trim(),
    [CONTACT_FORM_FIELDS.problem]: problem.trim(),
  })

/** Resolves once the browser has handed the submission to Google; rejects only on a network error. */
export const submitContactForm = async (
  submission: ContactSubmission
): Promise<void> => {
  await fetch(CONTACT_FORM_ACTION, {
    method: 'POST',
    mode: 'no-cors',
    body: contactFormBody(submission),
  })
}
