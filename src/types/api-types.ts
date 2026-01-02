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

/// verifyEmail with code

export interface VerifyCodeData {
  code: string;
  email: string;
}

export interface VerifyCodeResponse {
  success: boolean;
  message: string;
}

/// Resend Verify Code

export interface ResendVerifyCodeData {
  email: string;
}

export interface ResendVerifyCodeResponse {
  success: boolean;
  message: string;
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

/// upload profile type
export interface UserUploadProfilePictureResponse {
  success: boolean;
  message: string;
  data: {
    profileImageUrl: string;
  };
}

/// upload cover type
export interface UserUploadCoverPictureResponse {
  success: boolean;
  message: string;
  data: {
    coverImageUrl: string;
  };
}

/// complete profile for user

export interface CompleteYourProfileData {
  bio?: string; // optional, max 500 chars
  website?: string; // optional, valid URL or empty string
  location?: string; // optional, max 100 chars
  gender?: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY"; // optional enum
  dateOfBirth?: string | null; // ISO date string, nullable
}

export interface CompleteYourProfileResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    bio?: string;
    website?: string;
    location?: string;
    gender?: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
    dateOfBirth?: string | null; // ISO date string
  };
}

// feeds types

export interface PostData {
  title?: string | null;
  content?: string | null;
  image?: string | File | null;
  format?: "TEXT" | "IMAGE" | "VIDEO" | string;
  postType?: "STANDARD" | "SPONSORED" | string;
  visibility?: "PUBLIC" | "FOLLOWERS_ONLY" | "PRIVATE" | string;
  startsAt?: string | null;
  endsAt?: string | null;
}

export interface PostAuthorDTO {
  id: string;
  username: string;
  fullName: string;
  profileImage: string;
  isPrivate: boolean;
}

export interface PostDTO {
  id: string;
  author: PostAuthorDTO;
  title: string | null;
  content: string | null;
  image: string | null;
  format: "TEXT" | "IMAGE" | "VIDEO" | string; // match your Prisma enum
  postType: "STANDARD" | "SPONSORED" | string; // match your Prisma enum
  visibility: "PUBLIC" | "FOLLOWERS_ONLY" | "PRIVATE" | string;
  tags: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  isLiked: boolean;
  isSaved: boolean;
  isSponsored: boolean;
}

/// create post
export interface CreatePostResponse {
  success: boolean;
  message: string;
  data: {
    post: PostDTO;
  };
}

/// delete post
export interface DeletePostResponse {
  success: boolean;
  message: string;
  data: {
    postId: string;
  };
}

///get post by id

export interface GetPostByIdResponse {
  success: boolean;
  message: string;
  data: {
    post: PostDTO;
  };
}

///like post

export interface LikePostResponse {
  success: boolean;
  message: string;
  data: {
    post: PostDTO;
  };
}

/// list posts
export interface ListPostsResponse {
  success: boolean;
  data: {
    posts: PostDTO[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

/// save post

export interface SavePostResponse {
  success: boolean;
  message: string;
  data: {
    post: PostDTO;
  };
}

///saved posts

export interface SavedPostItem {
  id: string;
  savedAt: string;
  post: PostDTO;
}

export interface SavedPostsResponse {
  success: boolean;
  data: {
    savedPosts: SavedPostItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

///unlike post
export interface UnlikePostResponse {
  success: boolean;
  message: string;
  data: {
    post: PostDTO;
  };
}

/// unsave post
export interface UnsavePostResponse {
  success: boolean;
  message: string;
  data: {
    post: PostDTO;
  };
}

/// update post

export interface UpdatePostResponse {
  success: boolean;
  message: string;
  data: {
    post: PostDTO;
  };
}

// comments type
export interface CreateCommentData {
  postId: string;
  content: string;
}

export interface CreateCommentResponse {
  success: boolean;
  message: string;
  data: CommentData;
}

export interface CommentData {
  commentId: string;
  postId: string;
  content: string;
  userId: string;
  username: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  likes: number;
}

/// delete comment
export interface DeleteCommentResponse {
  success: boolean;
  message: string;
  data: DeleteCommentData;
}

export interface DeleteCommentData {
  commentId: string;
  postId: string;
  deletedAt: string; // ISO timestamp
}

/// update comment

export interface UpdateCommentData {
  postId: string;
  content: string;
}

export interface UpdateCommentResponse {
  success: boolean;
  message: string;
  data: UpdatedCommentData;
}

export interface UpdatedCommentData {
  commentId: string;
  postId: string;
  content: string;
  userId: string;
  updatedAt: string; // ISO timestamp
  createdAt: string; // ISO timestamp
}

export interface likeCommentData {
  commentId: string;
}

export interface LikeCommentResponse {
  success: boolean;
  message: string;
  data: {
    commentId: string;
    likesCount: number;
    isLiked: boolean;
  };
}

export interface  UnlikeCommentResponse {
  success: boolean;
  message: string;
  data: {
    commentId: string;
    likesCount: number;
  };
}

export interface UnlikeCommentData {
  commentId: string;
}


export interface ListCommentsResponse {
  success: boolean;
  data: {
    comments: CommentItem[];
    pagination: PaginationInfo;
  };
}

export interface CommentItem {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  authorUsername: string;
  authorImage: string;
  isFlagged: boolean;
  isDeleted: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  author: CommentAuthor;
  likesCount: number;
  isLiked: boolean;
}

export interface CommentAuthor {
  id: string;
  username: string;
  profileImage: string;
  fullName: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
}
