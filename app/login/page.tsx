"use client";
import FormLogin from "@/components/FormLogin";
import ProtectedRoute from "@/components/ProtectedRouter";

function Page() {
    return (
      <ProtectedRoute>
        <div className="grid grid-cols-8 md:grid-cols-8 bg-slate-500 h-screen m-0">
            <section className="max-md:hidden md:col-span-5 h-screen bg-green-600 flex items-center justify-center">
                <div className="w-full h-full">
                    
                </div>
            </section>
            <section className="max-md:col-span-8 p-4 bg-blue-600 md:col-span-3 h-screen ">
                <FormLogin />
            </section>
        </div>
      </ProtectedRoute>
    );

}

export default Page;
