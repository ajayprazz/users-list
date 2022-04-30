import { Checkbox } from "antd";
import { User } from "../../generated/graphql";
import "./UsersTable.css";

const UsersTable = ({
  users,
  globalChecked,
  checkList,
  handleGlobalCheck,
  handleCheck,
}: {
  users: User[] | null | undefined;
  globalChecked: boolean;
  checkList: boolean[];
  handleGlobalCheck: Function;
  handleCheck: Function;
}) => {
  return (
    <div className="table-container">
      <div className="table-header">
        <div className="check-col table-cell">
          <Checkbox
            checked={globalChecked}
            onChange={e => handleGlobalCheck(e.target.checked)}
          />
        </div>
        <div className="table-cell">Name</div>
        <div className="table-cell">Username</div>
        <div className="table-cell">Email</div>
        <div className="table-cell">Phone</div>
        <div className="table-cell">Website</div>
        <div className="table-cell">Address</div>
      </div>
      <div className="table-body">
        {users?.map((user: User, index: number) => (
          <div className="table-row" key={user.id}>
            <div className="check-col table-cell">
              <Checkbox
                checked={checkList[index]}
                onChange={e => handleCheck(index, e.target.checked)}
              />
            </div>
            <div className="table-cell">{user.name}</div>
            <div className="table-cell">{user.username}</div>
            <div className="table-cell">{user.email}</div>
            <div className="table-cell">{user.phone}</div>
            <div className="table-cell">{user.website}</div>
            <div className="table-cell">{user.address?.street}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTable;
