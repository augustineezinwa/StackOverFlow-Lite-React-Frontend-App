export default {
  loader: {
    isLoading: false,
    message: '',
  },
  questions: {
    data: [],
    errors: {},
    nextCursor: null,
    hasMore: true,
    loadingMore: false
  },
  notifications: {
    status: false,
    message: ''
  },
  users: {
    data: [],
    errors: {}
  },
  question: {
    data: [],
    errors: {}
  },
  auth: {
    isLoggedIn: false,
    errors: {}
  },
  answers: {
    data: [],
    errors: {}
  },
  profile: {
    data: {},
    errors: {}
  },
  userQuestions: {
    data: [],
    errors: {},
    nextCursor: null,
    hasMore: true,
    loadingMore: false
  }
};
