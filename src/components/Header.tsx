import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../App";

const navigation = [
    { name: "Employees", href: "/employees" },
    { name: "Customers", href: "/customers" },
    { name: "Dictionary", href: "/dictionary" },
];

// function classNames(...classes: string[]) {
// 	return classes.filter(Boolean).join(" ");
// }

export default function Header(props: any) {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-12 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.href}
                                                    className={({
                                                        isActive,
                                                    }) => {
                                                        let str =
                                                            "px-3 py-2 rounded-md text-sm font-medium no-underline ";

                                                        if (isActive)
                                                            return (
                                                                str +
                                                                "bg-gray-900 text-white"
                                                            );
                                                        return (
                                                            str +
                                                            "text-gray-300 hover:bg-gray-700 hover:text-white"
                                                        );
                                                    }}
                                                >
                                                    {item.name}
                                                </NavLink>
                                            ))}
                                            {loggedIn ? (
                                                <NavLink
                                                    to={"/login"}
                                                    onClick={() => {
                                                        setLoggedIn(false);
                                                        localStorage.clear();
                                                    }}
                                                    className="px-3 py-2 rounded-md text-sm font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                                                >
                                                    Logout
                                                </NavLink>
                                            ) : (
                                                <NavLink
                                                    to={"/login"}
                                                    onClick={() => {
                                                        console.log("logout");
                                                    }}
                                                    className="px-3 py-2 rounded-md text-sm font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                                                >
                                                    Login
                                                </NavLink>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={({ isActive }) => {
                                            let str =
                                                "block px-3 py-2 rounded-md text-base font-medium ";

                                            if (isActive)
                                                return (
                                                    str +
                                                    "bg-gray-900 text-white"
                                                );
                                            return (
                                                str +
                                                "text-gray-300 hover:bg-gray-700 hover:text-white"
                                            );
                                        }}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                                {loggedIn ? (
                                    <NavLink
                                        to={"/login"}
                                        onClick={() => {
                                            setLoggedIn(false);
                                            localStorage.clear();
                                        }}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Logout
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        to={"/login"}
                                        onClick={() => {
                                            console.log("logout");
                                        }}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Login
                                    </NavLink>
                                )}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <div className="bg-gray-300">
                <div className="max-w-7xl mx-auto p-2 min-h-screen">
                    {props.children}
                </div>
            </div>
        </>
    );
}
