import PasswordsList from "./components/passwordsList/PasswordsList.tsx";
import Folders from "./components/folders/Folders.tsx";
import PasswordModal from "./components/passwordModal/PasswordModal.tsx";

import axios from "axios";

async function App() {
  // const pass = await axios.post(
  //   "http://localhost:5555/add-password",
  //   {
  //     userId: 1,
  //     folderId: null,
  //     service: "vk",
  //     login: "vk",
  //     password: "password",
  //     favorite: false,
  //     lastChange: "2024-10-23T00:00:00.000Z",
  //     status: "ACTIVE",
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   },
  // );
  // console.log(pass);
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-5">
          <div className="text-2xl font-bold">
            Password<span className="text-primary">Manager</span>
          </div>
          <div className="px-2 py-1.5 border font-medium rounded border-primary text-primary">
            @user
          </div>
        </div>
        <div className="flex mt-5">
          <div className="w-72 mr-8">
            <div className="p-5 border border-gray rounded">
              <Folders />
            </div>
          </div>
          <div className="w-full">
            <div className="p-5 border border-gray rounded">
              <PasswordsList />
            </div>
          </div>
        </div>
      </div>
      <PasswordModal />
    </>
  );
}

export default App;
