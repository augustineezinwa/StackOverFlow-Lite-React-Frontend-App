import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';
import { fetchQuestions } from '../../actions/fetchQuestionsActions';
import warplaneImage from '../../../public/images/warplane.webp';
import scienceLabImage from '../../../public/images/sciencelab.webp';
import vintageCarImage from '../../../public/images/vintqge.webp';
import fashionImage from '../../../public/images/fashion.webp';
import soldiersImage from '../../../public/images/soliders.webp';

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
    this.state = {
      currentSlide: 0,
      loadedSlideIndices: [0]
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
  }

  componentDidMount() {
    const { fetchAllQuestions } = this.props;
    this.isComponentMounted = true;
    fetchAllQuestions({ limit: 10 });
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

  componentDidUpdate(prevProps) {
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

  loadMoreIfNeeded() {
    const { fetchAllQuestions, questions } = this.props;
    const list = questions.data || [];
    const { nextCursor, hasMore, loadingMore } = questions;
    if (loadingMore || !hasMore) return;
    if (list.length === 0) return;
    const cursor = nextCursor != null ? nextCursor : (list[list.length - 1] && list[list.length - 1].id);
    fetchAllQuestions({ limit: 10, cursor, append: true });
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
    const { questions } = this.props;
    const questionList = Array.isArray(questions.data) ? questions.data : [];
    const { hasMore, loadingMore } = questions;
    const { currentSlide, loadedSlideIndices } = this.state;
    const activeSlide = heroSlides[currentSlide];

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

            {
              !questionList.length && !questions.loadingMore && (
                <div className="container">
                  <div className="row no-questions">

                    <div className="alignCardWidth">
                      <div className="card">
                        <div className="container">
                          <div className="row mt-4 pd-1">
                            <div className="col-2">
                              <div className="symbol-display">
                                <div className="alignSymbol">!</div>
                              </div>

                            </div>
                            <div className="col-5">
                              <div className="question">No Questions yet!  &nbsp; Refresh page  </div>

                            </div>
                          </div>

                          <div className="col" style={{ textAlign: 'right' }}>
                            <span />
                            <span />
                            <a href="/">
                              <button type="answer">Refresh</button>
                            </a>

                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )
            }
            {
              (!!questionList.length || questions.loadingMore) && (
                <Fragment>
                  <div
                    id="main-fish"
                    className="maincont"
                  >
                    {questionList.map(x => (
                      <div className="question-grid-item" key={x.id}>
                        <QuestionCard
                          key={x.id}
                          questionTitle={x.questionTitle}
                          questionId={x.id}
                          answerNumber={x.numberOfAnswers}
                          totalUpVotes={x.upvotes}
                          totalDownVotes={x.downvotes}
                          imageUrl={x.imageUrl || x.image_url || ''}
                          photoUrl={x.photoUrl || x.photo_url || ''}
                          askerName={x.askedBy || x.askerName || x.fullName || ''}
                        />
                      </div>
                    ))}
                  </div>
                  <div ref={this.sentinelRef} className="infinite-scroll-sentinel" aria-hidden="true" />
                  {loadingMore && (
                    <div className="container infinite-scroll-loading" style={{ textAlign: 'center', padding: '1rem 0' }}>
                      <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.5rem', color: 'hotpink' }} aria-hidden="true" />
                      <span className="sr-only">Loading more questions</span>
                    </div>
                  )}
                </Fragment>
              )
            }


          </div>
        </div>
      </Fragment>
    );
  }
}


export const mapStateToProps = state => ({
  questions: state.questions
});

const mapActionsToProps = {
  fetchAllQuestions: fetchQuestions
};


HomePage.propTypes = {
  fetchAllQuestions: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    data: PropTypes.array,
    nextCursor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hasMore: PropTypes.bool,
    loadingMore: PropTypes.bool
  }).isRequired,
};


export default connect(mapStateToProps, mapActionsToProps)(HomePage);
