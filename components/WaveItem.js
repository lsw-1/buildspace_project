import dayjs from "dayjs";
var duration = require("dayjs/plugin/duration");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
dayjs.extend(duration);

export const WaveItem = ({ wave }) => {
  const now = dayjs();
  const diff = dayjs(wave.timestamp).diff(now);

  const time = dayjs.duration(diff).humanize();
  return (
    <div className="flex items-end">
      <div
        className="flex p-4 items-center"
        style={{
          minWidth: 588,
          height: 118,
          backgroundColor: "#7b47ff",
          borderRadius: 20,
        }}
      >
        <p style={{ fontSize: 37 }}>👋</p>
        <p className="ml-2 text-2xl font-bold text-white">{wave.message}</p>
      </div>
      <div className="ml-2 text-center">
        <p className="text-white">{time + " ago"}</p>
        <div
          className="flex place-content-center rounded-full "
          style={{ width: 103, height: 28, backgroundColor: "#cc009c" }}
        >
          <p className="text-white">{wave.address}</p>
        </div>
      </div>
    </div>
  );
};
