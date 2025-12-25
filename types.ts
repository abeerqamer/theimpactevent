
export enum Step {
  Basics = 1,
  Itinerary = 2,
  Sponsors = 3,
  Survey = 4,
  Polls = 5,
  QRMedia = 6,
  Publish = 7
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export interface EventData {
  id: string;
  name: string;
  date: string;
  location: string;
  logo?: string;
  description: string;
  socialLinks: SocialLinks;
  itinerary: Array<{
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    speaker: string;
    description: string;
  }>;
  sponsors: Array<{
    id: string;
    name: string;
    website: string;
    description: string;
    logo?: string;
  }>;
  survey: Array<{
    id: string;
    question: string;
    type: 'Text' | 'Multiple Choice';
    required: boolean;
  }>;
  polls: Array<{
    id: string;
    question: string;
    options: string[];
    media?: string;
  }>;
  status: boolean;
}
