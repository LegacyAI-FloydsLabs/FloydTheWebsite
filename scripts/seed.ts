import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Blog posts data
const blogPosts = [
  {
    slug: 'garage-chronicles-origins',
    title: 'The Garage Chronicles: Origins Edition',
    subtitle: 'Or: How I Learned to Build Instead of Buy Before It Was Cool',
    date: new Date('2026-02-26'),
    author: 'Douglas Talley',
    author_role: 'Founder, Floyd Labs',
    tags: ['origin', 'founder', 'history', 'manifesto'],
    excerpt: 'Look. It was 1984. I was seven years old. While my classmates were memorizing the He-Man theme song, I was in the garage dismantling my parents\' broken toaster.',
    published: true,
  },
  {
    slug: 'subscription-haters-manifesto',
    title: "The Subscription Hater's Manifesto",
    subtitle: 'Or: Why I Built an Entire AI Lab Just to Avoid Monthly Fees',
    date: new Date('2026-02-18'),
    author: 'Douglas Talley',
    author_role: 'Founder, Floyd Labs',
    tags: ['manifesto', 'subscription', 'spite', 'ownership'],
    excerpt: "I didn't set out to build Floyd Labs. I set out to stop paying subscription fees to companies that didn't deserve my money.",
    published: true,
  },
  {
    slug: 'the-suite-james-bravo-returns',
    title: 'The Suite',
    subtitle: 'James Bravo Returns to the Garage',
    date: new Date('2026-02-20'),
    author: 'James Bravo',
    author_role: 'Tech Reporter',
    tags: ['interview', 'journalism', 'floyd-suite', 'feature'],
    excerpt: 'The reporter who first discovered Floyd Labs returns to document the evolution from a single CLI tool to an entire ecosystem.',
    published: true,
  },
  {
    slug: 'gospel-according-to-nick-beard',
    title: 'The Gospel According to Nick Beard',
    subtitle: 'The First Disciple Chronicles',
    date: new Date('2026-02-17'),
    author: 'Nick Beard',
    author_role: 'First Floyd User',
    tags: ['testimony', 'user-story', 'first-adopter', 'chronicle'],
    excerpt: 'How a random developer from Ohio became the first person outside the garage to use Floyd, and why his cat Bootsie approves.',
    published: true,
  },
  {
    slug: 'gas-station-manifesto',
    title: 'The Gas Station Manifesto',
    subtitle: 'The Powerade Chronicles',
    date: new Date('2026-02-17'),
    author: 'Anonymous Gas Station Employee',
    author_role: 'Night Shift Legend',
    tags: ['manifesto', 'powerade', 'gas-station', 'chronicle'],
    excerpt: 'A late-night philosophical treatise written on napkins at 3 AM, involving Powerade, existential dread, and why subscription models are a cosmic injustice.',
    published: true,
  },
];

// Applications data
const applications = [
  {
    name: 'Floyd CLI',
    slug: 'floyd-cli',
    status: 'available',
    icon: 'Terminal',
    color: 'cyan',
    tagline: 'The Original',
    description: 'The AI agent that started it all. Command-line interface with persistent memory, strong opinions, and zero corporate BS. Type, think, ship.',
    features: ['Persistent memory', 'Multi-agent coordination', 'Offline capable', 'Opinionated'],
    tag: 'Terminal',
    sort_order: 1,
  },
  {
    name: 'Floyd Desktop',
    slug: 'floyd-desktop',
    status: 'available',
    icon: 'Monitor',
    color: 'pink',
    tagline: 'Visual Layer',
    description: 'Visual interface for people who hate CLIs but still love Floyd. Spawns swarms of agents without breaking things (mostly). Desktop-native and fast.',
    features: ['Visual agent management', 'Drag-and-drop workflows', 'Desktop native', 'Agent swarms'],
    tag: 'GUI',
    sort_order: 2,
  },
  {
    name: 'Floyd IDE',
    slug: 'floyd-ide',
    status: 'available',
    icon: 'Code2',
    color: 'green',
    tagline: 'Code Whisperer',
    description: "Code assistant that reviews your work without passive-aggression. Knows your coding style, remembers your preferences, and doesn't gaslight you about your own codebase.",
    features: ['Code review', 'Style memory', 'Refactoring assist', 'No passive aggression'],
    tag: 'IDE',
    sort_order: 3,
  },
  {
    name: 'Floyd MCP Server',
    slug: 'floyd-mcp-server',
    status: 'available',
    icon: 'Server',
    color: 'orange',
    tagline: 'The Backbone',
    description: "13 Model Context Protocol servers running the skills ecosystem. The infrastructure layer that makes everything else possible. Runs 24/7 because spite doesn't take days off.",
    features: ['13 MCP servers', '105+ skills', '24/7 uptime', 'REST endpoints'],
    tag: 'Infrastructure',
    sort_order: 4,
  },
  {
    name: 'Floyd API Gateway',
    slug: 'floyd-api-gateway',
    status: 'beta',
    icon: 'Globe',
    color: 'purple',
    tagline: 'REST Interface',
    description: 'REST API interface for integrating Floyd capabilities into your own applications. OpenAPI spec included. Authentication required. Attitude included free.',
    features: ['OpenAPI spec', 'Rate limiting', 'Auth tokens', 'Webhooks'],
    tag: 'API',
    sort_order: 5,
  },
  {
    name: 'Floyd Memory',
    slug: 'floyd-memory',
    status: 'available',
    icon: 'Brain',
    color: 'purple',
    tagline: 'Persistent Brain',
    description: 'The memory system that makes Floyd actually remember you. Stores context, preferences, conversation history, and the fact that you hate semicolons in JavaScript.',
    features: ['Long-term memory', 'Context retrieval', 'Privacy-first', 'Local storage'],
    tag: 'Storage',
    sort_order: 6,
  },
  {
    name: 'Floyd Orchestrator',
    slug: 'floyd-orchestrator',
    status: 'coming-soon',
    icon: 'Cpu',
    color: 'cyan',
    tagline: 'Multi-Agent',
    description: 'Coordinate multiple Floyd agents working on complex tasks. Task distribution, agent coordination, and parallel execution.',
    features: ['Task distribution', 'Agent coordination', 'Workflow automation', 'Parallel execution'],
    tag: 'Multi-Agent',
    sort_order: 7,
  },
  {
    name: 'Floyd Community',
    slug: 'floyd-community',
    status: 'coming-soon',
    icon: 'Users',
    color: 'pink',
    tagline: 'Coming Together',
    description: 'Share skills, workflows, and spite with other Floyd users. Community-driven development without corporate oversight.',
    features: ['Skill sharing', 'Workflow templates', 'Community support', 'No corporate oversight'],
    tag: 'Community',
    sort_order: 8,
  },
];

async function main() {
  console.log('\n🔧 Starting Floyd Labs database seed...\n');

  // Seed admin users
  console.log('👤 Seeding admin users...');
  
  const testUserPassword = await bcrypt.hash('johndoe123', 12);
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: testUserPassword,
      name: 'Test Admin',
      role: 'admin',
    },
  });

  const adminPassword = await bcrypt.hash('FloydLabs2026!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@floydslabs.com' },
    update: {},
    create: {
      email: 'admin@floydslabs.com',
      password: adminPassword,
      name: 'Douglas Talley',
      role: 'admin',
    },
  });
  console.log('  ✅ Admin users seeded');

  // Seed blog posts
  console.log('\n📝 Seeding blog posts...');
  for (const post of blogPosts) {
    const existing = await prisma.blog_post.findUnique({ where: { slug: post.slug } });
    if (!existing) {
      await prisma.blog_post.create({
        data: {
          ...post,
          content: `# ${post.title}\n\n## ${post.subtitle}\n\n${post.excerpt}\n\n*Content to be added from original markdown files.*`,
        },
      });
      console.log(`  ✅ Created: ${post.title}`);
    } else {
      console.log(`  ⏭️  Skipped (exists): ${post.title}`);
    }
  }

  // Seed applications
  console.log('\n📱 Seeding applications...');
  for (const app of applications) {
    const existing = await prisma.application.findUnique({ where: { slug: app.slug } });
    if (!existing) {
      await prisma.application.create({ data: app });
      console.log(`  ✅ Created: ${app.name}`);
    } else {
      console.log(`  ⏭️  Skipped (exists): ${app.name}`);
    }
  }

  console.log('\n🎉 Seed completed!\n');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
