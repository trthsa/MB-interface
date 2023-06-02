import { Box, Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { User } from "../../../components/interface/Flight";
import LoadingIcon from "../../../style/components/LoadingIcon";
import UserItemTable from "./components/UserItemTable";

const fetchUsers = async () => {
  const response = await fetch("https://localhost:44379/api/User/GetAll");
  const data = await response.json();
  return data;
};

export default function UserOverView() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    //TODO fetch data
    setIsLoading(true);
    fetchUsers().then((data) => {
      setUsers(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="px-20 pt-10">
        <h1 className="text-3xl font-bold mb-5">Users Information</h1>

        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            <UsersTable users={users} />
          </>
        )}
      </div>
    </>
  );
}

const UsersTable = ({ users }: { users: User[] }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const clickedUser = useRef<User | null>(null);
  return (
    <>
      <div className={`bg-white shadow-md rounded my-6`}>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">ID</th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Tên người dùng
              </th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                onClick={() => {
                  clickedUser.current = user;
                  handleOpen();
                }}
                key={user.id}
                className="hover:bg-gray-100 border-b cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.userName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          //make flex and justify center

          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            height: "80%",
            bgcolor: "background.paper",
            border: "2px solid var(--primary-color)",
            boxShadow: 24,
            p: 4,
          }}
        >
          <UserItemTable
            isScrolling
            user={
              users.filter((user) => user.id === clickedUser.current?.id)[0]
            }
          />
        </Box>
      </Modal>
    </>
  );
};
