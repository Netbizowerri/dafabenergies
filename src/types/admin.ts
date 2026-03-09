export interface AdminSummary {
  totalInquiries: number;
  activeProjects: number;
  websiteVisits: number;
  pendingQuotes: number;
}

export type InquiryPriority = "High" | "Medium" | "Low";

export interface InquiryOrder {
  id: string;
  clientName: string;
  company: string;
  service: string;
  location: string;
  budget: string;
  status: string;
  priority: InquiryPriority;
  channel: string;
  submittedAt: string;
  notes: string;
}

export interface AdminProject {
  id: string;
  title: string;
  client: string;
  stage: string;
  completion: number;
  dueDate: string;
  systemSize: string;
}

export interface TrafficSource {
  source: string;
  visits: number;
  conversionRate: string;
  delta: string;
}

export interface AdminMockData {
  summary: AdminSummary;
  inquiries: InquiryOrder[];
  projects: AdminProject[];
  trafficSources: TrafficSource[];
}
