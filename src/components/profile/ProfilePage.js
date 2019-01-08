import React, { Fragment } from 'react';

const ProfilePage = () => (
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
                <div className="row">
                  <div className="col-2">
                    <div className="user-icon-div" id="dummyImage" style={{ display: 'block' }}>
                      {' '}
                      <i className="fa fa-user user-icon-profile" />
                    </div>
                    <div className="mt-1">
                      {' '}
                      <img id="imageHolder" alt="profile..." className="profilePhoto" src="http://donkeys.com" />
                    </div>
                    <input type="file" name="file" id="imageUpload" style={{ width: '100%', display: 'none' }} accept="images/*" />
                  </div>

                  <div className="col-5">
                    <div className="container mt-7 ml-3">
                      <div className="row mt-2">
                        <div className="col-3"><div className="name">Name:</div></div>
                        <div className="col-5"><div className="name">---- -----</div></div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-3"><div className="name">Job role:</div></div>
                        <div className="col-5">
                          <div id="jobRoleDisplay" className="name">---- --- ---</div>
                          <div><input style={{ display: 'none' }} id="jobRoleEdit" type="text" /></div>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-3"><div className="name">Company:</div></div>
                        <div className="col-5">
                          <div id="companyDisplay" className="name">----</div>
                          <div><input style={{ display: 'none' }} id="companyEdit" type="text" /></div>
                        </div>
                      </div>


                      <div className="row mt-7">
                        <div className="col-3"><div className="name"><button id="updateProfileButton">Update</button></div></div>
                        <div className="col-5"><div className="name" /></div>
                      </div>


                    </div>

                  </div>
                </div>

                <div className="col mt-7" style={{ fontWeight: 'bold', fontSize: '18pt' }}>Stats</div>
                <div className="row mt-2" style={{ marginLeft: '1%' }}>
                  <div className="col-2"><div className="name">You asked:</div></div>
                  <div className="col-5"><div className="name">- Questions</div></div>
                </div>

                <div className="row mt-2" style={{ marginLeft: '1%' }}>
                  <div className="col-2"><div className="name">You answered:</div></div>
                  <div className="col-5"><div className="name">- Questions</div></div>
                </div>


                <div className="row mt-2" style={{ marginLeft: '1%' }}>
                  <div className="col-2"><div className="name">You earned:</div></div>
                  <div className="col-5"><div className="name">- Upvotes</div></div>
                </div>

              </div>
            </div>
          </div>
        </div>


      </div>
    </div>

    <div className="container profiledashboardfooter"><h3>Your Questions with Most Answers</h3></div>


    <div id="mostAnsweredQuestionsDisplay">
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
                  <a href="/"><button id="refreshTwo" type="answer">Refresh</button></a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div className="container profiledashboardfooter mt-1"><h3>Your Recent Questions</h3></div>

    <div id="recentQuestionsDisplay">
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
                  <a href="/"><button id="refresh" type="answer">Refresh</button></a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </Fragment>
);

export default ProfilePage;
