import "../UserProfile/UserProfile.css";
import apiClient from "../../services/apiClient";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../partials/Header";

export default function ({ user, isAuthenticated }) {
    const [errors, setError] = useState()
    const [userInfo, setUserInfo] = useState({})
    const [form, setForm] = useState({})
    const [habits, setHabits] = useState([])
    const [profilePhoto, setProfilePhoto] = useState("")
    const [profilePhotoInfo, setProfilePhotoInfo] = useState({})
    const defaultPhotoURL = "https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg"

    useEffect(() => {
        const getUserInfo = async () => {
          const { data, err } = await apiClient.fetchUserFromToken();
          if (err) {
            setError(err);
          }
          if (data.user) {
            setUserInfo(data.user);
    
          }
        };
        getUserInfo()
      }, []);

      useEffect(() => {

        setForm({
            id : userInfo.id,
            firstName : userInfo.first_name,
            lastName : userInfo.last_name,
            email : userInfo.email,
            createdAt : userInfo.createdAt,
            userName : userInfo.user_name,
        })
        setProfilePhotoInfo({id : userInfo.id, profilePhoto : userInfo.profilePhoto})

      }, [userInfo])

      const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
      }


      const handleOnSubmit = async (event) => {

        console.log("this is clicked")

        event.preventDefault();
        const { data, error } = await apiClient.editUser(form)
        location.reload()
      }


      useEffect(() => {
        const getHabits = async () => {
          const { data, error } = await apiClient.fetchHabitList();
          if (error) {
            setError(error);
          }
          if (data?.habits) {
            setHabits(data.habits);
          }
        };
        getHabits();
      }, []);


      const imageHandler = async (event) =>{

        const reader = new FileReader()

        reader.onload = async () => {
            if (reader.readyState === 2){
                setProfilePhoto(reader.result)
                setProfilePhotoInfo({id : userInfo.id, profilePhoto : reader.result})
                const {data, error} = await apiClient.editPhoto({id : userInfo.id, profilePhoto : reader.result})
            }
        }

        event.preventDefault();
        reader.readAsDataURL(event.target.files[0])

        
    }

  
return (
  <div className="user-profile-wrapper">
        {/*  Site header */}
        <Header />
        <body >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* <nav
          className="navbar navbar-top navbar-expand-md navbar-dark"
          id="navbar-main"
        >
          <div className="container-fluid">
            <a
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              href="https://www.creative-tim.com/product/argon-dashboard"
              target="_blank"
            >
              User profile
            </a>

            <form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <div className="form-group mb-0">
                <div className="input-group input-group-alternative">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Search"
                    type="text"
                  />
                </div>
              </div>
            </form>

            <ul className="navbar-nav align-items-center d-none d-md-flex">
              <li className="nav-item dropdown">
                <a
                  className="nav-link pr-0"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="media align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="Image placeholder"
                        src={profilePhotoInfo.profilePhoto ? profilePhotoInfo.profilePhoto : defaultPhotoURL}
                      />
                    </span>
                    <div className="media-body ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm  font-weight-bold">
                        {userInfo.firstName} {userInfo.lastName}
                      </span>
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                  <div className=" dropdown-header noti-title">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </div>
                  <a href="../examples/profile.html" className="dropdown-item">
                    <i className="ni ni-single-02"></i>
                    <span>My profile</span>
                  </a>
                  <a href="../examples/profile.html" className="dropdown-item">
                    <i className="ni ni-settings-gear-65"></i>
                    <span>Settings</span>
                  </a>
                  <a href="../examples/profile.html" className="dropdown-item">
                    <i className="ni ni-calendar-grid-58"></i>
                    <span>Activity</span>
                  </a>
                  <a href="../examples/profile.html" className="dropdown-item">
                    <i className="ni ni-support-16"></i>
                    <span>Support</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#!" className="dropdown-item">
                    <i className="ni ni-user-run"></i>
                    <span>Logout</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav> */}
        <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{backgroundImage: `url("data:image/jpeg;base64,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")`, backgroundSize : "cover", backgroundPosition : "center top", height: "200px", position:"relative",top:"100px"}}>
          <span className="mask bg-gradient-default opacity-8"></span>
          <div className="container-fluid d-flex align-items-center">
            <div className="row">
              <div className="col-lg-7 col-md-10">
                <h1 className="display-2 text-white">
                  Hello {userInfo.first_name}
                </h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can see the progress you've
                  made with your habits and manage some changes over here
                </p>
                <a href="#!" className="btn btn-info" onClick={handleOnSubmit}>
                  Edit profile
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid mt--7">
          <div className="row">
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
              <div className="card card-profile shadow">
                <div className="row justify-content-center">
                  <div className="col-lg-3 order-lg-2">
                    <div className="card-profile-image">
                      <a href="#">
                        <img
                          src={profilePhotoInfo.profilePhoto ? profilePhotoInfo.profilePhoto : defaultPhotoURL}
                          className="rounded-circle"
                        />
                      </a>
                    </div>
                  </div>

                </div>
                
                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <a href="#" className="btn btn-sm btn-info mr-4">
                      Connect
                    </a>
                    <a href="#" className="btn btn-sm btn-default float-right">
                      Message
                    </a>
                  </div>
                  <label className="btn btn-sm btn-info mr-5" onChange={imageHandler} >
                <i className="fa fa-image"></i> Edit Photo<input type="file" style={{display: "none"}} name="image"/>
                </label>
                </div>
                <div className="card-body pt-0 pt-md-4">
                  <div className="row">
                    <div className="col">
                    
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">{habits.length}</span>
                          <span className="description">Habits</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Completed Habits</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3>
                      {userInfo.first_name}{" "}
                      {userInfo.last_name}
                      <span className="font-weight-light">, 27</span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2"></i>Bucharest, Romania
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2"></i>Solution
                      Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2"></i>University of
                      Computer Science
                    </div>
                    <hr className="my-4" />
                    <p>
                      Ryan — the name taken by Melbourne-raised, Brooklyn-based
                      Nick Murphy — writes, performs and records all of his own
                      music.
                    </p>
                    <a href="#">Show more</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 order-xl-1">
              <div className="card bg-secondary shadow">
                <div className="card-header bg-white border-0">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">My account</h3>
                    </div>
                    <div className="col-4 text-right">
                      <a href="#!" className="btn btn-sm btn-primary">
                        Settings
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Phone Number
                            </label>
                            <input
                              type="text"
                              id="username"
                              className="form-control"
                              name="userName"
                              placeholder="(xxx)-xxx-xxxx"
                              value = {form.userName}
                              onChange = {handleOnInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <input
                              type="email"
                              id="input-email"
                              className="form-control form-control-alternative"
                              placeholder="jesse@example.com"
                              name = "email"
                              value={form.email}
                              onChange = {handleOnInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              id="input-first-name"
                              className="form-control form-control-alternative"
                              name="firstName"
                              placeholder="First name"
                              value={form.firstName}
                              onChange = {handleOnInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              id="input-last-name"
                              className="form-control form-control-alternative"
                              placeholder="Last name"
                              name = "lastName"
                              value={form.lastName}
                              onChange = {handleOnInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <input
                              id="input-address"
                              className="form-control form-control-alternative"
                              placeholder="Home Address"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              id="input-city"
                              className="form-control form-control-alternative"
                              placeholder="City"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <input
                              type="text"
                              id="input-country"
                              className="form-control form-control-alternative"
                              placeholder="Country"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <input
                              type="number"
                              id="input-postal-code"
                              className="form-control form-control-alternative"
                              placeholder="Postal code"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <div className="form-group focused">
                        <label
                          className="form-control-label"
                          htmlFor="input-bio"
                        >
                          Bio
                        </label>
                        <input
                          type="text"
                          id="input-bio"
                          className="form-control form-control-alternative"
                          placeholder="Bio"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="row align-items-center justify-content-xl-between">
          <div className="col-xl-6 m-auto text-center">
            <div className="copyright">
              <p>
                Made with{" "}
                <a
                  href="https://www.creative-tim.com/product/argon-dashboard"
                  target="_blank"
                >
                  Argon Dashboard
                </a>{" "}
                by Creative Tim
              </p>
            </div>
          </div>
        </div>
      </footer>
    </body>
</div>
  );
}
