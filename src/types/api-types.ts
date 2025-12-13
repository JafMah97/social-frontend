// error types

export interface ApiErrorDetail {
  field: string;
  message: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: ApiErrorDetail[];
}

export interface ApiErrorResponse {
  success: false;
  error: ApiError;
}

// auth types

/// Login types

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  username: string;
}

/// Logout types
export interface LogoutResponse {
  message: string;
}

/// register types

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  fullName: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    email: string;
    username: string;
    fullName: string;
    emailVerified: boolean;
  };
}

// user types

/// Logged user types

export interface LoggedUserResponse {
  success: boolean;
  data: UserData;
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  fullName: string;
  profileImage: string;
  coverImage: string;
  isPrivate: boolean;
  isProfileComplete: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt: string; // ISO date string
  bio: string;
  website: string;
  location: string;
  dateOfBirth: string; // ISO date string
  gender: "MALE" | "FEMALE" | "OTHER";
  userSettings: UserSettings;
  userPreferences: UserPreferences;
  _count: UserCount;
}

export interface UserSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  storyViewPrivacy: "EVERYONE" | "FOLLOWERS_ONLY" | "PRIVATE";
  allowDirectMessages: "EVERYONE" | "FOLLOWERS_ONLY" | "NONE";
  showOnlineStatus: boolean;
  showReadReceipts: boolean;
  allowTagging: boolean;
  allowSharing: boolean;
  contentVisibility: "PUBLIC" | "PRIVATE";
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  language: "EN" | "AR";
  themeMode: "LIGHT" | "DARK" | "SYSTEM";
  timezone: string | null;
  locale: string | null;
  showSensitiveContent: boolean;
  defaultPostVisibility: string | null;
  itemsPerPage: number;
  layout: "comfortable" | "compact" | string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCount {
  followers: number;
  following: number;
  Post: number;
}
