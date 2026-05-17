import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Dot, X } from "lucide-react";

const dummyNotifications = [
  { id: 1, text: "Complaint #1101 has been resolved", time: "2 hours ago" },
  {
    id: 2,
    text: "New notice posted: Final Exam Schedule",
    time: "5 hours ago",
  },
  { id: 3, text: "Admin replied to ticket #1019", time: "1 day ago" },
  { id: 4, text: "New event added to calendar", time: "2 days ago" },
  { id: 5, text: "Profile updated successfully", time: "3 days ago" },
];

export default function RecentActivity() {
  const [expanded, setExpanded] = useState(false);
  const [viewAll, setViewAll] = useState(false);

  const visibleItems = expanded
    ? dummyNotifications
    : dummyNotifications.slice(0, 3);

  return (
    <div className="relative w-full -top-3 ">
      <div className="bg-white dark:bg-black  px-4 sm:px-6 w-full  mx-auto">
        <div className="flex items-center justify-between mb-4 pr-0 sm:pr-10">
          <h2 className="font-medium text-[#000000] dark:text-white text-2xl">
            Recent Activity
          </h2>
          <button
            onClick={() => setViewAll(true)}
            className="text-sm px-5 py-2 font-medium rounded-2xl text-[#E3264A] hover:underline bg-[#FEE2E2]"
          >
            View All
          </button>
        </div>
        <div className="overflow-y-auto scrollbar-hide px-2 sm:px-5 md:px-10  rounded-2xl">
          <div className="  rounded-2xl border border-[#E0DDDD] dark:border-[#D9D9D9] flex flex-col gap-0.5 ">
            <AnimatePresence>
              {visibleItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex  items-start hover:bg-blue-50 dark:hover:bg-gray-700  rounded-2xl  "
                >
                  <div className="flex flex-col sm:flex-row items-start  sm:items-center justify-center sm:justify-between w-full px-2 sm:px-4 md:px-10  ">
                    <div className="flex items-center justify-start -space-x-3 ">
                      <Dot className="size-13 text-[#29CC39]" />
                      <p className=" text-[18px] font-semibold text-[#000000] dark:text-[#FFFFFF]">
                        {item.text}
                      </p>
                    </div>
                    <div className="px-10 sm:px-0 flex items-center justify-center sm:justify-end ">
                      <span className="text-sm text-[#000000] dark:text-[#F8F8F8]">
                        {item.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {dummyNotifications.length > 3 && (
              <div className="flex justify-center relative -top-1 ">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ChevronDown
                    className={`text-gray-500 transition-transform ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {viewAll && (
          <>
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                onClick={() => setViewAll(false)}
                className="absolute inset-0 bg-black/30 dark:bg-black/60 "
              />

              <motion.div
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="
            relative w-full max-w-md sm:max-w-lg
            rounded-2xl
            bg-[#f0f0f0] dark:bg-[#2b2b2b]
            p-6 shadow-2xl
          "
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    All Notifications
                  </h3>
                  <button onClick={() => setViewAll(false)}>
                    <X className="size-6 text-black dark:text-gray-400" />
                  </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto scrollbar-hide space-y-3">
                  {dummyNotifications.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-200">{item.text}</p>
                        <span className="text-xs text-gray-400">
                          {item.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
