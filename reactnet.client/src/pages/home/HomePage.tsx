
const HomePage = () => {
  return (
    <div className="w-full px-6">
      <DashboardStats />
      <span className="text-xs text-gray-500 flex justify-end pb-2 pe-2">Doble click para crear evento</span>
      <div className="flex-grow bg-white rounded-lg shadow-md overflow-hidden">
        <Calendar />
      </div>
    </div>
  );
};

export default HomePage; 