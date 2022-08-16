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
            firstName : userInfo.firstName,
            lastName : userInfo.lastName,
            email : userInfo.email,
            createdAt : userInfo.createdAt
        })
        setProfilePhotoInfo({id : userInfo.id, profilePhoto : userInfo.profilePhoto})

      }, [userInfo])

      const handleOnInputChange = (event) => {

        console.log("event name", event.target.name)
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
      }


      const handleOnSubmit = async (event) => {

        event.preventDefault();
        console.log("form in handle on submit", form)
        
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
        <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
         <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{backgroundSize : "cover", backgroundPosition : "center top", height: "200px", position:"relative",top:"100px"}}>
          <span className="mask bg-gradient-default opacity-8"></span>
          <div className="container-fluid d-flex align-items-center">
            <div className="row">
              <div className="col-lg-7 col-md-10">
                <h1 className="display-2 text-white">
                  Hello {userInfo.firstName}
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
                  <label className="btn btn-sm btn-info mr-5" onChange={imageHandler} >
                <i className="fa fa-image"></i> Edit Photo<input type="file" style={{display: "none"}} name="image"/>
                </label>
                </div>
                <div className="card-body pt-0 pt-md-4">
                  <div className="row">
                    <div className="col">
                    
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">0</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">{habits.length}</span>
                          <span className="description">Habits</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3>
                      {userInfo.firstName}{" "}
                      {userInfo.lastName}
                    </h3>
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
                    {/* <h6 className="heading-small text-muted mb-4">
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
                    </div> */}
                    {/* <hr className="my-4" />
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
                    </div> */}
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
      </section>
        </main>
</div>
  );
}
