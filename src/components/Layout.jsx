// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <div className="w-full min-h-screen bg-sky-700 flex flex-col justify-center items-center space-y-6">
      <h1 className="text-3xl font-bold text-white">Simplify Chat</h1>
      {children}
    </div>
  );
}
