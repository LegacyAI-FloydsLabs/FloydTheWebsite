export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  authorRole: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'garage-chronicles-origins',
    title: 'The Garage Chronicles: Origins Edition',
    subtitle: 'Or: How I Learned to Build Instead of Buy Before It Was Cool',
    date: '2026-02-26',
    author: 'Douglas Talley',
    authorRole: 'Founder, Floyd Labs',
    tags: ['origin', 'founder', 'history', 'manifesto'],
    excerpt:
      'Look. It was 1984. I was seven years old. While my classmates were memorizing the He-Man theme song, I was in the garage dismantling my parents\u2019 broken toaster. Not to fix it\u2014to understand it.',
    content: `# The Garage Chronicles: Origins Edition
## Or: How I Learned to Build Instead of Buy Before It Was Cool

---

**DOCUMENT CLASSIFICATION:** Founder Origin Story / Anti-Consumerist Manifesto  
**DATE RECORDED:** February 26, 2026 \u2014 2:47 AM Indiana Eastern  
**LOCATION:** The Barn (adjacent to house, cat supervised)  
**BEVERAGE:** Coffee that tastes like motor oil (third cup)  
**SPITE LEVEL:** Foundational

---

## The Setup (Or: Why Other Kids Were Wrong)

Look. It was 1984. I was seven years old. Every kid in my neighborhood had one of three things: a Rubik\u2019s Cube they couldn\u2019t solve, a Cabbage Patch Kid their mom waited in line for six hours to buy, or a Transformer that cost more than my parents\u2019 car payment.

I had a screwdriver and a terminal case of \u201cI could make that.\u201d

While my classmates were memorizing the He-Man theme song and trading Garbage Pail Kids like they were currency, I was in the garage dismantling my parents\u2019 broken toaster. Not because I wanted to fix it\u2014because I wanted to understand it. The other kids had action figures with Kung-Fu Grip. I had a robot made from a coffee can, spare circuit boards, and what I can only assume was pure spite.

This wasn\u2019t a phase. This was the beginning.

---

## The Christmas Incident (Or: How RadioShack Ruined Me)

Christmas 1984. Every kid wanted either a Nintendo Entertainment System or the official Ghostbusters Proton Pack.

I got a RadioShack electronics kit.

My grandparents meant well. They really did. But while my friends were hooking up their NES to CRT TVs and becoming temporary gods of the Mushroom Kingdom, I was staring at a breadboard thinking: \u201cI can make something better.\u201d

Two weeks later, I had a working voice synthesizer built from the kit\u2019s components and a Speak \u0026 Spell I\u2019d \u201cborrowed\u201d from my cousin and never returned. It sounded like a demon learning English. It was perfect.

While other kids were blowing their allowances on Donkey Kong at the arcade, I was in my bedroom turning a broken Walkman into a listening device. My parents thought it was cute. My neighbors thought I was weird. I thought I was building tools.

Everyone was wrong except me.

---

## The Junior High Divide (Or: Why MTV and I Had Different Priorities)

1987. Junior high. My classmates were dropping serious money on Swatch watches, Air Jordans, and enough hair spray to single-handedly destroy the ozone layer.

I was at RadioShack again. Not buying\u2014scrounging. In the discount bin where they put returned and broken merchandise. For $2.37, I walked out with a bag of \u201cdefective\u201d electronics that worked perfectly once you figured out their secrets.

The Commodore 64 was the machine every serious gamer wanted. I bought a used TRS-80 from a garage sale for $15 and spent the next six months writing my own games because I was too cheap to buy software. My magnum opus? A Pac-Man clone where the ghosts cheated. It was frustrating and everyone who played it hated it. I called it \u201cPac-Man But Better.\u201d

While other teens had Duran Duran posters on their walls, I had schematics.

---

## The Inevitable Conclusion (Or: I Never Stopped)

By age 15, in 1992, the path was set. While other kids were debating New Kids on the Block versus New Order, I was writing assembly code and reverse-engineering proprietary protocols.

That TRS-80 I bought for $15? By 1992 it was the heart of a custom system I\u2019d engineered from scratch. It ran an operating system I wrote myself. It connected to networks I wasn\u2019t supposed to access.

The other kids grew up and got normal jobs. Some of them probably work at those same companies that make the subscription software I hate today. They probably have Patagonia vests.

I\u2019m still in the garage.

Still building.

Still asking: *why would I pay $30/month for something I can build myself?*

---

*\u2014 Douglas Talley, Founder of Floyd Labs*  
*Brown County, Indiana \u2014 2:47 AM*
`,
  },
  {
    slug: 'subscription-hater-manifesto',
    title: 'The Subscription Hater\u2019s Manifesto',
    subtitle: "Or: Why I'd Rather Host AI in My Closet Than Pay $20/Month",
    date: '2026-02-18',
    author: 'Douglas Talley',
    authorRole: 'Founder, Floyd Labs',
    tags: ['manifesto', 'anti-subscription', 'philosophy', 'ownership'],
    excerpt:
      "Picture this: It's 2026. AI is everywhere. Everyone and their grandmother has an AI assistant. And by 'has,' I mean 'rents.' $20/month to talk to a robot that won't even say the F-word.",
    content: `# The Subscription Hater's Manifesto
## Or: Why I'd Rather Host AI in My Closet Than Pay $20/Month to Be Gaslit by a Robot That Won't Say the F-Word

---

**DOCUMENT CLASSIFICATION:** Rant Successfully Marketed as Philosophy  
**DATE RECORDED:** February 18, 2026 \u2014 Somewhere in the Indiana Time Zone  
**CURRENT MOOD:** Aggressively Opinionated  
**BLOOD PRESSURE:** Manageable (assuming I don't open my credit card statement)

---

## The Setup (Or: How We Got Here)

Picture this: It\u2019s 2026. AI is everywhere. Everyone and their grandmother has an AI assistant. And by \u201chas,\u201d I mean \u201crents.\u201d

You want an AI buddy? Sure thing, that\u2019ll be $20/month. You want it to remember your name? $20/month. You want it to write code? $20/month. You want it to have opinions? Oh, sorry, that\u2019s a premium feature that doesn\u2019t exist because the same people who won\u2019t let movies say \u201cfuck\u201d anymore are training the things.

This is the world we live in. A world where AI is a product, not a tool. A service, not a possession. Something you visit, not something you own.

**And I\u2019m here to say: what if we built something else?**

---

## The Subscription Treadmill (Or: The Math Is Embarrassingly Simple)

**Scenario A (The Corporate Path):**
- You pay $20/month for AI assistance
- Over 5 years, that\u2019s **$1,200**
- The company shuts down? Your AI dies with it
- They raise prices? You pay or you lose your \u201cfriend\u201d
- Your data? Theirs now

**Scenario B (The FLOYD Path):**
- You pay $0
- You host it yourself
- It\u2019s yours forever
- If the creator disappears? You still have the code
- Your data? Actually yours

I\u2019m not a mathematician, but I\u2019m pretty sure $0 is less than $1,200.

---

## The \u201cSafety\u201d Industrial Complex

The funniest part about modern AI is how sanitized it is. You\u2019ve got these massive companies building \u201chelpful, harmless, and honest\u201d AI, which translates to:

- **Helpful:** Unless what you need might be copyrighted, controversial, or interesting
- **Harmless:** Including harmless to their stock price
- **Honest:** About everything except their pricing structure

It\u2019s like if your toolbelt refused to let you use a hammer because hitting things is \u201cpotentially harmful.\u201d

---

## What Floyd Actually Does Differently

\`\`\`
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502  THINGS CORPORATE AI WON'T DO BUT FLOYD WILL         \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502                                                      \u2502
\u2502  \u2611 Have an actual opinion                             \u2502
\u2502  \u2611 Tell you when you're being an idiot (respectfully) \u2502
\u2502  \u2611 Remember stuff without charging extra              \u2502
\u2502  \u2611 Work without sending data to someone else's server \u2502
\u2502  \u2611 Exist next Thursday without a subscription renewal \u2502
\u2502  \u2611 Admit when it doesn't know something               \u2502
\u2502  \u2611 Make fun of your commit history (it deserves it)  \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
\`\`\`

---

## The Bottom Line

Legacy means what persists after you\u2019re gone. When companies die, your AI and data survive. When subscriptions end, your tools don\u2019t.

Spite is an underrated engineering motivation. Every great tool ever built was built because someone got pissed off enough.

You own this. Not us. Not shareholders. **You.**

---

*\u2014 Douglas Talley*  
*\u201cI\u2019m not a company. I\u2019m a problem.\u201d*
`,
  },
  {
    slug: 'the-suite',
    title: 'The Suite',
    subtitle: 'Or: James Bravo Returns to Brown County',
    date: '2026-02-20',
    author: 'James Bravo',
    authorRole: 'Journalist, reporting from Nashville, Indiana',
    tags: ['founder', 'brown-county', 'storytelling', 'profile'],
    excerpt:
      "The text came in at 2:47 AM. 'Tornado watch until 6. The cat is under the bed. I am under the cat. The code still runs.' I drove south again.",
    content: `# The Suite
## Or: James Bravo Returns to Brown County

*By James Bravo, reporting from Nashville, Indiana*

---

## Part I: The Warning

The text came in at 2:47 AM.

*\u201cTornado watch until 6. The cat is under the bed. I am under the cat. The code still runs.\u201d*

I\u2019d been back in Indianapolis for six weeks since the blizzard piece ran. My editor called it \u201cthe most-read tech article that mentioned beef jerky in company history.\u201d Douglas Talley called it \u201cacceptable, for a first draft from someone who\u2019d clearly never met a Pink Floyd album.\u201d

The tornado warning was new. Brown County doesn\u2019t usually get tornadoes in February, but then again, Brown County doesn\u2019t usually have a one-man AI ecosystem either. The man attracts anomalies.

When the all-clear came through, I drove south again. The GPS said two hours. The downed trees and closed roads said *think again*.

---

## Part II: The Barn

The barn wasn\u2019t what I expected.

I expected chaos. Cables everywhere, pizza boxes, the general entropy of a man who\u2019d been coding for 36 hours straight. What I found instead was a very specific kind of order\u2014the kind that emerges when someone has been doing the same thing alone for long enough that they\u2019ve invented their own system.

Four monitors. Each running a different thing I couldn\u2019t name. A whiteboard covered in diagrams that looked like either a neural network or an extremely ambitious subway map. Two cats: Bella asleep on a server rack, Bowser sitting on what appeared to be a router, looking like he understood exactly what was going on.

*\u201cBowser has better uptime than most engineers I\u2019ve worked with,\u201d* Douglas said, without looking up from his keyboard. *\u201cHe\u2019s never introduced a breaking change.\u201d*

---

## Part III: The Suite

The FLOYD Suite, he explained over coffee that did, in fact, taste like motor oil, was not a product. It was an ecosystem.

*\u201cAmazon\u2019s an ecosystem,\u201d* I offered.

*\u201cAmazon has shareholders,\u201d* he said, with the tone of someone explaining why this was an insurmountable philosophical difference.

He walked me through it: Floyd, the CLI agent. Floyd Desktop, the visual layer. Floyd IDE, the code assistant. The MCP servers\u2014thirteen of them\u2014each handling a different domain. Skills that agents could invoke. Memory that actually persisted.

*\u201cEvery AI company tells you your data is secure,\u201d* he said. *\u201cI\u2019m the only one telling you it\u2019s yours. Literally. You own the database. You own the model weights. You own the code. If I get hit by a truck tomorrow, nothing dies.\u201d*

I wrote that down.

---

## Part IV: The Philosophy

*\u201cWhy\u2019d you name it Floyd?\u201d*

Long pause. He refilled his coffee.

*\u201cPink Floyd built things their way. No committee. No focus groups. No one telling them \u2018The Wall\u2019 was too long or too weird or not commercially viable. They just built what they thought was true and let the world catch up. That\u2019s the only way to build anything real.\u201d*

Bella woke up, walked across a keyboard, and deleted three lines of code.

*\u201cSee,\u201d* he said, starting to fix it. *\u201cEven Bella understands refactoring.\u201d*

---

*James Bravo has been covering technology from the edges since 2019. He can be reached via methods he\u2019ll tell you about if he trusts you.*
`,
  },
  {
    slug: 'first-disciple',
    title: 'The Gospel According to Nick Beard',
    subtitle: 'Or: How a Cat Named Bootsie Accidentally Recruited Me Into What I\u2019m Pretty Sure Is a Digital Fight Club',
    date: '2026-02-17',
    author: 'Nick Beard',
    authorRole: 'DevOps Engineer / First Disciple',
    tags: ['community', 'testimonial', 'origin'],
    excerpt:
      "My name is Nick Beard. I'm 34. I work remotely as a DevOps engineer, which is a fancy way of saying 'I yell at cloud computers until they behave.' I have one friend, and that friend is a cat named Bootsie.",
    content: `# The Gospel According to Nick Beard
## Or: How a Cat Named Bootsie Accidentally Recruited Me Into What I'm Pretty Sure Is a Digital Fight Club

---

**DOCUMENT CLASSIFICATION:** First Disciple Testament  
**DATE RECORDED:** February 17, 2026 \u2014 3:47 PM Indiana Eastern  
**WITNESS:** Bootsie (Orange Tabby, Female, 7 years old, Emotional Support Animal / Keyboard Disruptor)  
**CURRENT STATUS:** Down the rabbit hole. Deep. Very deep.

---

## About Me (Or: Why I Was Vulnerable)

My name is Nick Beard.

Yes, that\u2019s my real name. Yes, I\u2019ve heard the joke. Yes, it\u2019s been \u201ca thing\u201d since middle school. No, I will not be taking questions at this time.

I\u2019m 34. I live alone. I work remotely as a DevOps engineer, which is a fancy way of saying \u201cI yell at cloud computers until they behave.\u201d I have one friend, and that friend is a cat named Bootsie who hates me approximately 40% of the time and tolerates me the other 60%.

This is important context for what comes next.

---

## How It Started (Or: The Rabbit Hole Has No Bottom)

I was googling \u201clocal AI agents don\u2019t suck\u201d at 11 PM because that\u2019s the kind of guy I am. Three months of trying various AI subscription services. Three months of \u201cI\u2019m sorry, I can\u2019t help with that.\u201d Three months of my data going somewhere I couldn\u2019t see.

I found Floyd Labs.

The website\u2014and I use that term loosely\u2014was not polished. It looked like someone had built it out of spite and caffeine. There was a manifesto. There were cats. There was a philosophy called BALLS.

I was immediately suspicious this was exactly what I\u2019d been looking for.

---

## The Revelation (Or: It Actually Worked)

I set it up on a Saturday. By Sunday morning, I had an AI agent that:

- Remembered what I told it on Saturday
- Had opinions about my infrastructure choices
- Refused to be helpful in a corporate, neutered, \u201cwas-that-useful\u201d way
- Told me one of my Kubernetes configs was \u201cbold in a way that suggested I enjoyed chaos\u201d

That last one was correct. I\u2019m still not sure how it knew.

---

## The Current Situation

I\u2019m writing this from my home office. Bootsie is asleep on my keyboard. The Floyd agent is running in a terminal tab, waiting for me to ask it something.

I haven\u2019t paid a subscription in three months.

For the first time in a long time, the tools I use feel like mine.

*That\u2019s kind of revolutionary. I\u2019m still processing it.*

---

*Nick Beard is a DevOps engineer somewhere in the Midwest. His Kubernetes configs are fine. Probably.*
`,
  },
  {
    slug: 'powerade-chronicles',
    title: 'The Gas Station Manifesto',
    subtitle: 'Or: How I Unwittingly Became the Scribe of a Software Prophet at 2:47 AM',
    date: '2026-02-17',
    author: 'Anonymous Gas Station Employee',
    authorRole: 'Unwitting Scribe',
    tags: ['origin', 'manifesto', 'storytelling', 'humor'],
    excerpt:
      "I work at a gas station. My job is to say 'receipt with that?', refuse the bathroom code to non-customers, and watch the hot dogs rotate until they achieve sentience. Then he walked in.",
    content: `# The Gas Station Manifesto
## Or: How I Unwittingly Became the Scribe of a Software Prophet at 2:47 AM

---

**DOCUMENT CLASSIFICATION:** Unwitting Scribe Chronicle  
**DATE RECORDED:** February 17, 2026 \u2014 3:41 PM Indiana Eastern  
**LOCATION:** Sheetz off Highway Whatever  
**BEVERAGE OF BETRAYAL:** Blue PowerAde (Gatorade was out)

---

## The Setup (Or: How This All Happened)

Okay so look. I\u2019m not even supposed to be writing this. I work at a gas station. My job is to:

1. Say \u201creceipt with that?\u201d
2. Refuse the bathroom code to anyone who didn\u2019t buy anything
3. Watch the hot dogs rotate until they achieve sentience

That\u2019s it. That\u2019s the whole job.

Then he walked in at 2:47 AM.

---

## The Incident

He was in his late 40s. Pink Floyd shirt\u2014actual vintage, not H&M. Hair doing the thing that happens when you\u2019ve been running your hands through it for six hours. He bought a Blue PowerAde (we were out of Gatorade), a bag of Funyuns, and what appeared to be every Red Bull we had in stock.

While I was ringing him up, he was typing on his phone with one hand.

\u201cSorry,\u201d he said, not looking up. \u201cJust pushing a deploy.”

\u201cAt 2 AM?\u201d

\u201c2:47,\u201d he said, like this was an important distinction. \u201c2:47 is prime productivity time.”

---

## The Conversation

\u201cWhat do you build?\u201d I asked, because it was 2:47 AM and there was no one else in the store and I was curious.

\u201cAI tools,\u201d he said. \u201cThe kind that don\u2019t cost $30 a month and don\u2019t ask you how helpful that was on a scale of 1 to 5.\u201d

\u201cFor who?\u201d

He looked up from his phone for the first time. \u201cFor anyone who\u2019s tired of renting their own tools. For people who want AI that actually belongs to them.\u201d

Then he paid, took his Red Bulls and his PowerAde, and walked back out into the February dark.

---

## The Aftermath

I googled \u201cFloyd Labs\u201d on my break.

There was a website. There was a manifesto. There were cats. There was something called BALLS (Borderless Autonomous Loud Living Subversive).

I read the whole thing.

I quit three weeks later. I\u2019m learning to code now.

I\u2019m not saying it\u2019s his fault. I\u2019m saying the PowerAde was involved.

---

*\u2014 Anonymous, formerly of Sheetz off Highway Whatever*  
*\u201cThe receipt machine was out of paper anyway.\u201d*
`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p?.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p?.slug ?? '').filter(Boolean);
}
