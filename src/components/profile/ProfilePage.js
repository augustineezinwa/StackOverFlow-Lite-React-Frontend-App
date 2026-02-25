import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compressAndUpload } from '../../utils/cloudinaryUpload';
import getCurrentUser from '../../utils/getCurrentUser';
import { fetchProfile, updateProfile } from '../../actions/profileActions';
import { fetchUserQuestions } from '../../actions/userQuestionsActions';
import QuestionCard from '../homepage/QuestionCard';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingPhotoUrl: '',
      isUploading: false,
      uploadError: '',
      fullName: '',
      jobRole: '',
      company: '',
      isEditing: false
    };
    this.fileInputRef = React.createRef();
    this.sentinelRef = React.createRef();
    this.observer = null;
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.loadMoreUserQuestions = this.loadMoreUserQuestions.bind(this);
  }

  componentDidMount() {
    const { fetchProfileData, fetchUserQuestionsData } = this.props;
    if (fetchProfileData) fetchProfileData();
    if (fetchUserQuestionsData) fetchUserQuestionsData({ limit: 10 });
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) this.loadMoreUserQuestions();
      },
      { rootMargin: '200px', threshold: 0 }
    );
  }

  loadMoreUserQuestions() {
    const { fetchUserQuestionsData, userQuestions } = this.props;
    const list = userQuestions.data || [];
    const { nextCursor, hasMore, loadingMore } = userQuestions;
    if (loadingMore || !hasMore) return;
    if (list.length === 0) return;
    const cursor = nextCursor != null ? nextCursor : (list[list.length - 1] && list[list.length - 1].id);
    fetchUserQuestionsData({ limit: 10, cursor, append: true });
  }

  componentDidUpdate(prevProps) {
    if (this.observer && this.sentinelRef.current) {
      this.observer.disconnect();
      this.observer.observe(this.sentinelRef.current);
    }
    const { profile } = this.props;
    const data = profile && profile.data ? profile.data : {};
    const prevData = prevProps.profile && prevProps.profile.data ? prevProps.profile.data : {};
    const hasProfile = data && (data.id != null || data.fullName != null);
    if (hasProfile && data !== prevData && !this.state.isEditing) {
      this.setState({
        fullName: data.fullName != null ? data.fullName : '',
        jobRole: data.jobRole != null ? data.jobRole : '',
        company: data.company != null ? data.company : ''
      });
    }
  }

  componentWillUnmount() {
    if (this.observer) this.observer.disconnect();
  }

  handleUploadClick() {
    if (this.fileInputRef.current) this.fileInputRef.current.click();
  }

  handleFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    e.target.value = '';
    this.setState({ isUploading: true, uploadError: '' });
    compressAndUpload(file)
      .then((url) => {
        this.setState({ pendingPhotoUrl: url, isUploading: false });
      })
      .catch(() => {
        this.setState({
          isUploading: false,
          uploadError: 'Upload failed. Please try again.'
        });
      });
  }

  handleProfileChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleUpdateProfile() {
    const { fullName, jobRole, company, isEditing, pendingPhotoUrl } = this.state;
    const { profile, updateProfileData } = this.props;
    const data = profile && profile.data ? profile.data : {};
    const currentPhoto = data.photo || '';

    if (isEditing) {
      updateProfileData({
        fullName,
        jobRole,
        company,
        photo: pendingPhotoUrl || currentPhoto
      });
      this.setState({ isEditing: false, pendingPhotoUrl: '' });
    } else {
      this.setState({ isEditing: true });
    }
  }

  getDisplayPhoto() {
    const { pendingPhotoUrl } = this.state;
    const { profile } = this.props;
    const data = profile && profile.data ? profile.data : {};
    return pendingPhotoUrl || data.photo || '';
  }

  getDisplayFields() {
    const { isEditing, fullName, jobRole, company } = this.state;
    const { profile } = this.props;
    const data = profile && profile.data ? profile.data : {};
    if (isEditing) {
      return { fullName, jobRole, company };
    }
    return {
      fullName: fullName || data.fullName || '',
      jobRole: jobRole || data.jobRole || '',
      company: company || data.company || ''
    };
  }

  getStats() {
    const { profile } = this.props;
    const { questions } = this.props;
    const data = profile && profile.data ? profile.data : {};
    if (data.numberOfQuestions != null || data.numberOfAnswers != null || data.earnedUpvotes != null) {
      return {
        questionsAsked: Number(data.numberOfQuestions) || 0,
        answersCount: Number(data.numberOfAnswers) || 0,
        upvotes: Number(data.earnedUpvotes) || 0
      };
    }
    const userId = data.id != null ? String(data.id) : (getCurrentUser() && getCurrentUser().id != null ? String(getCurrentUser().id) : null);
    if (!userId || !Array.isArray(questions)) {
      return { questionsAsked: 0, answersCount: 0, upvotes: 0 };
    }
    const myQuestions = questions.filter(q => String(q.userId) === userId);
    const questionsAsked = myQuestions.length;
    const upvotes = myQuestions.reduce((sum, q) => sum + (Number(q.upvotes) || 0), 0);
    let answersCount = 0;
    questions.forEach((q) => {
      if (Array.isArray(q.answers)) {
        answersCount += q.answers.filter(a => String(a.userId) === userId).length;
      }
    });
    return { questionsAsked, answersCount, upvotes };
  }

  render() {
    const { isUploading, uploadError, isEditing } = this.state;
    const { userQuestions = [] } = this.props;
    const profilePhoto = this.getDisplayPhoto();
    const { fullName, jobRole, company } = this.getDisplayFields();
    const stats = this.getStats();
    return (
      <Fragment>
        <div id="profileDisplay">
          <div id="photoDisplay" />
          <div className="container image-background profile-height" style={{ margin: '0 auto' }}>

            <div className="row ">

              <div className="col mt-17">
                <h1 style={{ color: 'white', textAlign: 'center' }}>Welcome to StackOverFlow-Lite</h1>
              </div>
              <div className="col">
                <div className="profile-box">
                  <div className="container">
                    <div className="col profile-header">My Profile</div>
                    <div className="profile-card-body">
                      <div className="profile-avatar-col">
                        <div className="profile-avatar-circle">
                          {profilePhoto ? (
                            <img
                              src={profilePhoto}
                              alt="Profile"
                              className="profilePhoto"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className="profile-avatar-placeholder">
                              <i className="fa fa-user user-icon-profile" />
                            </div>
                          )}
                        </div>
                        <input
                          ref={this.fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={this.handleFileChange}
                          className="profile-avatar-input"
                          aria-hidden
                        />
                        <button
                          type="button"
                          className="profile-avatar-upload-btn"
                          onClick={this.handleUploadClick}
                          disabled={isUploading}
                        >
                          {isUploading ? 'Uploading…' : profilePhoto ? 'Change photo' : 'Upload photo'}
                        </button>
                        {uploadError && <div className="profile-avatar-error">{uploadError}</div>}
                      </div>
                      <div className="profile-form-wrap">
                        <div className="profile-form-grid">
                          <div className="profile-form-row">
                            <label className="profile-form-label" htmlFor="profile-fullName">Name</label>
                            <div className="profile-form-field">
                              {isEditing ? (
                                <input
                                  id="profile-fullName"
                                  type="text"
                                  name="fullName"
                                  className="profile-edit-input"
                                  value={fullName}
                                  onChange={this.handleProfileChange}
                                  placeholder="Your name"
                                  aria-label="Full name"
                                />
                              ) : (
                                <span className="profile-display-value">{fullName || '—'}</span>
                              )}
                            </div>
                          </div>
                          <div className="profile-form-row">
                            <label className="profile-form-label" htmlFor="profile-jobRole">Job role</label>
                            <div className="profile-form-field">
                              {isEditing ? (
                                <input
                                  id="profile-jobRole"
                                  type="text"
                                  name="jobRole"
                                  className="profile-edit-input"
                                  value={jobRole}
                                  onChange={this.handleProfileChange}
                                  placeholder="Job role"
                                  aria-label="Job role"
                                />
                              ) : (
                                <span className="profile-display-value">{jobRole || '—'}</span>
                              )}
                            </div>
                          </div>
                          <div className="profile-form-row">
                            <label className="profile-form-label" htmlFor="profile-company">Company</label>
                            <div className="profile-form-field">
                              {isEditing ? (
                                <input
                                  id="profile-company"
                                  type="text"
                                  name="company"
                                  className="profile-edit-input"
                                  value={company}
                                  onChange={this.handleProfileChange}
                                  placeholder="Company"
                                  aria-label="Company"
                                />
                              ) : (
                                <span className="profile-display-value">{company || '—'}</span>
                              )}
                            </div>
                          </div>
                          <div className="profile-form-row profile-form-actions">
                            <span className="profile-form-label" />
                            <div className="profile-form-field">
                              <button
                                type="button"
                                id="updateProfileButton"
                                className="profile-update-btn"
                                onClick={this.handleUpdateProfile}
                              >
                                {isEditing ? 'Save' : 'Update'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="profile-stats-title">Stats</div>
                    <div className="profile-stats-grid">
                      <div className="profile-stat-row">
                        <span className="profile-stat-label">You asked</span>
                        <span className="profile-stat-value">{stats.questionsAsked} Questions</span>
                      </div>
                      <div className="profile-stat-row">
                        <span className="profile-stat-label">You answered</span>
                        <span className="profile-stat-value">{stats.answersCount} Questions</span>
                      </div>
                      <div className="profile-stat-row">
                        <span className="profile-stat-label">You earned</span>
                        <span className="profile-stat-value">{stats.upvotes} Upvotes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container profiledashboardfooter"><h3>Your Questions</h3></div>

        <div id="userQuestionsDisplay" className="profile-questions-list">
          <div className="container">
            {(userQuestions.data && userQuestions.data.length > 0) || userQuestions.loadingMore ? (
              <>
                <div className="profile-questions-grid">
                  {(userQuestions.data || []).map((q) => (
                    <QuestionCard
                      key={q.id}
                      questionId={q.id}
                      questionTitle={q.questionTitle || q.title || ''}
                      answerNumber={q.numberOfAnswers != null ? q.numberOfAnswers : (Array.isArray(q.answers) ? q.answers.length : 0)}
                      totalUpVotes={q.upvotes != null ? q.upvotes : 0}
                      totalDownVotes={q.downvotes != null ? q.downvotes : 0}
                      imageUrl={q.imageUrl || q.image_url || ''}
                      photoUrl={q.photoUrl || q.photo_url || (this.props.profile && this.props.profile.data && this.props.profile.data.photo) || ''}
                      askerName={this.getDisplayFields().fullName || ''}
                    />
                  ))}
                </div>
                <div ref={this.sentinelRef} className="infinite-scroll-sentinel" aria-hidden="true" />
                {userQuestions.loadingMore && (
                  <div className="infinite-scroll-loading" style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.5rem', color: 'hotpink' }} aria-hidden="true" />
                    <span className="sr-only">Loading more questions</span>
                  </div>
                )}
              </>
            ) : (
              <div className="profile-questions-empty">
                <div className="card">
                  <div className="container">
                    <div className="row mt-4 pd-1">
                      <div className="col-2">
                        <div className="symbol-display">
                          <div className="alignSymbol">!</div>
                        </div>
                      </div>
                      <div className="col-5">
                        <div className="question">No questions yet. Ask your first question from the homepage.</div>
                      </div>
                    </div>
                    <div className="col" style={{ textAlign: 'right' }}>
                      <a href="/"><button type="answer">Go to Home</button></a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.data || [],
  profile: state.profile || { data: {}, errors: {} },
  userQuestions: state.userQuestions || { data: [], nextCursor: null, hasMore: true, loadingMore: false }
});

const mapDispatchToProps = {
  fetchProfileData: fetchProfile,
  updateProfileData: updateProfile,
  fetchUserQuestionsData: fetchUserQuestions
};

ProfilePage.propTypes = {
  questions: PropTypes.array,
  profile: PropTypes.shape({
    data: PropTypes.object,
    errors: PropTypes.object
  }),
  userQuestions: PropTypes.shape({
    data: PropTypes.array,
    nextCursor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hasMore: PropTypes.bool,
    loadingMore: PropTypes.bool
  }),
  fetchProfileData: PropTypes.func,
  updateProfileData: PropTypes.func,
  fetchUserQuestionsData: PropTypes.func
};

ProfilePage.defaultProps = {
  questions: [],
  profile: { data: {}, errors: {} },
  userQuestions: { data: [], nextCursor: null, hasMore: true, loadingMore: false },
  fetchProfileData: () => {},
  updateProfileData: () => {},
  fetchUserQuestionsData: () => {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
