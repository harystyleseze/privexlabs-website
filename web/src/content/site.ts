// All site copy and data, taken verbatim from the design (docs/PrivexLabs Website.dc.html).

export type NavLink = readonly [label: string, href: string]
export const NAV: readonly NavLink[] = [
  ['WORK', '#approach'],
  ['CAPABILITIES', '#capabilities'],
  ['LAB', '#lab'],
  ['ABOUT', '#about'],
  ['CONTACT', '#contact'],
]

export type MenuItem = readonly [k: string, label: string, href: string]
export const MENU: readonly MenuItem[] = [
  ['01', 'Overview', '#overview'],
  ['02', 'From data to value', '#signal'],
  ['03', 'Vision & mission', '#vision'],
  ['04', 'Capabilities', '#capabilities'],
  ['05', 'Approach', '#approach'],
  ['06', 'Infrastructure', '#infrastructure'],
  ['07', 'Five questions', '#questions'],
  ['08', 'System map', '#system'],
  ['09', 'Lab', '#lab'],
  ['10', 'Principles', '#principles'],
  ['11', 'About', '#about'],
  ['12', 'Direction', '#direction'],
  ['13', 'Contact', '#contact'],
]

export const COMPANY_SENTENCE =
  'PrivexLabs is an AI and software technology company that helps businesses build, deploy, and operate intelligent systems using their data, workflows, and infrastructure.'

export const OV =
  "PrivexLabs is not focused on building technology for technology's sake. We focus on solving meaningful problems, improving how organizations operate, and creating systems that make work more efficient, intelligent, and accessible."

/** Words of OV rendered in brand primary. */
export const OV_HIGHLIGHT: ReadonlySet<string> = new Set([
  'meaningful',
  'problems,',
])

export type Stage = readonly [word: string, status: string, copy: string]
export const STAGES: readonly Stage[] = [
  [
    'Data.',
    'SIGNAL DETECTED',
    'Significant amounts of data. Repetitive workflows. Specialized knowledge. Operational processes that can benefit from intelligent automation.',
  ],
  [
    'Patterns.',
    'PROCESSING',
    'We identify problems where software, automation, or AI can produce meaningful value.',
  ],
  [
    'Intelligence.',
    'MODEL / READY',
    'We help organizations identify valuable opportunities for AI, build custom AI-powered systems, and work with proprietary data.',
  ],
  [
    'Systems.',
    'SYSTEM / ONLINE',
    'We deploy AI models within controlled environments and integrate intelligent systems into real-world business operations.',
  ],
  [
    'Business value.',
    'OUTCOME / MEASURED',
    'The goal is simple: turn AI and technology into practical business value.',
  ],
]

export const MISSION: readonly string[] = [
  'Identifying high-value business problems.',
  'Designing and building practical software solutions.',
  'Integrating AI into existing business processes.',
  'Helping organizations use their proprietary data with AI.',
  'Deploying AI models in private, local, cloud, or hybrid environments.',
  'Developing and customizing AI models where appropriate.',
  'Training organizations and technical teams to effectively use AI.',
  'Turning successful solutions into scalable products.',
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
    short: 'AI engineering',
    name: 'AI engineering',
    x: 50,
    y: 9,
    d: 'M50 50 V9',
    lead: 'We design and build AI-powered applications and systems for specific business needs.',
    groups: [
      {
        t: 'Capabilities include',
        items: [
          'AI assistants and copilots',
          'AI agents',
          'Retrieval-augmented generation (RAG)',
          'Intelligent workflow automation',
          'AI-powered search',
          'Document intelligence',
          'Natural-language interfaces',
          'Multimodal AI applications',
          'AI integrations',
          'AI-powered business applications',
        ],
      },
    ],
    note: '',
  },
  {
    k: '02',
    short: 'Private & enterprise AI',
    name: 'Private & enterprise AI',
    x: 86,
    y: 31,
    d: 'M50 50 V31 H86',
    lead: 'We help organizations use AI with their proprietary information while maintaining appropriate control over their data and infrastructure.',
    groups: [
      {
        t: 'Solutions may include',
        items: [
          'Private AI deployments',
          'On-premise AI',
          'Private-cloud AI',
          'Hybrid AI architectures',
          'Local model deployment',
          'Secure enterprise AI environments',
          'Proprietary knowledge systems',
          'Internal AI assistants',
          'AI access and permission systems',
        ],
      },
    ],
    note: 'The objective is to help organizations move from simply using public AI tools to developing AI capabilities that fit their own operational and security requirements.',
  },
  {
    k: '03',
    short: 'Model development',
    name: 'AI model development & customization',
    x: 86,
    y: 69,
    d: 'M50 50 V69 H86',
    lead: 'Where existing models are insufficient, PrivexLabs can research, adapt, optimize, or develop models for specific applications.',
    groups: [
      {
        t: 'This may include',
        items: [
          'Model fine-tuning',
          'Domain adaptation',
          'Model evaluation',
          'Embedding models',
          'Classification models',
          'Speech and language models',
          'Computer vision models',
          'Smaller specialized models',
          'Model optimization',
          'Quantization and inference optimization',
          'Synthetic-data workflows',
          'Model benchmarking',
        ],
      },
    ],
    note: 'Where an existing model is sufficient, we use it. Where customization provides meaningful value, we customize it. Where a proprietary model is justified, we develop one.',
  },
  {
    k: '04',
    short: 'Software engineering',
    name: 'Software engineering',
    x: 14,
    y: 69,
    d: 'M50 50 V69 H14',
    lead: 'AI is only useful when it can operate inside real business systems.',
    groups: [
      {
        t: 'Capabilities include',
        items: [
          'Web applications',
          'Mobile applications',
          'Business platforms',
          'APIs',
          'Backend systems',
          'Databases',
          'Integrations',
          'Automation systems',
          'Internal tools',
          'Cloud infrastructure',
          'Data systems',
        ],
      },
    ],
    note: 'The combination of software engineering and AI allows PrivexLabs to build complete solutions rather than isolated AI demonstrations.',
  },
  {
    k: '05',
    short: 'AI infrastructure',
    name: 'AI infrastructure',
    x: 50,
    y: 91,
    d: 'M50 50 V91',
    lead: 'PrivexLabs helps organizations build the infrastructure required to operate AI systems reliably.',
    groups: [
      {
        t: 'This can include',
        items: [
          'Model serving',
          'GPU infrastructure',
          'Local inference',
          'Cloud inference',
          'Model gateways',
          'AI APIs',
          'Vector databases',
          'Data pipelines',
          'Evaluation systems',
          'Monitoring',
          'Model management',
          'Security controls',
          'Deployment automation',
        ],
      },
    ],
    note: 'The long-term objective is to help organizations develop an AI operating capability, rather than simply purchase individual AI tools.',
  },
  {
    k: '06',
    short: 'Training & education',
    name: 'AI training & education',
    x: 14,
    y: 31,
    d: 'M50 50 V31 H14',
    lead: 'Technology adoption requires people who understand how to use it.',
    groups: [
      {
        t: 'Business teams',
        items: [
          'Generative AI',
          'AI-assisted workflows',
          'Prompting',
          'AI productivity',
          'Responsible AI use',
          'AI-enabled business processes',
        ],
      },
      {
        t: 'Technical teams',
        items: [
          'AI application development',
          'LLMs',
          'RAG',
          'AI agents',
          'Model deployment',
          'Fine-tuning',
          'AI infrastructure',
          'Model evaluation',
          'Local AI',
        ],
      },
      {
        t: 'Leadership',
        items: [
          'AI opportunities',
          'AI strategy',
          'AI adoption',
          'AI risks',
          'Data requirements',
          'Infrastructure decisions',
          'Build-vs-buy decisions',
        ],
      },
    ],
    note: '',
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
    t: "We study the organization's processes, data, customers, employees, and operational challenges.",
    o: [],
  },
  {
    n: 'Identify',
    t: 'We identify problems where software, automation, or AI can produce meaningful value.',
    o: [],
  },
  {
    n: 'Design',
    t: 'We determine the appropriate technical approach. This could be:',
    o: [
      'Existing software',
      'Automation',
      'An AI API',
      'An open-source model',
      'A private model',
      'A custom application',
      'A custom-trained model',
      'Or a combination of technologies',
    ],
  },
  {
    n: 'Build',
    t: "We develop the solution and integrate it into the organization's existing systems.",
    o: [],
  },
  {
    n: 'Deploy',
    t: "We deploy the solution in the environment appropriate for the organization's needs:",
    o: [
      'Cloud',
      'Private cloud',
      'On-premise',
      'Local infrastructure',
      'Hybrid infrastructure',
    ],
  },
  {
    n: 'Measure',
    t: 'We evaluate whether the solution actually improves the business. The objective is not simply to deliver software. The objective is to create measurable outcomes.',
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
    name: 'Data',
    role: 'Proprietary information — the documents, records, and operational data that AI systems are built on.',
    parts: ['Data pipelines', 'Data systems', 'Databases'],
    st: 'INGEST',
  },
  {
    k: 'L02',
    name: 'Vector database',
    role: 'Embeddings and indexes that make proprietary knowledge searchable by AI systems.',
    parts: [
      'Vector databases',
      'Embedding models',
      'Proprietary knowledge systems',
    ],
    st: 'INDEXED',
  },
  {
    k: 'L03',
    name: 'Model gateway',
    role: 'A controlled entry point between applications and models.',
    parts: ['Model gateways', 'AI APIs', 'AI access and permission systems'],
    st: 'ROUTING',
  },
  {
    k: 'L04',
    name: 'Model',
    role: 'Existing, customized, or proprietary models — served in the environment the organization requires.',
    parts: [
      'Model serving',
      'GPU infrastructure',
      'Local inference',
      'Cloud inference',
      'Model management',
    ],
    st: 'MODEL / READY',
  },
  {
    k: 'L05',
    name: 'Agent',
    role: 'Systems that retrieve, reason, and act across tools and workflows.',
    parts: [
      'AI agents',
      'Retrieval-augmented generation (RAG)',
      'Intelligent workflow automation',
    ],
    st: 'AGENT / ACTIVE',
  },
  {
    k: 'L06',
    name: 'Application',
    role: 'The interface people actually use.',
    parts: [
      'AI assistants and copilots',
      'Natural-language interfaces',
      'Web applications',
      'Internal tools',
    ],
    st: 'SERVING',
  },
  {
    k: 'L07',
    name: 'Business workflow',
    role: 'Where the system meets real operations — and where outcomes are measured.',
    parts: ['Integrations', 'Automation systems', 'Business platforms'],
    st: 'IN OPERATION',
  },
  {
    k: 'R01',
    name: 'Evaluation',
    role: 'Cross-cutting: every layer is evaluated against the task it serves.',
    parts: ['Evaluation systems', 'Model evaluation', 'Model benchmarking'],
    st: 'EVALUATING',
  },
  {
    k: 'R02',
    name: 'Monitoring',
    role: 'Cross-cutting: visibility into how the system behaves in operation.',
    parts: ['Monitoring', 'Model management'],
    st: 'OBSERVING',
  },
  {
    k: 'R03',
    name: 'Security',
    role: 'Cross-cutting: appropriate control over data, models, and infrastructure.',
    parts: [
      'Security controls',
      'AI access and permission systems',
      'Secure enterprise AI environments',
    ],
    st: 'ENFORCED',
  },
  {
    k: 'X01',
    name: 'Deployment automation',
    role: 'Deploying in the environment appropriate for the organization: cloud, private cloud, on-premise, local, or hybrid infrastructure.',
    parts: [
      'Deployment automation',
      'Cloud inference',
      'Local inference',
      'Hybrid AI architectures',
    ],
    st: 'DEPLOYED',
  },
]

export type Question = readonly [text: string, tag: string]
export const QS: readonly Question[] = [
  ['Where can AI create value in our organization?', 'STRATEGY'],
  ['How can we use our proprietary data with AI?', 'DATA'],
  [
    'How can we deploy AI while maintaining control over our data and infrastructure?',
    'INFRASTRUCTURE',
  ],
  [
    'How can we build AI systems that actually integrate into our operations?',
    'ENGINEERING',
  ],
  [
    'How can we develop internal AI capabilities instead of depending entirely on external providers?',
    'EDUCATION',
  ],
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
    label: 'BUSINESS',
    x: 500,
    y: 64,
    title: 'Where can AI create value in our organization?',
    body: [
      "PrivexLabs follows a problem-first approach. We study the organization's processes, data, customers, employees, and operational challenges.",
      'Solve the problem, not the trend.',
    ],
  },
  {
    id: 'people',
    label: 'PEOPLE',
    x: 170,
    y: 170,
    title: 'Technology adoption requires people who understand how to use it.',
    body: [
      'We provide AI education and training for business teams, technical teams, and leadership.',
      'We help customers develop internal AI capabilities rather than creating permanent dependence on an external provider.',
    ],
  },
  {
    id: 'workflows',
    label: 'WORKFLOWS',
    x: 830,
    y: 170,
    title: 'Make complex technology usable.',
    body: [
      'Advanced technology has little value if ordinary employees cannot use it.',
      'We integrate AI into existing business processes — intelligent workflow automation, AI agents, and AI-enabled business processes.',
    ],
  },
  {
    id: 'data',
    label: 'DATA',
    x: 110,
    y: 360,
    title: 'How can we use our proprietary data with AI?',
    body: [
      'We help organizations use AI with their proprietary information while maintaining appropriate control over their data and infrastructure.',
      'Own what matters.',
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    x: 500,
    y: 300,
    title:
      'We design and build AI-powered applications and systems for specific business needs.',
    body: [
      'AI assistants and copilots, AI agents, retrieval-augmented generation, document intelligence, AI-powered search, and natural-language interfaces.',
    ],
  },
  {
    id: 'software',
    label: 'SOFTWARE',
    x: 890,
    y: 360,
    title:
      'AI is only useful when it can operate inside real business systems.',
    body: [
      'The combination of software engineering and AI allows PrivexLabs to build complete solutions rather than isolated AI demonstrations.',
    ],
  },
  {
    id: 'models',
    label: 'MODELS',
    x: 320,
    y: 500,
    title:
      'PrivexLabs does not assume that every problem requires a new model.',
    body: [
      'Where an existing model is sufficient, we use it. Where customization provides meaningful value, we customize it. Where a proprietary model is justified, we develop one.',
    ],
  },
  {
    id: 'infra',
    label: 'INFRASTRUCTURE',
    x: 680,
    y: 500,
    title:
      'How can we deploy AI while maintaining control over our data and infrastructure?',
    body: [
      "We deploy in the environment appropriate for the organization's needs: cloud, private cloud, on-premise, local, or hybrid infrastructure.",
    ],
  },
  {
    id: 'products',
    label: 'PRODUCTS',
    x: 500,
    y: 584,
    title: 'Turning successful solutions into scalable products.',
    body: [
      'Client problem → repeated across customers → common architecture → reusable platform → product.',
      'This allows PrivexLabs to gradually transform expertise gained through services into proprietary technology.',
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
  ['Local inference', 'INFERENCE', 'inference'],
  ['Small language models', 'MODELS', 'models'],
  ['African-language AI', 'LANGUAGE', 'lang'],
  ['AI agents', 'SYSTEMS', 'agents'],
  ['Edge AI', 'INFERENCE', 'edge'],
  ['Open-source language models', 'MODELS', 'models'],
  ['Multimodal AI', 'MODALITY', 'multi'],
  ['Speech AI', 'MODALITY', 'wave'],
  ['Computer vision', 'MODALITY', 'vision'],
  ['Model optimization', 'MODELS', 'models'],
  ['AI evaluation', 'SYSTEMS', 'eval'],
  ['Synthetic data', 'DATA', 'synth'],
  ['Domain-specific models', 'MODELS', 'models'],
  ['AI security', 'SECURITY', 'boundary'],
  ['Private AI infrastructure', 'INFRASTRUCTURE', 'boundary'],
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
    'AI should be used because it creates value, not because it is fashionable.',
  ],
  [
    'Build when building makes sense.',
    'Not every problem requires custom software or a custom model.',
  ],
  [
    'Own what matters.',
    'Organizations should have appropriate control over their data, systems, and critical technology.',
  ],
  [
    'Measure outcomes.',
    'A successful project should improve something measurable.',
  ],
  [
    'Make complex technology usable.',
    'Advanced technology has little value if ordinary employees cannot use it.',
  ],
  [
    'Build for the real world.',
    'Solutions must work under real business constraints involving cost, security, infrastructure, people, and operations.',
  ],
]

export type Differentiator = readonly [name: string, text: string]
export const DIFFS: readonly Differentiator[] = [
  ['Practical AI', 'We focus on business outcomes rather than AI hype.'],
  [
    'Private AI',
    'We help organizations maintain appropriate control over proprietary information, models, and infrastructure.',
  ],
  [
    'Full-stack capability',
    'We can work across models, data, infrastructure, software, and business workflows.',
  ],
  [
    'Customization',
    "We adapt solutions to the organization's actual needs instead of forcing every organization into the same product.",
  ],
  [
    'Knowledge transfer',
    'We help customers develop internal AI capabilities rather than creating permanent dependence on an external provider.',
  ],
]

export const SECTORS: readonly string[] = [
  'Financial institutions',
  'Healthcare organizations',
  'Logistics companies',
  'Educational institutions',
  'Professional-services firms',
  'Manufacturing companies',
  'Retail and e-commerce businesses',
  'Telecommunications companies',
  'Government and public-sector organizations',
  'Technology companies',
  'Large and growing SMEs',
]

export const DIR: readonly string[] = [
  'Software services',
  'AI engineering',
  'Private & enterprise AI',
  'Reusable AI platforms',
  'Proprietary products',
  'Technology company',
]

export const DIRECTION_CLOSING =
  'The long-term objective is not to become a company that simply builds software for clients. It is to become a company that owns technology, understands difficult business problems, develops AI capabilities, and repeatedly turns those capabilities into valuable products and systems.'

export const CHAIN: readonly string[] = [
  'Problem',
  'Data',
  'AI Strategy',
  'Model',
  'Software',
  'Infrastructure',
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
