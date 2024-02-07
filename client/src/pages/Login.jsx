import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");

  function handleSubmit() {
    if (username) {
      navigate(`/chat/${username}`);
    }
  }

  return (
    <Layout>
      <form className="w-full max-w-sm flex flex-col space-y-6">
        <div className="flex flex-col items-center mb-6 space-y-6">
          <label
            className="block text-cyan-400 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="username"
          >
            Digite seu nome
          </label>
          <input
            className="appearance-none border-2 border-cyan-400 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            id="username"
            type="text"
            placeholder="Digite seu nome ou apelido"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            required
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            className="self-center shadow bg-cyan-400 hover:bg-cyan-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleSubmit}
          >
            Entrar
          </button>
        </div>
      </form>
    </Layout>
  );
}
