import "../UserProfile/UserProfile.css";

export default function UserProfile({user}) {

  return (
    <div className="user-profile">
      <div>
        <img
          className="img"
          src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
          alt="user-profile"
        />
        <div className="social-media-handles">
          <div className="twitter"> Twitter</div>
          <div className="facebook"> Facebook</div>
          <div className="instagram"> Instagram</div>
        </div>
        <div className="email"> {localStorage.getItem('email')} </div>
      </div>

      <h2 className="userName"> {localStorage.getItem('firstname')} {localStorage.getItem('lastname')}</h2>
      <button className="edit-profile"> Edit profile </button>
      <div className="big-container">
        <h2 className="communication"> Resource / Communication Preference</h2>
      </div>
    </div>
  );
}
