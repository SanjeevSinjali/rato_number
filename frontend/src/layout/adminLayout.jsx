const AdminLayout = ({ children, title }) => {
  return (
    <div className="flex flex-col gap-6 p-4">
      {title && (
        <h1 className="text-2xl font-semibold text-gray-800 pb-2">
          {title}
        </h1>
      )}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default AdminLayout;

