// All site copy and data. The structure (item counts, keys, ids, node
// positions) mirrors the design (docs/PrivexLabs Website.dc.html); the copy is
// written from the customer's point of view: growing businesses that want less
// manual work, simpler operations, and more control over how they run.

export type NavLink = readonly [label: string, href: string]
export const NAV: readonly NavLink[] = [
  ['PROBLEMS', '/#signal'],
  ['WHAT WE BUILD', '/#capabilities'],
  ['HOW WE WORK', '/#approach'],
  ['ABOUT', '/#about'],
  ['CONTACT', '/#contact'],
]

export type MenuItem = readonly [k: string, label: string, href: string]
export const MENU: readonly MenuItem[] = [
  ['01', 'Overview', '/#overview'],
  ['02', 'Where things break', '/#signal'],
  ['03', "What we're here to do", '/#vision'],
  ['04', 'What we build', '/#capabilities'],
  ['05', 'How we work', '/#approach'],
  ['06', 'What you end up with', '/#infrastructure'],
  ['07', 'Five questions', '/#questions'],
  ['08', 'How it fits together', '/#system'],
  ['09', "What we're exploring", '/#lab'],
  ['10', 'Principles', '/#principles'],
  ['11', 'Why PrivexLabs', '/#about'],
  ['12', 'Where this goes', '/#direction'],
  ['13', 'Contact', '/#contact'],
]

/** Footer links to the legal documents (routes under src/app/legal). */
export type LegalLink = readonly [label: string, href: string]
export const LEGAL_LINKS: readonly LegalLink[] = [
  ['Privacy Policy', '/legal/privacy'],
  ['Terms of Use', '/legal/terms'],
  ['Data Processing Agreement', '/legal/dpa'],
  ['Disclaimer', '/legal/disclaimer'],
]

export const COMPANY_SENTENCE =
  'PrivexLabs helps growing businesses reduce manual work, simplify operations, and build systems that give them greater control over how their business runs. Custom software, workflow automation, and practical AI, applied to real problems.'

export const OV =
  'Growing businesses run on disconnected tools, spreadsheets, repetitive admin work, and a few people who know how everything works. As the business grows, those systems stop keeping up. We build the ones that do.'

/** Words of OV rendered in brand primary. */
export const OV_HIGHLIGHT: ReadonlySet<string> = new Set([
  'ones',
  'that',
  'do.',
])

/** How to reach PrivexLabs directly. Shared by the Contact section and the footer. */
export const WHATSAPP = {
  dm: 'https://wa.me/2349066607246',
  phoneDisplay: '+234 906 660 7246',
  phoneE164: '+2349066607246',
  group:
    'https://chat.whatsapp.com/EMgDMxGlm7nH9xCgOT1sLo?s=cl&p=a&mlu=4&ilr=4',
} as const

export type Stage = readonly [word: string, status: string, copy: string]
export const STAGES: readonly Stage[] = [
  [
    'Manual.',
    'BOTTLENECK DETECTED',
    'Orders in a spreadsheet. Invoices typed twice. Approvals that wait for one person to be back at their desk. It works, until the volume doubles.',
  ],
  [
    'Disconnected.',
    'MAPPING',
    'Sales, operations, finance, and support each use their own tools. Nothing talks to anything else, so people become the integration layer.',
  ],
  [
    'Automated.',
    'AUTOMATION / RUNNING',
    "We take the repetitive work out of people's hands: data entry, follow-ups, reconciliations, reports, handoffs between teams.",
  ],
  [
    'Connected.',
    'SYSTEMS / LINKED',
    "We connect the tools you already have and build the internal tools you're missing, so information moves on its own and lives in one place.",
  ],
  [
    'In control.',
    'OUTCOME / MEASURED',
    "You see what's happening across the business, errors drop, delays shrink, and the business no longer depends on who's in the office today.",
  ],
]

export const MISSION: readonly string[] = [
  'Finding the manual work that costs you the most time and money.',
  'Automating repetitive tasks so people can focus on work that needs judgement.',
  'Connecting the tools you already use so data is entered once and flows everywhere.',
  "Building internal tools for the parts of your business off-the-shelf software doesn't fit.",
  'Making information easy to find, trust, and act on.',
  'Adding AI where it delivers measurable value, and nowhere else.',
  'Keeping your data and systems under your control.',
  'Training your team so the systems keep working after we leave.',
]

export interface CapabilityGroup {
  t: string
  items: readonly string[]
}
export interface Capability {
  k: string
  short: string
  name: string
  /** node position, percent of the diagram box */
  x: number
  y: number
  /** orthogonal path from the core (viewBox 0 0 100 100) */
  d: string
  lead: string
  groups: readonly CapabilityGroup[]
  note: string
}
export const CAPS: readonly Capability[] = [
  {
    k: '01',
    short: 'Workflow automation',
    name: 'Workflow automation',
    x: 50,
    y: 9,
    d: 'M50 50 V9',
    lead: "The repetitive work that eats your team's week, done by software instead.",
    groups: [
      {
        t: 'Typical work we automate',
        items: [
          'Data entry and re-keying',
          'Approvals and handoffs',
          'Invoicing and reconciliation',
          'Customer follow-ups',
          'Scheduled reports',
          'Document generation',
          'Notifications and reminders',
          'Onboarding checklists',
          'Inventory and order updates',
          'Exception alerts',
        ],
      },
    ],
    note: "If a task happens the same way every time, it probably shouldn't need a person.",
  },
  {
    k: '02',
    short: 'Connected systems',
    name: 'System integration',
    x: 86,
    y: 31,
    d: 'M50 50 V31 H86',
    lead: 'Your tools already hold the data. We make them share it, so nothing is typed twice and nothing falls between them.',
    groups: [
      {
        t: 'What we connect',
        items: [
          'Accounting and invoicing',
          'CRM and sales',
          'Inventory and orders',
          'Payments',
          'Spreadsheets and forms',
          'Email and messaging',
          'Field and delivery apps',
          'Existing databases',
          'Third-party APIs',
        ],
      },
    ],
    note: 'The goal is one source of truth, not another dashboard to maintain.',
  },
  {
    k: '03',
    short: 'Internal tools',
    name: 'Custom software & internal tools',
    x: 86,
    y: 69,
    d: 'M50 50 V69 H86',
    lead: "For the parts of your business where off-the-shelf software doesn't fit, we build exactly what you need and nothing you don't.",
    groups: [
      {
        t: 'What we build',
        items: [
          'Operations dashboards',
          'Order and job tracking',
          'Customer and client portals',
          'Back-office admin tools',
          'Mobile apps for field teams',
          'Web applications',
          'Approval and request systems',
          'Reporting tools',
          'Data capture forms',
          'Business platforms',
          'APIs and backends',
          'Databases',
        ],
      },
    ],
    note: 'Built to replace the spreadsheet, not to sit beside it.',
  },
  {
    k: '04',
    short: 'Information access',
    name: 'Information access & visibility',
    x: 14,
    y: 69,
    d: 'M50 50 V69 H14',
    lead: "Know what's happening across the business without chasing people for numbers.",
    groups: [
      {
        t: 'What this looks like',
        items: [
          'Live operational dashboards',
          'Automated daily and weekly reports',
          'Search across documents and records',
          'Document intelligence',
          'Assistants that answer from your own records',
          'Audit trails',
          'Alerts when numbers drift',
          'Data consolidated from every tool',
          'Role-based views',
          'Plain-language questions',
          'Mobile access',
        ],
      },
    ],
    note: 'Visibility is what turns "I think" into "I know".',
  },
  {
    k: '05',
    short: 'Practical AI',
    name: 'Practical AI',
    x: 50,
    y: 91,
    d: 'M50 50 V91',
    lead: 'We add AI where it does measurable work: reading documents, answering questions from your records, routing requests, drafting the routine.',
    groups: [
      {
        t: 'Where AI earns its place',
        items: [
          'Document reading and extraction',
          'Internal assistants and copilots',
          'Search over your own knowledge',
          'Request classification and routing',
          'Drafting routine communications',
          'AI agents inside workflows',
          'Speech and language interfaces',
          'Multimodal applications',
          'Custom or fine-tuned models where justified',
          'Evaluation and monitoring',
        ],
      },
    ],
    note: 'Where a simple rule works, we use the rule. Where an existing model works, we use it. We build a model only when the problem justifies it.',
  },
  {
    k: '06',
    short: 'Private & secure',
    name: 'Private deployment & control',
    x: 14,
    y: 31,
    d: 'M50 50 V31 H14',
    lead: 'Your data, your systems, your terms. We deploy where you need it and keep control with you.',
    groups: [
      {
        t: 'Deployment',
        items: [
          'Cloud',
          'Private cloud',
          'On-premise',
          'Local and hybrid',
          'Private AI deployments',
        ],
      },
      {
        t: 'Control',
        items: [
          'Access and permission systems',
          'Security controls',
          'Data ownership',
          'Monitoring',
        ],
      },
      {
        t: 'Independence',
        items: [
          'Documentation and handover',
          'Team training',
          'No lock-in to us or a vendor',
        ],
      },
    ],
    note: 'The objective is a capability you own, not a dependency you rent.',
  },
]

export interface Step {
  n: string
  t: string
  o: readonly string[]
}
export const STEPS: readonly Step[] = [
  {
    n: 'Understand',
    t: 'We spend time in your business: how orders come in, how work moves between people, where things wait, where things go wrong.',
    o: [],
  },
  {
    n: 'Identify',
    t: 'We find the handful of problems where fixing the process would save the most time, money, or stress, and put them in order.',
    o: [],
  },
  {
    n: 'Design',
    t: 'We choose the simplest approach that will actually hold up. That could be:',
    o: [
      'Configuring software you already have',
      'Automating a workflow',
      'Connecting two systems',
      'A small internal tool',
      'A custom application',
      'An AI component',
      'A private model',
      'Or a combination',
    ],
  },
  {
    n: 'Build',
    t: 'We build it and plug it into the tools and routines your team already uses, so adoption is a small step rather than a retraining exercise.',
    o: [],
  },
  {
    n: 'Deploy',
    t: 'We run it where it makes sense for your business:',
    o: [
      'Cloud',
      'Private cloud',
      'On-premise',
      'Local infrastructure',
      'Hybrid',
    ],
  },
  {
    n: 'Measure',
    t: "We check whether it actually changed something: hours saved, errors avoided, days shortened, questions answered. If it didn't, we go back to step one.",
    o: [],
  },
]

/** Station centers on the 600×400 approach loop. */
export const ST_POS: readonly (readonly [number, number])[] = [
  [100, 40],
  [300, 40],
  [500, 40],
  [500, 360],
  [300, 360],
  [100, 360],
]

export interface Layer {
  k: string
  name: string
  role: string
  parts: readonly string[]
  st: string
}
export const LAYERS: readonly Layer[] = [
  {
    k: 'L01',
    name: 'Your data',
    role: 'The orders, customers, invoices, and records your business already produces, captured once and kept in one place.',
    parts: ['Databases', 'Data pipelines', 'Existing records'],
    st: 'CAPTURED',
  },
  {
    k: 'L02',
    name: 'Single source of truth',
    role: 'Everything consolidated and searchable, so two people never argue over which number is right.',
    parts: ['Consolidated data', 'Search and indexing', 'Document stores'],
    st: 'CONSOLIDATED',
  },
  {
    k: 'L03',
    name: 'Access & permissions',
    role: 'Who can see and change what, enforced by the system instead of by habit.',
    parts: ['Role-based access', 'Audit trails', 'API gateway'],
    st: 'CONTROLLED',
  },
  {
    k: 'L04',
    name: 'Automation',
    role: 'The rules and workflows that do the repetitive work: routing, reminders, reconciliation, reports.',
    parts: ['Workflow engine', 'Scheduled jobs', 'Integrations'],
    st: 'RUNNING',
  },
  {
    k: 'L05',
    name: 'Intelligence',
    role: 'Where it earns its place: reading documents, answering questions from your records, flagging what needs a human.',
    parts: ['AI assistants', 'Document reading', 'Models, existing or custom'],
    st: 'ASSISTING',
  },
  {
    k: 'L06',
    name: 'Tools people use',
    role: 'The screens your team actually works in: dashboards, portals, mobile apps, internal tools.',
    parts: ['Internal tools', 'Dashboards', 'Customer portals', 'Mobile apps'],
    st: 'IN USE',
  },
  {
    k: 'L07',
    name: 'Your operations',
    role: 'Where the system meets the real work, and where we measure whether it helped.',
    parts: ['Day-to-day workflows', 'Business platforms', 'Team routines'],
    st: 'IN OPERATION',
  },
  {
    k: 'R01',
    name: 'Measurement',
    role: 'Cross-cutting: every piece is judged by whether it saved time, cut errors, or improved visibility.',
    parts: ['Outcome metrics', 'Evaluation', 'Benchmarks'],
    st: 'MEASURING',
  },
  {
    k: 'R02',
    name: 'Visibility',
    role: 'Cross-cutting: you can see what the system is doing and what the business is doing.',
    parts: ['Monitoring', 'Alerts', 'Reporting'],
    st: 'OBSERVING',
  },
  {
    k: 'R03',
    name: 'Security',
    role: 'Cross-cutting: your data and systems stay under your control.',
    parts: ['Security controls', 'Permissions', 'Private deployment'],
    st: 'ENFORCED',
  },
  {
    k: 'X01',
    name: 'Runs where you need it',
    role: 'Cloud, private cloud, on-premise, local, or hybrid: wherever fits your constraints on cost, connectivity, and control.',
    parts: ['Deployment automation', 'Cloud', 'On-premise', 'Hybrid'],
    st: 'DEPLOYED',
  },
]

export type Question = readonly [text: string, tag: string]
export const QS: readonly Question[] = [
  [
    'Where is manual work costing us the most, and what should we fix first?',
    'PRIORITY',
  ],
  [
    'How do we get our tools to talk to each other instead of re-typing everything?',
    'INTEGRATION',
  ],
  [
    'How do we stop depending on one person who knows how everything works?',
    'CONTINUITY',
  ],
  [
    "How do we see what's actually happening across the business today, without chasing anyone?",
    'VISIBILITY',
  ],
  ['Where would AI genuinely help us, and where is it just noise?', 'AI'],
]

export interface MapNode {
  id: string
  label: string
  /** position in the 1000×620 map */
  x: number
  y: number
  title: string
  body: readonly string[]
}
export const MAP: readonly MapNode[] = [
  {
    id: 'business',
    label: 'YOUR BUSINESS',
    x: 500,
    y: 64,
    title: 'Where is manual work costing us the most?',
    body: [
      'We start inside your operation: how work comes in, moves between people, waits, and goes wrong.',
      'Solve the problem, not the trend.',
    ],
  },
  {
    id: 'people',
    label: 'YOUR TEAM',
    x: 170,
    y: 170,
    title: 'Systems only work if the people using them want to.',
    body: [
      'We build around how your team already works and train them so the system outlives our involvement.',
      'The aim is capability you own, not dependence on us.',
    ],
  },
  {
    id: 'workflows',
    label: 'WORKFLOWS',
    x: 830,
    y: 170,
    title: 'Repetitive work, handled by software.',
    body: [
      'Data entry, approvals, follow-ups, reconciliations, reports: automated, connected, and visible.',
      'Make complex technology usable.',
    ],
  },
  {
    id: 'data',
    label: 'YOUR DATA',
    x: 110,
    y: 360,
    title: 'One place where the numbers agree.',
    body: [
      "We consolidate what's scattered across tools and spreadsheets so information is entered once and trusted everywhere.",
      'Own what matters.',
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    x: 500,
    y: 300,
    title: 'Applied where it does measurable work.',
    body: [
      "Reading documents, answering questions from your records, routing requests, drafting the routine. Nowhere it doesn't help.",
    ],
  },
  {
    id: 'software',
    label: 'SOFTWARE',
    x: 890,
    y: 360,
    title: "Built for the parts off-the-shelf tools don't fit.",
    body: [
      'Internal tools, portals, dashboards, and integrations that replace the spreadsheet instead of sitting next to it.',
    ],
  },
  {
    id: 'models',
    label: 'MODELS',
    x: 320,
    y: 500,
    title: "Not every problem needs a new model. Most don't.",
    body: [
      'Where a rule works, we use the rule. Where an existing model works, we use it. We build one only when the problem justifies it.',
    ],
  },
  {
    id: 'infra',
    label: 'INFRASTRUCTURE',
    x: 680,
    y: 500,
    title: 'Runs where your constraints say it should.',
    body: [
      'Cloud, private cloud, on-premise, local, or hybrid, chosen for cost, connectivity, and control.',
    ],
  },
  {
    id: 'products',
    label: "WHAT'S NEXT",
    x: 500,
    y: 584,
    title: 'Systems you can grow with.',
    body: [
      'Connected, increasingly automated operations that you understand and control, and that scale as the business does.',
      'When a solution works for many customers it becomes a product, and you benefit from everything we learned.',
    ],
  },
]

export type Edge = readonly [from: string, to: string]
export const EDGES: readonly Edge[] = [
  ['business', 'people'],
  ['business', 'workflows'],
  ['business', 'ai'],
  ['people', 'data'],
  ['people', 'ai'],
  ['workflows', 'ai'],
  ['workflows', 'software'],
  ['data', 'ai'],
  ['data', 'models'],
  ['ai', 'models'],
  ['ai', 'software'],
  ['models', 'infra'],
  ['software', 'infra'],
  ['infra', 'products'],
  ['models', 'products'],
  ['software', 'products'],
]

export type SpecimenMode =
  | 'inference'
  | 'models'
  | 'lang'
  | 'agents'
  | 'edge'
  | 'multi'
  | 'wave'
  | 'vision'
  | 'eval'
  | 'synth'
  | 'boundary'

export type Experiment = readonly [
  name: string,
  domain: string,
  mode: SpecimenMode,
]
export const EXPS: readonly Experiment[] = [
  ['Running AI on your own hardware', 'PRIVACY', 'inference'],
  ['Small models that run cheaply', 'COST', 'models'],
  ['AI in African languages', 'LANGUAGE', 'lang'],
  ['Agents that complete multi-step tasks', 'AUTOMATION', 'agents'],
  ['AI that works offline, on device', 'RESILIENCE', 'edge'],
  ['Open-source models instead of subscriptions', 'COST', 'models'],
  ['Reading forms, photos, and documents', 'DOCUMENTS', 'multi'],
  ['Voice interfaces for field teams', 'ACCESS', 'wave'],
  ['Counting and inspection from camera feeds', 'VISION', 'vision'],
  ['Making models faster and cheaper to run', 'COST', 'models'],
  ['Testing whether AI output can be trusted', 'RELIABILITY', 'eval'],
  ["Training on data you don't have yet", 'DATA', 'synth'],
  ['Models for one industry or one business', 'FIT', 'models'],
  ['Keeping AI systems secure', 'SECURITY', 'boundary'],
  ['Private infrastructure for sensitive data', 'PRIVACY', 'boundary'],
]

export const MODE_L: Readonly<Record<SpecimenMode, string>> = {
  inference: 'ROUND TRIP / LOCAL',
  models: 'ACTIVATIONS',
  lang: 'LANGUAGE STREAMS',
  agents: 'TOOL CALLS',
  edge: 'ON-DEVICE',
  multi: 'SIGNAL + FRAME',
  wave: 'WAVEFORM',
  vision: 'SCAN',
  eval: 'THRESHOLD',
  synth: 'GENERATION',
  boundary: 'PRIVATE BOUNDARY',
}

export type Principle = readonly [title: string, description: string]
export const PRINCIPLES: readonly Principle[] = [
  [
    'Solve the problem, not the trend.',
    'Technology is used because it fixes something, not because it is fashionable.',
  ],
  [
    'Build only when building makes sense.',
    "If software you already own can do it, we'll tell you.",
  ],
  [
    'Own what matters.',
    'Your data, your systems, and the knowledge of how they work stay with you.',
  ],
  [
    'Measure outcomes.',
    'A project is only a success if something you can count got better.',
  ],
  [
    'Make it usable.',
    "If the team won't use it, it doesn't matter how clever it is.",
  ],
  [
    'Build for the real world.',
    'Real budgets, patchy connectivity, busy people, and systems that must keep running.',
  ],
]

export type Differentiator = readonly [name: string, text: string]
export const DIFFS: readonly Differentiator[] = [
  [
    'Problem first',
    'We start with what slows your business down, not with a technology we want to sell.',
  ],
  [
    'Whole problem, one team',
    'Software, automation, data, AI, and infrastructure from the same people, so nothing falls between vendors.',
  ],
  [
    'Fits your business',
    'Built around how you actually operate, not a product everyone is forced into.',
  ],
  [
    'Your data stays yours',
    'Private deployment and appropriate control over your information, models, and systems.',
  ],
  [
    'You end up more capable',
    'Documentation, training, and handover, so you depend on us less over time, not more.',
  ],
]

/** Situations a growing business will recognise itself in (rendered under "You'll recognise yourself if"). */
export const SECTORS: readonly string[] = [
  'Orders or jobs tracked in spreadsheets',
  'The same data typed into two or three systems',
  'One person who knows how everything works',
  'Monthly reports assembled by hand',
  'Approvals that wait for someone to be in the office',
  'Customers asking for updates you have to look up',
  'Errors discovered weeks after they happened',
  "Tools that don't talk to each other",
  'No clear view of what happened today',
  'Off-the-shelf software that almost fits',
  'A team spending its week on admin instead of customers',
]

export const DIR: readonly string[] = [
  'Manual and fragmented',
  'Mapped and prioritised',
  'Automated where it hurts',
  'Connected end to end',
  'Visible and measured',
  'In control and growing',
]

export const DIRECTION_CLOSING =
  "The end state is a business you can understand, control, and grow: systems that carry the routine, information you can trust, and a team free to work on what needs judgement. That's what we build toward with every customer."

export const CHAIN: readonly string[] = [
  'Problem',
  'Process',
  'Data',
  'Automation',
  'Software',
  'AI',
  'Deployment',
  'Operations',
]

export const LANG: readonly string[] = [
  'habari',
  'báwo ni',
  'sannu',
  'sawubona',
  'ndewo',
  'ሰላም',
  'dumela',
  'molo',
  'akwaaba',
  'jambo',
  'mhoro',
  'salaam',
]
