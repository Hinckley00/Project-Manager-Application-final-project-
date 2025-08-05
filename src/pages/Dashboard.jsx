import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary } from "../assets/data";
import clsx from "clsx";
import Chart from "../components/Chart";
import { BGS, PRIORITYSTYLES, TASK_TYPE, getInitials } from "../utils";
import UserInfo from "../components/UserInfo";

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2 px-4">Task Title</th>
        <th className="py-2 px-4">Priority</th>
        <th className="py-2 px-4">Team</th>
        <th className="py-2 px-4 hidden md:block whitespace-nowrap">
          Created At
        </th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2 px-4">
        <div className="flex items-center gap-3">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />

          <p className="text-base text-black">{task.title}</p>
        </div>
      </td>

      <td className="py-2 px-4">
        <div className="flex gap-1 items-center">
          <span className={clsx("text-lg", PRIORITYSTYLES[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className="capitalize">{task.priority}</span>
        </div>
      </td>

      <td className="py-2 px-4">
        <div className="flex">
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-8 h-8 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} />
              {/* {getInitials(m?.name)} */}
            </div>
          ))}
        </div>
      </td>
      <td className="py-2 px-4 hidden md:block whitespace-nowrap">
        <span className="text-base text-gray-600">
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );
  return (
    <>
      <div className="w-full bg-white px-4 md:px-6 pt-4 pb-6 shadow-lg rounded">
        <table className="w-full">
          <TableHeader />
          <tbody>
            {tasks?.map((task, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className="border-b border-gray-200">
      <tr className="text-gray-700 text-left text-sm">
        <th className="py-2 px-3 whitespace-nowrap">Full Name</th>
        <th className="py-2 px-3">Status</th>
        <th className="py-2 px-3 whitespace-nowrap">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-all text-sm">
      <td className="py-5 px-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-violet-700 text-white flex items-center justify-center text-xs font-semibold">
            {getInitials(user?.name)}
          </div>
          <div className="leading-tight">
            <p className="font-medium text-gray-900 text-sm whitespace-nowrap">
              {user.name}
            </p>
            <p className="text-[11px] text-gray-500">{user?.role}</p>
          </div>
        </div>
      </td>

      <td className="py-5 px-3 whitespace-nowrap">
        <span
          className={clsx(
            "inline-block px-2 py-[2px] rounded-full text-xs font-medium",
            user?.isActive
              ? "bg-green-200 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </span>
      </td>

      <td className="py-5 px-3 text-xs text-gray-500 whitespace-nowrap">
        {moment(user?.createdAt).fromNow()}
      </td>
    </tr>
  );

  return (
    <div className="w-full overflow-x-auto bg-white px-4 py-4 shadow-lg rounded-lg">
      <table className="min-w-full text-left">
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  const totals = summary.tasks;

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardList />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"],
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-base text-gray-600">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
          <span className="text-sm text-gray-400">{"11% last month"}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white ",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full bg-white my-16 p-4 rounded shadow-lg">
        <h4 className="text-xl text-gray-600 font-semibold">
          Chart by Priority
        </h4>
        <Chart />
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-4 2xl:gap-10 py-8">
        {/* {Left} */}
        <div className="flex-1">
          <TaskTable tasks={summary.last10Task} />
        </div>

        {/* {Right} */}
        <div className="w-full lg:w-1/3 font-semibold">
          <UserTable users={summary.users} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
