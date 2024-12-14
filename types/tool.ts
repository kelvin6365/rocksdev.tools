export interface Tool {
  id: string;
  href: string | null;
}

export interface MetaTagsData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  viewport: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogImage: string;
  ogUrl: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterSite: string;
  twitterImage: string;
}

export interface FormProps {
  data: MetaTagsData;
  onChange: (data: MetaTagsData) => void;
}
