import '../App.css';
import { ProfileComp } from '../Component/Profile';

const Profile = () => {

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col py-12 sm:px-6 lg:px-8 fade-in">
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-5">
         <ProfileComp/>
        </div>
      </div>
    </>
  );
};

export default Profile;
