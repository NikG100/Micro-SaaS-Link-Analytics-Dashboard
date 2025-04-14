export interface User {
  email: string;
  password: string;
}

export interface Link {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  alias?: string;
  userId: string;
  expirationDate?: Date;
  clicks: number;
  analytics: Analytics[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Analytics {
  timestamp: Date;
  device: string;
  browser: string;
  ip: string;
  location: string;
}

export interface CreateLinkData {
  originalUrl: string;
  alias?: string;
  expirationDate?: Date;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LinksState {
  links: Link[];
  loading: boolean;
  error: string | null;
} 