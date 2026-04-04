import { signIn } from "@/auth";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 text-center">
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          Welcome Back!
        </h1>
        <p className="text-gray-500 mb-10">
          Sign in to track your delicious orders.
        </p>

        {/* Google Sign-In Button */}
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/customers/shop" });
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 hover:border-orange-500 hover:bg-orange-50 text-gray-700 font-bold py-4 rounded-2xl transition-all active:scale-95"
          >
            {/* You can add a Google Icon SVG here */}
            <LogIn size={20} className="text-orange-600" />
            Continue with Google
          </button>
        </form>

        <p className="mt-8 text-xs text-gray-400 uppercase tracking-widest font-bold">
          Fresh Pizza is just a click away
        </p>
      </div>
    </div>
  );
}
