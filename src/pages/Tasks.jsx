import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bd-green-600",
};

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState(false)

  return <div></div>;
};

export default Tasks;
