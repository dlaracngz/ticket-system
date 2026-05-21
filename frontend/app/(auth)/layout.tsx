export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl py-8 px-6 bg-white shadow-2xl rounded-2xl m-4">
        {children}
      </div>
    </div>
  );
}
