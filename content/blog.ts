export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  author: Author;
  content: string;
  readingTime: string;
  relatedPosts?: string[];
  tags: string[];
}

export const blogCategories = [
  'Business Strategy',
  'Technology',
  'Digital Marketing',
  'Industry Insights',
] as const;

const authors = {
  companyTeam: {
    name: 'Company Team',
    role: 'Content Team',
    avatar: '/images/team.jpg',
    bio: 'Our team of industry experts sharing insights and knowledge to help your business grow.',
    social: {
      linkedin: '/company/example-ltd',
      twitter: 'ExampleLtd',
    },
  },
  johnSmith: {
    name: 'John Smith',
    role: 'CEO',
    avatar: '/images/john-smith.jpg',
    bio: 'Founder & CEO with over 15 years of industry experience.',
    social: {
      linkedin: 'john-smith',
      twitter: 'johnsmithceo',
    },
  },
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'business-strategy-2025',
    title: 'Top Business Strategies for 2025',
    description: 'Discover the most effective business strategies that will drive growth and innovation in 2025 and beyond.',
    date: 'January 15, 2025',
    category: 'Business Strategy',
    image: '/images/business-strategy.jpg',
    author: authors.johnSmith,
    readingTime: '5 min read',
    tags: ['Strategy', 'Innovation', 'Growth', 'Planning'],
    relatedPosts: ['digital-transformation-guide', 'technology-trends'],
    content: `
# Top Business Strategies for 2025

In today's rapidly evolving business landscape, staying ahead requires innovative thinking and strategic planning. This article explores the most effective business strategies for 2025.

## Embracing Digital Transformation

Digital transformation continues to be a driving force...

## Customer-Centric Approaches

Placing customers at the centre of your business strategy...

## Sustainable Business Practices

Sustainability is no longer optional but essential...

## Data-Driven Decision Making

Leveraging data analytics to inform business decisions...

## Conclusion

Implementing these strategies will position your business for success in 2025 and beyond.
`
  },
  {
    slug: 'technology-trends',
    title: 'Emerging Technology Trends to Watch',
    description: 'Stay ahead of the curve with our analysis of the most important technology trends that will shape the future of business.',
    date: 'February 3, 2025',
    category: 'Technology',
    image: '/images/tech-trends.jpg',
    author: authors.companyTeam,
    readingTime: '4 min read',
    tags: ['Technology', 'Innovation', 'AI', 'Blockchain', 'IoT'],
    relatedPosts: ['business-strategy-2025', 'digital-transformation-guide'],
    content: `
# Emerging Technology Trends to Watch

Technology continues to evolve at a breathtaking pace. Here are the key trends to watch in the coming year.

## Artificial Intelligence Advancements

AI is becoming increasingly sophisticated...

## Blockchain Beyond Cryptocurrency

Blockchain technology is finding applications in...

## Internet of Things (IoT) Integration

The interconnected world of IoT devices...

## Edge Computing Revolution

Processing data closer to where it's generated...

## Conclusion

These technology trends represent significant opportunities for businesses willing to adapt and innovate.
`
  },
  {
    slug: 'digital-transformation-guide',
    title: 'The Complete Guide to Digital Transformation',
    description: 'Learn how to successfully navigate your organisation through the digital transformation journey with our comprehensive guide.',
    date: 'February 20, 2025',
    category: 'Technology',
    image: '/images/digital-transformation.jpg',
    author: authors.johnSmith,
    readingTime: '6 min read',
    tags: ['Digital Transformation', 'Strategy', 'Technology', 'Change Management'],
    relatedPosts: ['technology-trends', 'business-strategy-2025'],
    content: `
# The Complete Guide to Digital Transformation

Digital transformation is revolutionising how businesses operate and deliver value to customers. This guide provides a roadmap for your transformation journey.

## Understanding Digital Transformation

Digital transformation is more than just implementing new technologies...

## Creating a Digital Strategy

A successful digital transformation begins with a clear strategy...

## Technology Implementation

Selecting and implementing the right technologies...

## Cultural Change Management

The human aspect of digital transformation...

## Measuring Success

Establishing metrics to track transformation progress...

## Conclusion

Digital transformation is a continuous journey that requires commitment, strategy, and adaptability.
`
  },
  {
    slug: 'effective-marketing-strategies',
    title: 'Effective Digital Marketing Strategies for Small Businesses',
    description: 'Discover cost-effective digital marketing strategies that can help small businesses compete and thrive in today\'s marketplace.',
    date: 'March 5, 2025',
    category: 'Digital Marketing',
    image: '/images/marketing-strategies.jpg',
    author: authors.companyTeam,
    readingTime: '4 min read',
    tags: ['Digital Marketing', 'SEO', 'Social Media', 'Content Marketing'],
    relatedPosts: ['business-strategy-2025', 'industry-analysis'],
    content: `
# Effective Digital Marketing Strategies for Small Businesses

Small businesses can effectively compete in today's digital landscape with the right marketing approach. Here are strategies that deliver results without breaking the budget.

## Content Marketing Excellence

Creating valuable content that resonates with your audience...

## Search Engine Optimisation

Improving your visibility in search results...

## Social Media Engagement

Building a community around your brand...

## Email Marketing Campaigns

Nurturing customer relationships through targeted email...

## Conclusion

Implementing these digital marketing strategies will help small businesses establish a strong online presence and drive growth.
`
  },
  {
    slug: 'industry-analysis',
    title: 'Comprehensive Industry Analysis: Trends and Forecasts',
    description: 'Our detailed analysis of current industry trends and future forecasts to help you make informed business decisions.',
    date: 'March 18, 2025',
    category: 'Industry Insights',
    image: '/images/industry-analysis.jpg',
    author: authors.johnSmith,
    readingTime: '7 min read',
    tags: ['Industry Analysis', 'Market Trends', 'Forecasting', 'Research'],
    relatedPosts: ['business-strategy-2025', 'effective-marketing-strategies'],
    content: `
# Comprehensive Industry Analysis: Trends and Forecasts

Understanding industry trends is crucial for strategic planning and competitive positioning. This analysis provides insights into current trends and future directions.

## Market Overview

The current state of the industry and key players...

## Emerging Trends

Significant trends reshaping the industry landscape...

## Regulatory Considerations

How changing regulations are impacting the industry...

## Future Outlook

Predictions for industry development over the next 3-5 years...

## Conclusion

Staying informed about industry trends enables businesses to adapt strategies and capitalise on emerging opportunities.
`
  },
]; 