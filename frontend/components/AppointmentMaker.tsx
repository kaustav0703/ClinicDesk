import { useRef } from "react";

export default function AppointmentMaker({ slotInfo, onSave, onClose }: any) {
  const titleRef = useRef<HTMLInputElement>(null);

  return (
    <div className="z-[9999] fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Create Appointment</h2>
        <p className="text-gray-300 text-sm mb-4 break-words">
          Start: {slotInfo?.start.toString()} <br />
          End: {slotInfo?.end.toString()}
        </p>
        <input
          ref={titleRef}
          type="text"
          placeholder="Appointment Title"
          className="w-full border border-gray-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onSave(titleRef.current?.value || "")}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
