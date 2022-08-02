import "../UserProfile/UserProfile.css";
import apiClient from "../../services/apiClient";
import { useState } from "react";
import { useEffect } from "react";
import Register from "../Register/Register";

export default function ({ user, isAuthenticated }) {
    const [errors, setError] = useState()
    const [userInfo, setUserInfo] = useState({})
    const [form, setForm] = useState({})
    const [habits, setHabits] = useState([])
    const [profilePhoto, setProfilePhoto] = useState("https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg")
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
      console.log("user info", userInfo)

      useEffect(() => {

        setForm({
            id : userInfo.id,
            firstName : userInfo.firstName,
            lastName : userInfo.lastName,
            email : userInfo.email,
            createdAt : userInfo.createdAt,
            userName : userInfo.userName
        })

      }, [userInfo])
      console.log("form", form)

      const handleOnInputChange = (event) => {

        console.log("event name", event.target.name)

        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
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


      const imageHandler = (event) =>{

        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2){
                setProfilePhoto(reader.result)
            }
        }

        reader.readAsDataURL(event.target.files[0])
    }



    

console.log("form again", form)
  
return (
  <>
      { isAuthenticated ?
        <body>
      <div className="main-content">
        <nav
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
                        src={profilePhoto}
                      />
                    </span>
                    <div className="media-body ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm  font-weight-bold">
                        {localStorage.getItem('firstname')} {localStorage.getItem('lastname')}
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
        </nav>

        <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
          <span className="mask bg-gradient-default opacity-8"></span>
          <div className="container-fluid d-flex align-items-center">
            <div className="row">
              <div className="col-lg-7 col-md-10">
                <h1 className="display-2 text-white">
                  Hello {localStorage.getItem("firstname")}
                </h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can see the progress you've
                  made with your habits and manage some changes over here
                </p>
                <a href="#!" className="btn btn-info">
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
                          src={profilePhoto}
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
                      {localStorage.getItem("firstname")}{" "}
                      {localStorage.getItem("lastname")}
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
                              Username
                            </label>
                            <input
                              type="text"
                              id="username"
                              className="form-control"
                              placeholder="Username"
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
    :
    <>
    <Register/>
    </>

}
</>
  );
}
