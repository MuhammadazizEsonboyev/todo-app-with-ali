import React, { useEffect, useState } from "react";
import ModalCreater from "../ModalCreater/ModalCreater";
import axios from "axios";
import { PREFIX } from "../../helpers/Api";
import { useLoaderData } from "react-router-dom";
import { JWT_PERSISTANT_STATE } from "../../store/user.slice";
import store from "../../store/store";

const TaskList = () => {
    const [getData, setGetData] = useState([])

    const config = {
        headers: { Authorization: `Bearer ${store.getState().user.jwt}` }
    };
    const getTasks = () => {
        axios.get(`${PREFIX}/task/get`, config)
            .then(res => setGetData(res?.data))
            .catch(err => console.error(err));
    }
    useEffect(() => {
        getTasks()
    }, [])



    return (
        <div className="relative w-full flex flex-col h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
                <div className="flex items-center justify-between gap-8 mb-8">
                    <div>
                        <h5
                            className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            Vazifalar jadvali
                        </h5>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                        <ModalCreater />
                    </div>
                </div>
            </div>

            <div className="p-6 px-0 overflow-scroll w-full">
                <table className="w-full mt-4 text-left table-auo min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Member
                                </p>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Title
                                </p>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Description
                                </p>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Deadline
                                </p>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getData?.map(({ title, description, deadline, createdAt }) => (
                            <tr>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="flex items-center gap-3">
                                        <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                                            alt="John Michael" className="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
                                        <div className="flex flex-col">
                                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                John Michael
                                            </p>
                                            <p
                                                className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                                                john@creative-tim.com
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="flex flex-col">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {title}
                                        </p>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="w-max">
                                        <div
                                            className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                                            <span className="">{description}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {deadline}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <button
                                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button">
                                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                                className="w-4 h-4">
                                                <path
                                                    d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                                </path>
                                            </svg>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Page 1 of 10
                </p>
                <div className="flex gap-2">
                    <button
                        className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Previous
                    </button>
                    <button
                        className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
export default TaskList;