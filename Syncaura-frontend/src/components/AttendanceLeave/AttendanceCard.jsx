const AttendanceCard = ({ title, value, borderColor, icon }) => {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#2E2F2F] w-72 shadow-[0_0_10px_1px_#EDEDED] dark:shadow-[0_0_10px_1px_#171717] px-5 py-3 rounded-2xl flex justify-between items-center">
      <div className="flex flex-col ">
        <h1 className="text-[#000000] dark:text-[#FFFFFF] text-base font-semibold">
          {title}
        </h1>
        <h1 className="text-[#000000] dark:text-[#FFFFFF] text-xl font-bold">
          {value}
        </h1>
        <p className="text-[#000000] dark:text-[#FFFFFF] text-xs font-semibold">
          This Month
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div
          className={`rounded-full size-7 bg-[#FFFFFF] dark:bg-[#2E2F2F] border ${borderColor} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};


export default AttendanceCard