import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';
import PinnedQuestionsCard from './PinnedQuestionsCard';
import CategoriesCard from './CategoriesCard';
import { fetchQuestions } from '../../actions/fetchQuestionsActions';
import { pinOrUnpinQuestion, archiveQuestion } from '../../actions/pinnedQuestionsActions';
import getCurrentUser from '../../utils/getCurrentUser';
import warplaneImage from '../../../public/images/warplane.webp';
import scienceLabImage from '../../../public/images/sciencelab.webp';
import vintageCarImage from '../../../public/images/vintqge.webp';
import fashionImage from '../../../public/images/fashion.webp';
import soldiersImage from '../../../public/images/soliders.webp';

const CATEGORY_STORAGE_KEY = 'stackoverflow_lite_selected_category';

const heroSlides = [
  {
    image: warplaneImage,
    title: 'Ask Better Questions About Wars and Strategy',
    subtitle: 'From World War timelines to modern defense tech, get context-rich answers from the community.'
  },
  {
    image: scienceLabImage,
    title: 'Science Questions, Explained Clearly',
    subtitle: 'Explore chemistry, physics, and biology with practical answers and references you can trust.'
  },
  {
    image: vintageCarImage,
    title: 'Vintage Cars, Restorations, and Classics',
    subtitle: 'Ask about engine rebuilds, rare parts, design history, and restoration best practices.'
  },
  {
    image: fashionImage,
    title: 'Fashion, Design, and Creative Trends',
    subtitle: 'Get styling advice, brand comparisons, and timeless ideas from people with real experience.'
  },
  {
    image: soldiersImage,
    title: 'History Stories and Human Perspectives',
    subtitle: 'Discuss historic events and the people behind them with thoughtful, high-quality answers.'
  }
];

export class HomePage extends Component {
  constructor(props) {
    super(props);
    const savedCategory = typeof localStorage !== 'undefined'
      ? localStorage.getItem(CATEGORY_STORAGE_KEY) : null;
    this.state = {
      currentSlide: 0,
      loadedSlideIndices: [0],
      selectedCategory: savedCategory || null
    };
    this.slideInterval = null;
    this.isComponentMounted = false;
    this.observer = null;
    this.sentinelRef = React.createRef();
    this.advanceSlide = this.advanceSlide.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.handleIndicatorClick = this.handleIndicatorClick.bind(this);
    this.preloadSlide = this.preloadSlide.bind(this);
    this.preloadUpcomingSlides = this.preloadUpcomingSlides.bind(this);
    this.loadMoreIfNeeded = this.loadMoreIfNeeded.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleResetCategory = this.handleResetCategory.bind(this);
    this.handlePinQuestion = this.handlePinQuestion.bind(this);
    this.handleArchiveQuestion = this.handleArchiveQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchAllQuestions } = this.props;
    const { selectedCategory } = this.state;
    this.isComponentMounted = true;
    fetchAllQuestions({ limit: 10, category: selectedCategory || undefined });
    this.preloadUpcomingSlides(0);
    this.slideInterval = setInterval(this.advanceSlide, 2000);
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          this.loadMoreIfNeeded();
        }
      },
      { rootMargin: '200px', threshold: 0 }
    );
  }

  componentDidUpdate() {
    if (this.observer && this.sentinelRef.current) {
      this.observer.disconnect();
      this.observer.observe(this.sentinelRef.current);
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
    if (this.slideInterval) clearInterval(this.slideInterval);
    if (this.observer) this.observer.disconnect();
  }

  handlePinQuestion(id) {
    this.props.pinOrUnpinQuestion(id, true);
  }

  handleArchiveQuestion(id) {
    this.props.archiveQuestion(id, true);
  }

  loadMoreIfNeeded() {
    const { fetchAllQuestions, questions } = this.props;
    const { selectedCategory } = this.state;
    const list = questions.data || [];
    const { nextCursor, hasMore, loadingMore } = questions;
    if (loadingMore || !hasMore) return;
    if (list.length === 0) return;
    const lastQuestion = list[list.length - 1];
    const cursor = nextCursor != null ? nextCursor : (lastQuestion && lastQuestion.id);
    fetchAllQuestions({
      limit: 10,
      cursor,
      category: selectedCategory || undefined,
      append: true
    });
  }

  handleSelectCategory(cat) {
    const slug = cat.slug || cat.name || cat.title || '';
    if (!slug) return;
    const { fetchAllQuestions } = this.props;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CATEGORY_STORAGE_KEY, slug);
    }
    this.setState({ selectedCategory: slug });
    fetchAllQuestions({ limit: 10, category: slug });
  }

  handleResetCategory() {
    const { fetchAllQuestions } = this.props;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(CATEGORY_STORAGE_KEY);
    }
    this.setState({ selectedCategory: null });
    fetchAllQuestions({ limit: 10 });
  }

  goToSlide(slideIndex) {
    this.setState({ currentSlide: slideIndex });
    this.preloadUpcomingSlides(slideIndex);
  }

  handleIndicatorClick(event) {
    const slideIndex = Number(event.currentTarget.dataset.slideIndex);
    this.goToSlide(slideIndex);
  }

  advanceSlide() {
    this.setState((prevState) => {
      const nextSlide = (prevState.currentSlide + 1) % heroSlides.length;
      this.preloadUpcomingSlides(nextSlide);
      return {
        currentSlide: nextSlide
      };
    });
  }

  preloadSlide(slideIndex) {
    const { loadedSlideIndices } = this.state;
    if (loadedSlideIndices.includes(slideIndex)) return;
    const image = new Image();
    image.src = heroSlides[slideIndex].image;
    image.onload = () => {
      if (this.isComponentMounted) {
        this.setState(prevState => ({
          loadedSlideIndices: prevState.loadedSlideIndices.includes(slideIndex)
            ? prevState.loadedSlideIndices
            : [...prevState.loadedSlideIndices, slideIndex]
        }));
      }
    };
  }

  preloadUpcomingSlides(baseIndex) {
    const nextIndex = (baseIndex + 1) % heroSlides.length;
    const secondNextIndex = (baseIndex + 2) % heroSlides.length;
    this.preloadSlide(nextIndex);
    this.preloadSlide(secondNextIndex);
  }

  render() {
    const { questions, auth } = this.props;
    const questionList = Array.isArray(questions.data) ? questions.data : [];
    const { loadingMore } = questions;
    const { currentSlide, loadedSlideIndices, selectedCategory } = this.state;
    const activeSlide = heroSlides[currentSlide];
    const currentUser = getCurrentUser();
    const isLoggedIn = !!(auth && auth.isLoggedIn);

    return (
      <Fragment>
        <div className="home-page">
          <div className="container hero-slideshow" style={{ margin: '0 auto' }}>
            <div className="hero-slides">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.title}
                  className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
                  style={loadedSlideIndices.includes(index) ? { backgroundImage: `url(${slide.image})` } : {}}
                />
              ))}
            </div>
            <div className="hero-overlay">
              <div className="hero-content">
                <h1>{activeSlide.title}</h1>
                <p>{activeSlide.subtitle}</p>
                <a href="/ask">
                  <button className="hero-cta-button" type="button">
                    Ask a Question
                  </button>
                </a>
              </div>
              <div className="hero-indicators" aria-label="Homepage slide indicators">
                {heroSlides.map((slide, index) => (
                  <button
                    type="button"
                    key={slide.title}
                    className={`hero-indicator ${currentSlide === index ? 'active' : ''}`}
                    data-slide-index={index}
                    onClick={this.handleIndicatorClick}
                    aria-label={`Show slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="container dashboardfooter " id="dashBoardTitle"><h3>Trending Questions</h3></div>

          <div id="questionsDisplay">
            <div className="home-feed-layout">
              <CategoriesCard
                selectedCategory={selectedCategory}
                onSelectCategory={this.handleSelectCategory}
                onResetCategory={this.handleResetCategory}
              />
              <div className="home-feed-center">
                {!questionList.length && !questions.loadingMore ? (
                  <div className="no-questions-feed card">
                    <div className="no-questions-feed-icon" aria-hidden="true">
                      <i className="fas fa-inbox" />
                    </div>
                    <p className="no-questions-feed-message">No questions yet!</p>
                    <p className="no-questions-feed-hint">Refresh the page or try another category.</p>
                    <a href="/" className="no-questions-feed-actions">
                      <button type="button">Refresh</button>
                    </a>
                  </div>
                ) : (
                  <Fragment>
                    <div id="main-fish" className="maincont">
                      {questionList.map((x) => {
                        const isOwner = currentUser
                          && (String(x.userId) === String(currentUser.id)
                            || String(x.user_id) === String(currentUser.id));
                        return (
                          <div className="question-grid-item" key={x.id}>
                            <QuestionCard
                              questionTitle={x.questionTitle}
                              questionId={x.id}
                              answerNumber={x.numberOfAnswers}
                              totalUpVotes={x.upvotes}
                              totalDownVotes={x.downvotes}
                              imageUrl={x.imageUrl || x.image_url || ''}
                              photoUrl={x.photoUrl || x.photo_url || ''}
                              askerName={x.askedBy || x.askerName || x.fullName || ''}
                              isOwner={!!isOwner}
                              onPin={isLoggedIn ? this.handlePinQuestion : null}
                              onArchive={isOwner ? this.handleArchiveQuestion : null}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div ref={this.sentinelRef} className="infinite-scroll-sentinel" aria-hidden="true" />
                    {loadingMore && (
                      <div className="container infinite-scroll-loading" style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.5rem', color: 'hotpink' }} aria-hidden="true" />
                        <span className="sr-only">Loading more questions</span>
                      </div>
                    )}
                  </Fragment>
                )}
              </div>
              <PinnedQuestionsCard />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}


export const mapStateToProps = (state) => {
  const { questions, auth } = state;
  return { questions, auth };
};

const mapActionsToProps = {
  fetchAllQuestions: fetchQuestions,
  pinOrUnpinQuestion,
  archiveQuestion
};

HomePage.defaultProps = {
  auth: {}
};

HomePage.propTypes = {
  fetchAllQuestions: PropTypes.func.isRequired,
  auth: PropTypes.shape({ isLoggedIn: PropTypes.bool }),
  pinOrUnpinQuestion: PropTypes.func.isRequired,
  archiveQuestion: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    data: PropTypes.array,
    nextCursor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hasMore: PropTypes.bool,
    loadingMore: PropTypes.bool
  }).isRequired,
};


export default connect(mapStateToProps, mapActionsToProps)(HomePage);
