import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 bg-opacity-75 text-white p-4 md:p-10 gap-4 my-8">
      <Sidebar className="w-full md:w-1/4 bg-gray-800 bg-opacity-90 shadow-xl rounded-lg overflow-hidden" />
      <MessageContainer className="flex-1 bg-gray-800 bg-opacity-90 shadow-xl rounded-lg overflow-hidden" />
    </div>
  );
};

export default Home;
