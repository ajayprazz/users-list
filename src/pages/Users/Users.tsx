import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { PlusOutlined } from "@ant-design/icons";
import SearchBar from "../../components/SearchBar/SearchBar";
import CustomButton from "../../components/CustomButton/CustomButton";
import UsersTable from "../../components/UsersTable/UsersTable";
import Loader from "../../components/Loader/Loader";
import "./Users.css";

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: { street: string };
};

const useUsers = () => {
  return useQuery<User[], Error>("users", async () => {
    const {
      users: { data },
    } = await request(
      "https://graphqlzero.almansi.me/api",
      gql`
        query {
          users {
            data {
              id
              name
              username
              email
              phone
              website
              address {
                street
              }
            }
          }
        }
      `
    );

    return data;
  });
};

const Users = () => {
  const [userCheckList, setUserCheckList] = useState<boolean[]>([]);
  const [globalChecked, setGlobalChecked] = useState<boolean>(false);

  const [filteredUsers, setFilteredUsers] = useState<User[] | undefined>([]);

  const [searchStr, setSearchStr] = useState<string>("");

  const { data, error, isLoading } = useUsers();

  const handleCheckChange = (index: number, checked: boolean) => {
    const temp: boolean[] = [...userCheckList];

    temp[index] = checked;

    setUserCheckList(temp);
  };

  const handleGlobalCheckChange = (checked: boolean) => {
    setGlobalChecked(checked);

    setUserCheckList(userCheckList.map(() => checked));
  };

  const updateSearchStr = (str: string) => {
    setSearchStr(str);
  };

  const handleSearch = (str: string) => {
    if (str) {
      setFilteredUsers(
        data?.filter(
          (user: User) =>
            user.name.toLowerCase().includes(str) ||
            user.username.toLowerCase().includes(str) ||
            user.email.toLowerCase().includes(str) ||
            user.phone.includes(str) ||
            user.website.toLowerCase().includes(str) ||
            user.address.street.toLowerCase().includes(str)
        )
      );
    } else {
      setFilteredUsers(data);
    }
  };

  useEffect(() => {
    if (data) {
      setFilteredUsers(
        data.sort((a: User, b: User) =>
          a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
        )
      );
    }
  }, [data]);

  useEffect(() => {
    if (filteredUsers?.length) {
      setUserCheckList(Array(filteredUsers.length).fill(false));
    }
  }, [filteredUsers]);

  useEffect(() => {
    if (userCheckList.length) {
      setGlobalChecked(
        userCheckList.every((_user, index) => userCheckList[index] === true)
      );
    }
  }, [userCheckList]);

  if (isLoading) return <Loader message="Fetching Users" />;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return !isLoading ? (
    <div className="App">
      <div className="header">
        <div className="page-title">
          <h1>Users</h1>
        </div>
        <div className="page-options">
          <SearchBar
            label="Search"
            searchText={searchStr}
            handleSearchChange={updateSearchStr}
            handleSearch={handleSearch}
          />
          <CustomButton
            label="New User"
            ButtonIcon={<PlusOutlined />}
            clickHandler={() => {}}
          />
        </div>
      </div>
      <UsersTable
        users={filteredUsers}
        globalChecked={globalChecked}
        checkList={userCheckList}
        handleGlobalCheck={handleGlobalCheckChange}
        handleCheck={handleCheckChange}
      />
    </div>
  ) : (
    <Loader message="Fetching Users" />
  );
};

export default Users;
