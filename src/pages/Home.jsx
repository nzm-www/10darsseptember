import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/interceptor";
import { useAppStore } from "../zustand";

function Home() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("red");
  const [description, setDescription] = useState("");
  const [boards, setBoards] = useState([]);

  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get("/boards/my-boards");
        console.log(response.data.boards);
        setBoards(response.data.boards);
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        console.log(error.response.data.message);

        if (error.response.data.message === "Not authorized") {
          setUser(null);
        }
      }
    };
    fetchBoards();
  }, []);

  const resetForm = () => {
    setTitle("");
    setColor("red");
    setDescription("");
    setModalOpen(false);
  };
  const handleCreateBoard = () => {
    const newBoard = { name: title, description, color };
    axios
      .post("/boards/create", newBoard)
      .then((res) => {
        console.log("Board successfully created:", res.data);
        setBoards([...boards, newBoard]);
        resetForm();
      })
      .catch((err) => {
        if (err.response && err.response.data.message === "Token topilmadi") {
          console.error("Token not found, logging out user.");
          setUser(null);
          navigate("/login");
        } else {
          console.error(
            "Error creating board:",
            err.response ? err.response.data : err.message
          );
        }
      });
  };
  return (
    <div className="ml-[90px] animate-my-animate">
      <div className="flex items-center justify-between p-6">
        <div className="">
          <dialog open={modalOpen} className="modal">
            <div className="modal-box flex m-auto justify-center ">
              <form
                method="dialog"
                className=" w-64"
                onSubmit={(e) => e.preventDefault()}
              >
                <button
                  className="btn  btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => setModalOpen(false)}
                >
                  ✕
                </button>
                <h3 className="font-bold text-lg"> New Board</h3>
                <div className="py-4">
                  <label className="block">
                    Title:
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="input border-0 bg-zinc-200 input-bordered w-full"
                      required
                    />
                  </label>

                  <label className="block mt-2">
                    Description:
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="input border-0 bg-zinc-200 input-bordered w-full"
                      required
                    />
                  </label>
                  <label className="block mt-1">
                    Color:
                    <div className="relative border-0 border-0 bg-zinc-200 bg-zinc-200">
                      <select
                        onChange={(e) => setColor(e.target.value)}
                        className="select w-full"
                      >
                        <option value="red" className="text-red-600 font-bold">
                          Qizil
                        </option>
                        <option
                          value="gray"
                          className="text-gray-500 font-bold"
                        >
                          Kulrang
                        </option>
                        <option
                          value="orange"
                          className="text-orange-600 font-bold"
                        >
                          Orange
                        </option>
                        <option
                          value="green"
                          className="text-green-600 font-bold"
                        >
                          yashil
                        </option>
                      </select>
                    </div>
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleCreateBoard}
                  className=" bg-sky-900 w-full py-[14px] rounded-[23px] text-white"
                >
                  Add Board
                </button>
              </form>
            </div>
          </dialog>
          <button
            onClick={() => setModalOpen(true)}
            className=" p-2 rounded-xl bg-slate-800 text-white"
          >
            + Add Borad
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 p-6">
        {boards.map((board, index) => (
          <div
            key={index}
            className="cursor-pointer hover:opacity-0.8 w-[200px] h-[90px] border-2 border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-start transition-transform duration-300 transform "
            style={{ backgroundColor: board.color }}
          >
            <h4 className="font-bold text-lg text-white">
              {" "}
              Title: {""}
              {board.name}
            </h4>
            <p className="text-white">
              : {""}
              {board.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
