import React, { Fragment } from 'react';

const AnswerList = ({
  answer, upvotes, downvotes, time, date, id, name
}) => (
    <Fragment>
      <div className="row" key={id}>
        <div className="col-5">
          {answer}
          <div className="row mt-4">
            <div className="col">
              <div className="ft">
                Answered by
                {' '}
                {name}
                 &nbsp;
                {' '}
                <span className="darkgray">
                  {time}
                  {' '}
                  {' '}
                  @
                  {' '}
                  {' '}
                  {date}
                </span>
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
          <div className="row wrap">
            <div className="col mb-1">
              {' '}
              {upvotes}
              {' '}
              upvotes
            </div>
            <div className="col mb-1">
              {downvotes}
              {' '}
              downvotes
            </div>
          </div>

          <div className="row">
            <div className="col wrap mb-1">
              <span>
                {' '}
                <i className="fas fa-thumbs-up blue resize" />
              </span>

            </div>
            <div className="col wrap mb-1">
              <span>
                {' '}
                <i className="fas fa-star blue resize" />
              </span>

            </div>
            <div className="col wrap mb-1">
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
    </Fragment>
  );

export default AnswerList;

