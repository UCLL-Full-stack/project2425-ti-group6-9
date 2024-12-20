import UserService from "@services/UserService";
import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";

const UserLoginForm: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const { t } = useTranslation();

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name && name.trim() === "") {
      setNameError(t('login.validate.name'));
      result = false;
    }

    if (!password && password.trim() === "") {
      setPasswordError(t('login.validate.password'));
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const user = {
      username: name,
      password
    }

    const response = await UserService.loginUser(user);
    if(response.status === 200) {
      const user = await response.json();
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({
          token: user.token,
          username: user.username,
          role: user.role,
          id: user.id
        })
      );
      setStatusMessages([{message: t('login.success'), type: 'success'}]);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else if (response.status === 401) {
      const { errorMessage } = await response.json();
      setStatusMessages([{ message: errorMessage, type: 'error'}]);
    } else {
      setStatusMessages([
        {
          message: "An error has occured. Please try again later.",
          type: 'error'
        }
      ]);
    };
  };

  return (
    <>
      <h3 className="px-0">{t('login.title')}</h3>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto ">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium text-gray-800">
          {t('login.label.username')}
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full h-9 bg-gray-800 rounded-xl pt-2 px-2 bg-opacity-20 text-black placeholder-gray-800"
          />
          {nameError && <div className="text-red-800 ">{nameError}</div>}
        </div>
        <div className="mt-2">
          <div>
            <label
              htmlFor="passwordInput"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              {t('login.label.password')}
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full h-9 bg-gray-800 rounded-xl pt-2 px-2 bg-opacity-20 text-black placeholder-gray-800"
            />
            {passwordError && (
              <div className=" text-red-800">{passwordError}</div>
            )}
          </div>
        </div>
        <button
            type="submit"
            className="mt-4 button-75 relative flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-700 text-white font-bold uppercase w-full rounded-lg h-14 px-5 text-sm focus:outline-none"
        >
          {t('login.button')}
        </button>
      </form>
    </>
  );
};

export default UserLoginForm;
