import React, { Fragment } from 'react';

const QuestionPage = () => (
  <Fragment>
    <div className="container question-background ">
      <div className="row ">
        <div className="col">
          <div className="question-card">
            <h2>My Android refuses to run its latest version ?</h2>
            <div className="underline">&nbsp;</div>
            <div className="row">
              <div className="col-5">
                My android device is not responding since I installed its latest operating system
                <div className="mt-4 ft">
                  Asked by Augustine Ezinwa  &nbsp;
                  {' '}
                  <span className="darkgray"> 15 mins ago</span>
                </div>
              </div>
              <div className="col-2">
                <div className="row">
                  <div className="col"> 20 upvotes</div>
                  <div className="col">1 downvotes</div>
                </div>
              </div>
            </div>

            <div>&nbsp;</div>
            <div className="underline;">&nbsp;</div>

            <div className="">
              {' '}
              <h3>3 Answers</h3>
            </div>

            <div className="underline">&nbsp;</div>
            <div className="row">
              <div className="col-5">
                Consider resetting your device to factory settings.
                <div className="row mt-4">
                  <div className="col">
                    <div className="ft">
                      Answered by Augustine Ezinwa  &nbsp;
                      {' '}
                      <span className="darkgray">15 mins ago</span>
                    </div>

                  </div>
                  <div className="col ">
                    <div className="row">
                      <div className="col">
                        {' '}
                        <a href="" id="fish">
                          <button type="comment">
                            Comment
                          </button>
                        </a>
                      </div>

                      <div className="col">
                        {' '}
                        <div className="darkgray">View Comments </div>
                      </div>

                    </div>

                  </div>


                </div>
              </div>
              <div className="col-2">
                <div className="row">
                  <div className="col"> 20 upvotes</div>
                  <div className="col">1 downvotes</div>
                </div>

                <div className="row">
                  <div className="col">
                    <span>
                      {' '}
                      <i className="fas fa-thumbs-up blue resize" />
                    </span>

                  </div>
                  <div className="col">
                    <span>
                      {' '}
                      <i className="fas fa-star blue resize" />
                    </span>

                  </div>
                  <div className="col">
                    <span>
                      {' '}
                      <i className="fas fa-thumbs-down blue resize" />
                    </span>

                  </div>
                </div>
              </div>

            </div>


            <div>&nbsp;</div>

            <div className="underline">&nbsp;</div>

            <div className="row">
              <div className="col-5">
                Consider resetting your device to factory settings.
                <div className="row mt-4">
                  <div className="col">
                    <div className="ft">
                      Answered by Augustine Ezinwa  &nbsp;
                      {' '}
                      <span className="darkgray">15 mins ago</span>
                    </div>

                  </div>
                  <div className="col ">
                    <div className="row">
                      <div className="col">
                        <button type="comment">Comment</button>

                      </div>

                      <div className="col darkgray">  View Comments </div>

                    </div>

                  </div>


                </div>
              </div>
              <div className="col-2">
                <div className="row">
                  <div className="col"> 20 upvotes</div>
                  <div className="col">1 downvotes</div>
                </div>

                <div className="row">
                  <div className="col">
                    <span>
                      {' '}
                      <i className="fas fa-thumbs-up blue resize" />
                    </span>

                  </div>
                  <div className="col">
                    <span>
                      {' '}
                      <i className="fas fa-star blue resize" />
                    </span>

                  </div>
                  <div className="col">
                    <span>
                      {' '}
                      <i className="fas fa-thumbs-down blue resize" />
                    </span>

                  </div>
                </div>
              </div>
            </div>

            <div>&nbsp;</div>

            <div className="underline">&nbsp;</div>
            <form className="">

              <label htmlFor="password"><b>Add an answer</b></label>
              <textarea className="mt-2 txtarea" required />

              <button type="submit"> Add</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  </Fragment>
);

export default QuestionPage;
