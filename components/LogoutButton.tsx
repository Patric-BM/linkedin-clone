import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      // Remover o cookie de autenticação
      document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

      router.push("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return <div >
    <button className="mx-2" onClick={handleLogout}>Logout</button>
  </div>
}

export default LogoutButton;
