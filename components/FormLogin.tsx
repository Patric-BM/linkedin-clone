import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isSignUp) {
        // Cadastrar o usuário
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Atualizar o perfil do usuário com o nome
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`,
          photoURL: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ya3F1VlluNEpPUndxRmpOY240bHBabXJsaHgifQ"
        });
      } else {
        // Logar o usuário
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }


      const token = await userCredential.user.getIdToken(); // Obter o token do usuário

      // Definir o cookie
      document.cookie = `authToken=${token}; path=/; samesite=strict`;

      router.push("/");
    } catch (error) {
      setError(isSignUp ? "Failed to sign up. Please check your details." : "Failed to login. Please check your credentials.");
      console.error(error);
    }
  };



  return (
    <div className="flex items-center justify-center w-full h-full">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xs">
        {isSignUp && (
          <>
            <input
              type="text"
              placeholder="Primeiro Nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Último Nome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded"
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          {isSignUp ? 'Cadastrar' : 'Login'}
        </button>
        <p className="mt-4 text-white">
          {isSignUp ? 'Já tem uma conta?' : 'Ainda não tem conta?'}{' '}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-200 cursor-pointer"
          >
            {isSignUp ? 'Login' : 'Inscreva-se'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default FormLogin;
