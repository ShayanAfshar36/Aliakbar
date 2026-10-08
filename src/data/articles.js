/**
 * Demonstration article dataset.
 *
 * NOTE FOR EDITORS: every story below is placeholder editorial content written
 * for design and development purposes. None of it describes real events,
 * people, organisations or quotations, and none of it should be published as
 * reporting. Replace this module with a CMS or news API adapter — see
 * `src/lib/articles.js`, which is the only place the UI reads content from.
 */

const photo = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;

/* eslint-disable no-unused-vars */
const img = (id, alt, caption, credit = 'Demonstration image') => ({
  src: photo(id),
  srcSmall: photo(id, 800),
  alt,
  caption,
  credit,
});
/* eslint-enable no-unused-vars */

export const articles = [
  {
    id: 'a01',
    slug: 'global-leaders-reach-critical-agreement',
    headline: 'Global Leaders Reach Critical Agreement After Intense Negotiations',
    standfirst:
      'After three days of high-level discussions, delegations announced a framework covering trade, security and climate finance. Officials describe the talks as the hardest in a decade.',
    category: 'world',
    type: 'news',
    image: {
      src: photo('1454165804606-c3d57bc86b40'),
      srcSmall: photo('1454165804606-c3d57bc86b40', 800),
      alt: 'Two officials reviewing documents at a negotiating table, laptops open beside them.',
      caption:
        'Delegations returned to the negotiating table on the final morning after a night of bilateral meetings.',
      credit: 'Demonstration image',
    },
    authorId: 'elena-marchetti',
    publishedAt: '2026-10-08T05:40:00Z',
    updatedAt: '2026-10-08T09:12:00Z',
    readingTime: 6,
    tags: ['Diplomacy', 'Trade', 'Climate finance'],
    featured: true,
    breaking: true,
    mostReadRank: 1,
    body: [
      {
        type: 'paragraph',
        text: 'Negotiators emerged shortly before dawn with a framework agreement that officials on three continents described as the most difficult to assemble in more than a decade. The text runs to ninety-one paragraphs and, for the first time, ties commitments on trade facilitation to a scheduled review of climate finance.',
      },
      {
        type: 'paragraph',
        text: 'The agreement was not reached quickly. Two draft revisions collapsed on the second evening, and a third was rewritten overnight after a bloc of smaller economies refused to sign a clause they said would lock them into obligations without matching support.',
      },
      { type: 'heading', text: 'What the framework contains' },
      {
        type: 'paragraph',
        text: 'The final document sets out three workstreams. The first covers tariff schedules and customs procedures. The second establishes a standing committee on supply-chain resilience. The third commits participants to a review mechanism for climate finance that reports every eighteen months.',
      },
      {
        type: 'list',
        items: [
          'A staged reduction in customs processing times, with a first review after two years.',
          'A standing committee on supply-chain resilience, meeting twice a year.',
          'An eighteen-month reporting cycle on climate finance commitments.',
          'A dispute-resolution annex that participating states may opt into separately.',
        ],
      },
      {
        type: 'quote',
        text: 'We did not get everything. We got the part that could hold. That is the difference between a communiqué and an agreement.',
        attribution: 'A senior negotiator speaking on condition of anonymity',
      },
      { type: 'heading', text: 'Where it could still fail' },
      {
        type: 'paragraph',
        text: 'Ratification is not guaranteed. Several delegations return home to legislatures that have rejected comparable texts, and the review mechanism has no enforcement provision beyond public reporting.',
      },
      {
        type: 'paragraph',
        text: 'Analysts also caution that the framework leaves the hardest questions — agricultural subsidies and digital services taxation — to a later round of talks scheduled for the spring.',
      },
      {
        type: 'image',
        alt: 'Press briefing room with rows of empty seats before a scheduled statement.',
        caption:
          'The closing press briefing was moved forward by four hours as delegations raced to catch rescheduled flights.',
        credit: 'Demonstration image',
        src: photo('1529107386315-e1a2ed48a620'),
        srcSmall: photo('1529107386315-e1a2ed48a620', 800),
      },
      { type: 'subheading', text: 'Reaction at home' },
      {
        type: 'paragraph',
        text: 'Business groups offered cautious support, welcoming the customs provisions while warning that the review cycle introduces uncertainty for long-term investment. Environmental organisations called the finance commitments inadequate but acknowledged the reporting mechanism as an improvement on previous rounds.',
      },
      {
        type: 'paragraph',
        text: 'The framework now goes to capitals for signature, a process officials expect to take until the end of the year.',
      },
    ],
  },
  {
    id: 'a02',
    slug: 'major-economic-report-signals-shift',
    headline: 'Major Economic Report Signals a Shift in Market Expectations',
    standfirst:
      'The quarterly outlook revises growth projections upward for the first time in two years, but warns that household budgets remain under pressure.',
    category: 'business',
    type: 'news',
    image: {
      src: photo('1444653614773-995cb1ef9efa'),
      srcSmall: photo('1444653614773-995cb1ef9efa', 800),
      alt: 'Trading screens displaying market data in a dimly lit dealing room.',
      caption: 'Trading desks repriced rate expectations within minutes of the release.',
      credit: 'Demonstration image',
    },
    authorId: 'daniel-osei',
    publishedAt: '2026-10-08T07:05:00Z',
    readingTime: 5,
    tags: ['Markets', 'Growth', 'Inflation'],
    featured: true,
    mostReadRank: 3,
    body: [
      {
        type: 'paragraph',
        text: 'The report revises projected growth upward by a modest margin, the first positive revision in eight quarters, and attributes the change to stronger-than-expected services activity and a faster than anticipated fall in energy costs.',
      },
      {
        type: 'paragraph',
        text: 'The authors are careful not to declare the pressure over. Real wages, they note, have recovered in aggregate but not for the bottom two income deciles.',
      },
      { type: 'heading', text: 'The numbers, in context' },
      {
        type: 'paragraph',
        text: 'Growth projections for the coming year rise by a fraction of a percentage point. Inflation forecasts fall slightly. Unemployment is expected to be broadly stable, with the composition of employment shifting from goods to services.',
      },
      {
        type: 'quote',
        text: 'Aggregate recovery is not the same thing as household recovery. The averages are improving faster than the experience.',
        attribution: 'Daniel Osei, Economics Correspondent',
      },
      {
        type: 'paragraph',
        text: 'Markets responded immediately. Yields on short-dated government debt fell, equity indices opened higher, and rate futures repriced a small probability of an earlier policy move.',
      },
      { type: 'heading', text: 'What could reverse it' },
      {
        type: 'paragraph',
        text: 'The report identifies three risks: a renewed energy price shock, a slower than expected easing cycle, and a sharp contraction in construction activity where permitting backlogs persist.',
      },
    ],
  },
  {
    id: 'a03',
    slug: 'new-scientific-discovery-future-medicine',
    headline: 'New Scientific Discovery Opens Possibilities for Future Medicine',
    standfirst:
      'Researchers report a previously unobserved mechanism in how cells repair damaged proteins, a finding they say could inform treatments a decade from now.',
    category: 'science',
    type: 'news',
    image: {
      src: photo('1576091160399-112ba8d25d1d'),
      srcSmall: photo('1576091160399-112ba8d25d1d', 800),
      alt: 'A researcher in a laboratory coat examining samples under a microscope.',
      caption: 'The finding emerged from six years of imaging work.',
      credit: 'Demonstration image',
    },
    authorId: 'priya-raghavan',
    publishedAt: '2026-10-07T16:20:00Z',
    readingTime: 7,
    tags: ['Research', 'Medicine', 'Cell biology'],
    featured: true,
    mostReadRank: 2,
    body: [
      {
        type: 'paragraph',
        text: 'The paper describes a repair pathway that had been hypothesised but never directly observed. If the result replicates — and the authors are explicit that replication is the next step — it would revise a long-standing assumption about how cells triage damaged proteins.',
      },
      {
        type: 'paragraph',
        text: 'The work is early. Nothing here is a treatment, and the authors are unusually direct about the distance between a mechanism and a medicine.',
      },
      { type: 'heading', text: 'How the experiment worked' },
      {
        type: 'paragraph',
        text: 'The team used a combination of live-cell imaging and a tagging technique that lets individual proteins be followed over hours. The pathway appeared only under specific stress conditions, which may explain why earlier attempts to detect it failed.',
      },
      {
        type: 'quote',
        text: 'We are not claiming a cure. We are claiming a mechanism. Those are very different sentences, and it matters that we keep them apart.',
        attribution: 'Priya Raghavan, Science Correspondent',
      },
      { type: 'subheading', text: 'Independent reaction' },
      {
        type: 'paragraph',
        text: 'Three researchers not involved in the study described the imaging as technically impressive and the interpretation as plausible but unproven. All three said the same thing: the replication matters more than the announcement.',
      },
    ],
  },
  {
    id: 'a04',
    slug: 'technology-companies-announce-ai-advances',
    headline: 'Technology Companies Announce Major Advances in Artificial Intelligence',
    standfirst:
      'Three announcements in a week promise faster models and cheaper inference. Independent evaluators say the claims are hard to verify.',
    category: 'technology',
    type: 'news',
    image: {
      src: photo('1518770660439-4636190af475'),
      srcSmall: photo('1518770660439-4636190af475', 800),
      alt: 'Rows of illuminated server racks inside a data centre.',
      caption: 'Compute capacity, not model architecture, has become the binding constraint.',
      credit: 'Demonstration image',
    },
    authorId: 'tomas-lindqvist',
    publishedAt: '2026-10-07T11:00:00Z',
    readingTime: 6,
    tags: ['Artificial intelligence', 'Infrastructure', 'Industry'],
    featured: true,
    mostReadRank: 4,
    body: [
      {
        type: 'paragraph',
        text: 'The announcements share a shape: a larger training run, a claim about efficiency, and a benchmark table. What they do not share is a common evaluation standard, which makes the comparisons in their marketing difficult to check.',
      },
      { type: 'heading', text: 'Efficiency is the new headline' },
      {
        type: 'paragraph',
        text: 'For several years the story was scale. This year the story is cost — specifically the cost of serving a request rather than training a model. Two of the three companies claimed substantial reductions in inference cost per token.',
      },
      {
        type: 'paragraph',
        text: 'Those claims are plausible but not independently reproduced. Benchmark suites are frequently tuned, and vendors rarely publish the harness needed to repeat their numbers.',
      },
      {
        type: 'quote',
        text: 'A benchmark you cannot rerun is a press release with a decimal point.',
        attribution: 'Tomas Lindqvist, Technology Editor',
      },
      { type: 'heading', text: 'What it means for buyers' },
      {
        type: 'paragraph',
        text: 'Procurement teams are increasingly asking for evaluation rights as a contractual term — the ability to run their own tests on their own data before committing to a multi-year agreement.',
      },
    ],
  },
  {
    id: 'a05',
    slug: 'climate-researchers-new-temperature-findings',
    headline: 'Climate Researchers Release New Findings on Global Temperatures',
    standfirst:
      'A synthesis of forty-one datasets finds the pace of warming at the high end of earlier estimates, with regional variation that complicates any single global number.',
    category: 'environment',
    type: 'news',
    image: {
      src: photo('1470071459604-3b5ec3a7fe05'),
      srcSmall: photo('1470071459604-3b5ec3a7fe05', 800),
      alt: 'A glacial valley under low cloud, with meltwater channels visible below.',
      caption: 'Regional records diverge sharply even where the global trend is consistent.',
      credit: 'Demonstration image',
    },
    authorId: 'amara-diallo',
    publishedAt: '2026-10-06T09:30:00Z',
    readingTime: 8,
    tags: ['Climate', 'Data', 'Research'],
    featured: true,
    mostReadRank: 5,
    body: [
      {
        type: 'paragraph',
        text: 'The synthesis combines land, ocean and satellite records and concludes that the central estimate of warming sits at the upper end of the range published five years ago. The authors are careful to note that the revision is modest and that uncertainty remains.',
      },
      { type: 'heading', text: 'Why the global average hides a lot' },
      {
        type: 'paragraph',
        text: 'A single figure conceals enormous regional differences. High-latitude regions are warming considerably faster than the tropics, and the consequences for agriculture, water and infrastructure are correspondingly uneven.',
      },
      {
        type: 'list',
        items: [
          'Land surfaces are warming faster than ocean surfaces.',
          'High latitudes show the largest anomalies in the record.',
          'Extreme-rainfall intensity is rising in most mid-latitude regions.',
          'Attribution of individual events remains methodologically demanding.',
        ],
      },
      {
        type: 'quote',
        text: 'The global mean is an accounting device. Nobody experiences a global mean.',
        attribution: 'Amara Diallo, Environment Correspondent',
      },
      { type: 'heading', text: 'The policy question' },
      {
        type: 'paragraph',
        text: 'Researchers say the findings strengthen the case for adaptation spending, particularly in regions where infrastructure was designed for a climate that no longer exists.',
      },
    ],
  },
  {
    id: 'a06',
    slug: 'international-markets-react-policy-changes',
    headline: 'International Markets React to Unexpected Policy Changes',
    standfirst:
      'An unscheduled rate adjustment caught traders off guard, moving currencies and bond yields within minutes.',
    category: 'business',
    type: 'news',
    image: {
      src: photo('1477959858617-67f85cf4f1df'),
      srcSmall: photo('1477959858617-67f85cf4f1df', 800),
      alt: 'A financial district skyline at dusk, seen across the water.',
      caption: 'The adjustment was announced outside the scheduled policy calendar.',
      credit: 'Demonstration image',
    },
    authorId: 'daniel-osei',
    publishedAt: '2026-10-06T14:10:00Z',
    readingTime: 4,
    tags: ['Markets', 'Central banking', 'Currencies'],
    mostReadRank: 7,
    body: [
      {
        type: 'paragraph',
        text: 'The move was small in absolute terms and large in signal. Announcing a change outside the published calendar is unusual, and the reaction across currency and bond markets was correspondingly sharp.',
      },
      {
        type: 'paragraph',
        text: 'Traders described the immediate response as orderly but thin. Liquidity in the affected instruments is lower than it was a year ago, which amplifies price moves.',
      },
      { type: 'heading', text: 'Reading the signal' },
      {
        type: 'paragraph',
        text: 'Analysts are divided on whether the adjustment reflects new information or a communications strategy. The accompanying statement offered little beyond a restatement of existing objectives.',
      },
    ],
  },
  {
    id: 'a07',
    slug: 'cities-introduce-transportation-plans',
    headline: 'Cities Introduce New Transportation and Infrastructure Plans',
    standfirst:
      'A coordinated programme across eleven metropolitan areas prioritises bus corridors, cycle networks and station upgrades over new road capacity.',
    category: 'world',
    type: 'news',
    image: {
      src: photo('1449824913935-59a10b8d2000'),
      srcSmall: photo('1449824913935-59a10b8d2000', 800),
      alt: 'Traffic and pedestrians on a dense city street lined with tall buildings.',
      caption: 'Most of the eleven cities are working within existing street space.',
      credit: 'Demonstration image',
    },
    authorId: 'elena-marchetti',
    publishedAt: '2026-10-05T08:00:00Z',
    readingTime: 5,
    tags: ['Infrastructure', 'Cities', 'Transport'],
    body: [
      {
        type: 'paragraph',
        text: 'The plans were developed over eighteen months and share a common assumption: that adding road capacity in dense areas generates traffic rather than relieving it.',
      },
      {
        type: 'paragraph',
        text: 'Instead, the programme concentrates spending on corridor reliability — signal priority for buses, continuous cycle routes, and platform work at the busiest interchanges.',
      },
      { type: 'heading', text: 'Funding and sequencing' },
      {
        type: 'paragraph',
        text: 'Money is staged over six years with a review at the midpoint. Several cities have made their allocation conditional on hitting ridership targets, an approach that has produced both discipline and disputes elsewhere.',
      },
    ],
  },
  {
    id: 'a08',
    slug: 'space-scientists-distant-planet-observations',
    headline: 'Space Scientists Reveal New Observations From a Distant Planet',
    standfirst:
      'Spectroscopic data from a gas giant outside our solar system shows an atmosphere more complex than models predicted.',
    category: 'science',
    type: 'analysis',
    image: {
      src: photo('1451187580459-43490279c0fa'),
      srcSmall: photo('1451187580459-43490279c0fa', 800),
      alt: 'A star field with a bright nebula rendered in deep blue and violet tones.',
      caption: 'The observations required more than two hundred hours of telescope time.',
      credit: 'Demonstration image',
    },
    authorId: 'priya-raghavan',
    publishedAt: '2026-10-04T18:45:00Z',
    readingTime: 7,
    tags: ['Astronomy', 'Exoplanets', 'Spectroscopy'],
    mostReadRank: 6,
    body: [
      {
        type: 'paragraph',
        text: 'The spectrum is the strongest yet obtained for a planet of this mass, and it shows absorption features that current atmospheric models do not reproduce cleanly.',
      },
      {
        type: 'paragraph',
        text: 'That mismatch is the interesting part. It suggests either an unusual chemistry or a limitation in how the models treat cloud formation at these temperatures.',
      },
      { type: 'heading', text: 'How the measurement was made' },
      {
        type: 'paragraph',
        text: 'The team observed the planet transiting its host star repeatedly, stacking the signals to isolate the thin contribution of the atmosphere against the glare of the star itself.',
      },
      {
        type: 'quote',
        text: 'A model that fails is not a failure. It is the only thing that tells you where the physics is incomplete.',
        attribution: 'Priya Raghavan, Science Correspondent',
      },
    ],
  },
  {
    id: 'a09',
    slug: 'major-cultural-event-draws-attention',
    headline: 'Major Cultural Event Draws International Attention',
    standfirst:
      'A retrospective spanning four decades opens to record advance bookings, with curators arguing the work has been misread for years.',
    category: 'culture',
    type: 'news',
    image: {
      src: photo('1499750310107-5fef28a66643'),
      srcSmall: photo('1499750310107-5fef28a66643', 800),
      alt: 'Visitors walking through a spacious gallery hung with large abstract works.',
      caption: 'The exhibition reorders the artist’s output chronologically for the first time.',
      credit: 'Demonstration image',
    },
    authorId: 'sofia-almeida',
    publishedAt: '2026-10-04T10:15:00Z',
    readingTime: 5,
    tags: ['Art', 'Museums', 'Criticism'],
    body: [
      {
        type: 'paragraph',
        text: 'The retrospective is the first to present the work in strict chronological order, and the effect is to dismantle a reading of the artist that has dominated criticism since the late nineties.',
      },
      {
        type: 'paragraph',
        text: 'What emerges instead is an artist who changed their mind repeatedly, and whose apparent certainties were usually arrived at late.',
      },
      { type: 'heading', text: 'The curatorial argument' },
      {
        type: 'paragraph',
        text: 'The catalogue makes an explicit case: that the early work has been treated as juvenilia when it is in fact the key to everything that follows.',
      },
    ],
  },
  {
    id: 'a10',
    slug: 'national-team-prepares-championship-match',
    headline: 'National Team Prepares for a Crucial Championship Match',
    standfirst:
      'A squad in transition faces its most demanding fixture of the qualifying campaign, with two senior players returning from injury.',
    category: 'sports',
    type: 'news',
    image: {
      src: photo('1541746972996-4e0b0f43e02a'),
      srcSmall: photo('1541746972996-4e0b0f43e02a', 800),
      alt: 'A floodlit stadium pitch seen from the stands before a match.',
      caption: 'The fixture is the last at home before a run of three away games.',
      credit: 'Demonstration image',
    },
    authorId: 'marcus-hale',
    publishedAt: '2026-10-03T19:30:00Z',
    readingTime: 4,
    tags: ['Football', 'Qualifying', 'Squad'],
    mostReadRank: 8,
    body: [
      {
        type: 'paragraph',
        text: 'The team has spent the week working on transitions, an acknowledgement that the opposition’s strength lies in the moments immediately after possession changes hands.',
      },
      {
        type: 'paragraph',
        text: 'Two senior players return to the squad after injury, though neither is expected to complete ninety minutes.',
      },
      { type: 'heading', text: 'The tactical question' },
      {
        type: 'paragraph',
        text: 'The manager must choose between a back three that has looked secure and a back four that creates more in wide areas. The decision will shape the midfield as much as the defence.',
      },
    ],
  },
  {
    id: 'a11',
    slug: 'investigation-modern-workplaces',
    headline: 'Investigative Report Examines Changes in Modern Workplaces',
    standfirst:
      'Internal documents from six large employers show how monitoring software expanded far beyond the productivity uses originally described to staff.',
    category: 'investigations',
    type: 'investigation',
    image: {
      src: photo('1521737604893-d14cc237f11d'),
      srcSmall: photo('1521737604893-d14cc237f11d', 800),
      alt: 'An open-plan office with rows of desks and monitors, photographed from above.',
      caption: 'Monitoring tools were described internally as “wellbeing analytics”.',
      credit: 'Demonstration image',
    },
    authorId: 'james-whitfield',
    publishedAt: '2026-10-02T06:00:00Z',
    readingTime: 12,
    tags: ['Work', 'Privacy', 'Accountability'],
    featured: true,
    mostReadRank: 9,
    body: [
      {
        type: 'paragraph',
        text: 'Over four months we reviewed procurement records, internal presentations and staff communications from six employers. The picture that emerges is not of a single decision but of an accumulation — tools adopted for one stated purpose and then extended for others.',
      },
      { type: 'heading', text: 'How the systems were described' },
      {
        type: 'paragraph',
        text: 'In the earliest documents, the software is framed around wellbeing: identifying staff at risk of burnout, tracking workload distribution, and supporting managers with objective data.',
      },
      {
        type: 'paragraph',
        text: 'Later materials describe a considerably broader scope. Two of the six employers added continuous screenshot capture. Four added keystroke-level activity reporting. None of the six told staff the scope had changed.',
      },
      {
        type: 'list',
        items: [
          'Procurement documents described “wellbeing analytics” in every case reviewed.',
          'Scope expansions were recorded in vendor release notes rather than staff communications.',
          'Three employers had no works-council consultation recorded before deployment.',
          'Retention periods varied from ninety days to indefinite, in one case by accident.',
        ],
      },
      {
        type: 'quote',
        text: 'The problem is not that any single step was dramatic. The problem is that no single step required anyone to decide.',
        attribution: 'A former compliance officer at one of the employers',
      },
      { type: 'heading', text: 'What the employers say' },
      {
        type: 'paragraph',
        text: 'Four of the six responded. All said their practices comply with applicable law, and two said they have since strengthened internal review. None disputed the documents.',
      },
      {
        type: 'subheading',
        text: 'Methodology' },
      {
        type: 'paragraph',
        text: 'Documents were obtained from sources at each employer and independently corroborated where possible. Where a claim rests on a single document, we say so in the text. Employers were given a detailed list of findings and a reasonable period to respond.',
      },
    ],
  },
  {
    id: 'a12',
    slug: 'new-energy-project-renewable-infrastructure',
    headline: 'New Energy Project Aims to Accelerate Renewable Infrastructure',
    standfirst:
      'A transmission-first approach reverses the usual order of build, connecting generation sites before the turbines are erected.',
    category: 'environment',
    type: 'analysis',
    image: {
      src: photo('1497436072909-60f360e1d4b1'),
      srcSmall: photo('1497436072909-60f360e1d4b1', 800),
      alt: 'Wind turbines standing in open farmland beneath a wide sky.',
      caption: 'Grid connection, not turbine supply, has been the binding constraint.',
      credit: 'Demonstration image',
    },
    authorId: 'amara-diallo',
    publishedAt: '2026-10-01T12:00:00Z',
    readingTime: 6,
    tags: ['Energy', 'Grid', 'Infrastructure'],
    body: [
      {
        type: 'paragraph',
        text: 'For a decade the bottleneck in renewable build-out has not been turbines or panels but the grid — specifically the years-long queues to connect to transmission networks that were not designed for distributed generation.',
      },
      {
        type: 'paragraph',
        text: 'The project inverts the sequence. Transmission capacity is secured first, and generation is sited to it rather than the other way around.',
      },
      { type: 'heading', text: 'Why the order matters' },
      {
        type: 'paragraph',
        text: 'Building generation before connection leaves capital idle and creates a queue that grows faster than the network. Reversing the order means paying for capacity before it is used, but it removes the risk that a completed project sits unconnected.',
      },
    ],
  },
  {
    id: 'a13',
    slug: 'opinion-the-case-for-slower-news',
    headline: 'The Case for Slower, Better News',
    standfirst:
      'Speed is a newsroom value, not a reader one. What if we optimised for understanding instead?',
    category: 'opinion',
    type: 'opinion',
    image: {
      src: photo('1504711434969-e33886168f5c'),
      srcSmall: photo('1504711434969-e33886168f5c', 800),
      alt: 'A reading room with newspapers spread across a long wooden table.',
      caption: 'Opinion: the views expressed are the author’s own.',
      credit: 'Demonstration image',
    },
    authorId: 'elena-marchetti',
    publishedAt: '2026-10-01T07:00:00Z',
    readingTime: 5,
    tags: ['Opinion', 'Media'],
    body: [
      {
        type: 'paragraph',
        text: 'There is a version of this argument that is really an argument for being slow because being fast is hard. This is not that argument. It is an argument about what readers are actually served by.',
      },
      {
        type: 'paragraph',
        text: 'Breaking news is a service. It is genuinely useful to know that something has happened. But the value decays almost immediately, and what replaces it is not more speed. It is context.',
      },
      { type: 'heading', text: 'The economics of the second day' },
      {
        type: 'paragraph',
        text: 'The second-day story is harder to write, harder to sell, and more useful. It requires someone who understands the subject to spend a day thinking rather than a minute posting.',
      },
      {
        type: 'quote',
        text: 'A newsroom that only optimises for the first hour will eventually have nothing to say in the second.',
        attribution: 'Elena Marchetti, World Affairs Editor',
      },
      {
        type: 'paragraph',
        text: 'None of this argues against urgency where urgency is warranted. It argues for spending the urgency budget deliberately rather than by default.',
      },
    ],
  },
  {
    id: 'a14',
    slug: 'inside-the-negotiating-room',
    headline: 'Inside the Negotiating Room: How a Deal Almost Fell Apart Twice',
    standfirst:
      'A reconstruction of seventy-two hours of talks, based on interviews with eleven people who were in the building.',
    category: 'politics',
    type: 'analysis',
    image: {
      src: photo('1529107386315-e1a2ed48a620'),
      srcSmall: photo('1529107386315-e1a2ed48a620', 800),
      alt: 'An empty conference hall with rows of delegate seating and microphones.',
      caption: 'The final session ran past four in the morning.',
      credit: 'Demonstration image',
    },
    authorId: 'james-whitfield',
    publishedAt: '2026-10-08T11:30:00Z',
    readingTime: 9,
    tags: ['Diplomacy', 'Analysis'],
    mostReadRank: 10,
    body: [
      {
        type: 'paragraph',
        text: 'The first collapse came on Tuesday evening and lasted ninety minutes. The second came at two in the morning and lasted four hours. Both were about the same clause, and both were resolved by the same mechanism: moving a number without moving the principle.',
      },
      { type: 'heading', text: 'Tuesday, 19:40' },
      {
        type: 'paragraph',
        text: 'A bloc of delegations asked for the review period to be shortened. The request was procedural on its face and substantive in effect, because a shorter cycle would force earlier disclosure.',
      },
      {
        type: 'quote',
        text: 'Nobody in that room disagreed about the goal. They disagreed about who would be embarrassed first.',
        attribution: 'One of the eleven people interviewed',
      },
      { type: 'heading', text: 'Wednesday, 02:10' },
      {
        type: 'paragraph',
        text: 'The second collapse was harder. Two delegations had returned to their capitals for instructions and came back with less room than they left with.',
      },
      {
        type: 'paragraph',
        text: 'The eventual resolution separated the reporting obligation from the review trigger — a distinction that reads as technical in the final text and was, according to three of those present, the entire fight.',
      },
    ],
  },
  {
    id: 'a15',
    slug: 'parliament-data-protection-bill-debate',
    headline: 'Parliament Set to Debate Landmark Data Protection Bill',
    standfirst:
      'The bill would consolidate four statutes and introduce a statutory right to explanation for automated decisions.',
    category: 'politics',
    type: 'news',
    image: {
      src: photo('1521295121783-8a321d551ad2'),
      srcSmall: photo('1521295121783-8a321d551ad2', 800),
      alt: 'The interior of a parliamentary chamber with rows of green benches.',
      caption: 'Second reading is scheduled for the end of the month.',
      credit: 'Demonstration image',
    },
    authorId: 'james-whitfield',
    publishedAt: '2026-09-30T15:00:00Z',
    readingTime: 5,
    tags: ['Legislation', 'Privacy', 'Technology'],
    body: [
      {
        type: 'paragraph',
        text: 'The bill consolidates four overlapping statutes into a single framework, a process that has taken three years and two consultations.',
      },
      {
        type: 'paragraph',
        text: 'Its most contested provision is a statutory right to explanation when an automated system makes a decision with a significant effect on an individual.',
      },
      { type: 'heading', text: 'The argument over scope' },
      {
        type: 'paragraph',
        text: 'Industry groups argue the definition of “significant effect” is too broad. Civil-liberties organisations argue it is too narrow, and that the exemptions swallow the right.',
      },
    ],
  },
  {
    id: 'a16',
    slug: 'film-festival-opens-new-wave',
    headline: 'Film Festival Opens With a Bold New Wave of Directors',
    standfirst:
      'The opening selection favours first features, a programming decision that has unsettled the festival’s traditional audience.',
    category: 'entertainment',
    type: 'news',
    image: {
      src: photo('1516321318423-f06f85e504b3'),
      srcSmall: photo('1516321318423-f06f85e504b3', 800),
      alt: 'A cinema auditorium with rows of red seats facing a lit screen.',
      caption: 'Eleven of the twenty-two competition titles are debut features.',
      credit: 'Demonstration image',
    },
    authorId: 'sofia-almeida',
    publishedAt: '2026-09-29T09:00:00Z',
    readingTime: 4,
    tags: ['Film', 'Festivals'],
    body: [
      {
        type: 'paragraph',
        text: 'The competition slate is the youngest in the festival’s recent history, with eleven debut features among twenty-two titles.',
      },
      {
        type: 'paragraph',
        text: 'Programmers describe the shift as deliberate, arguing that the festival circuit had become too reliant on a small group of established names.',
      },
    ],
  },
  {
    id: 'a17',
    slug: 'health-services-early-warning-system',
    headline: 'Health Services Trial New Early-Warning System',
    standfirst:
      'A pilot across fourteen hospitals aims to flag deteriorating patients earlier, though clinicians caution that alerts are not diagnoses.',
    category: 'health',
    type: 'news',
    image: {
      src: photo('1532094349884-543bc11b234d'),
      srcSmall: photo('1532094349884-543bc11b234d', 800),
      alt: 'A hospital corridor with clinical staff walking past a monitoring station.',
      caption: 'The pilot covers fourteen hospitals over eighteen months.',
      credit: 'Demonstration image',
    },
    authorId: 'priya-raghavan',
    publishedAt: '2026-09-28T13:20:00Z',
    readingTime: 5,
    tags: ['Health', 'Hospitals', 'Data'],
    body: [
      {
        type: 'paragraph',
        text: 'The system combines routine observations with historical patterns to produce a deterioration risk score, updated continuously and surfaced to ward staff.',
      },
      {
        type: 'paragraph',
        text: 'Clinicians involved in the pilot are enthusiastic about the direction and careful about the framing: a high score is a prompt to look, not a conclusion.',
      },
      { type: 'heading', text: 'The risk of alert fatigue' },
      {
        type: 'paragraph',
        text: 'The most common failure mode for systems of this kind is not inaccuracy but volume. If the alert fires too often, staff stop reading it, and the benefit disappears.',
      },
    ],
  },
];
