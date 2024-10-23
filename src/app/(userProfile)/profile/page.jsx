'use client';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

export default function Page() {
    const { data: session } = useSession();

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-gray-900">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md">
                    <div className="bg-red-600 p-8 text-center">
                        <h1 className="text-3xl font-bold text-white">Profile</h1>
                    </div>
                    <div className="p-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold">{session?.user?.name}</h2>
                            <p className="text-lg text-gray-700">{session?.user?.designation}</p>
                        </div>
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center justify-between text-gray-800">
                                <span className="font-semibold">Email:</span>
                                <span>{session?.user?.email}</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-800">
                                <span className="font-semibold">Contact:</span>
                                <span>{session?.user?.contactNumber}</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-800">
                                <span className="font-semibold">Role:</span>
                                <span>{session?.user?.role}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="mt-8 w-full bg-red-500 text-white py-3 rounded-md font-semibold hover:bg-red-600 transition duration-300"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
