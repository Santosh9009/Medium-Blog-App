import '../App.css';
import { Myblogs } from '../Component/Myblogs';
import { ProfileComp } from '../Component/Profile';

const Profile = () => {

  return (
    <>
      <div className="min-h-screen bg-gray-100 grid grid-flow-row md:grid-cols-2 gap-8 py-12 sm:px-6 lg:px-8 fade-in">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg px-5">
         <ProfileComp/>
        </div>
        <div>
         <Myblogs/>
        </div>
      </div>
    </>
  );
};

export default Profile;
