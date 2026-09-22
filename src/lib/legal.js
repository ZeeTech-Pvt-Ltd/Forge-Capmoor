/**
 * Regulatory and contact details that do not exist yet.
 *
 * Forge Capmoor describes automated trading, client deposits and withdrawals,
 * and client funds held in custody. In Australia those are activities that
 * require an Australian Financial Services Licence, client money held in a
 * designated trust account with an Australian ADI (ASIC RG 212), and AUSTRAC
 * AML/CTF registration. None of those details are known, and inventing them
 * would be worse than admitting they are missing — a fabricated AFSL number on
 * a public site is a false regulatory claim, not a placeholder.
 *
 * So every one of them is a single, greppable, deliberately ugly token. They
 * render through `<Placeholder>` (components/Placeholder.jsx) in a marked
 * style, and they are listed in QA-REPORT.md as the exact set of values to
 * supply before launch.
 *
 * This file is pure data on purpose — it holds no JSX, so it stays importable
 * from anywhere without pulling a component into the graph.
 */
export const LEGAL_PLACEHOLDERS = {
  entity: '[LEGAL ENTITY NAME]',
  afsl: '[AFSL NUMBER]',
  abn: '[ABN / ACN]',
  jurisdiction: '[STATE OR TERRITORY]',
  email: '[SUPPORT EMAIL]',
  office: '[REGISTERED OFFICE]',
  hours: '[SUPPORT HOURS]',
}

/**
 * Shown at the top of every document that makes a regulated claim.
 *
 * This is deliberately visible to visitors rather than a code comment. If the
 * site is ever deployed with the details below still unfilled, the gap should
 * be obvious to anyone reading it — including a regulator.
 */
export const LAWYER_REVIEW_NOTE = [
  'This document is a working draft. The bracketed details in it are placeholders that must be replaced with the real legal entity name, AFS Licence number, ABN or ACN, registered office and governing jurisdiction.',
  'The document as a whole must be reviewed by a qualified Australian legal practitioner before it is relied on or published.',
]
