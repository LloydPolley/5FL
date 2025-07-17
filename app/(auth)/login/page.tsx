import LoginForm from "./components/LoginForm";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center h-dvh">
      <LoginForm />
    </div>
  );
}
