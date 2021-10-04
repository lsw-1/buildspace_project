export const Cta = ({ onSend, status, setStatus, connectWallet }) => {
  const onEnter = async (e) => {
    if (e.key === "Enter") {
      onSend(e.target.value, { gasLimit: 300000 });
    }
  };

  switch (status) {
    case "connect-metamask":
      return (
        <button
          onClick={connectWallet}
          className="p-2 text-center  rounded-full "
          style={{ backgroundColor: "#003BFF" }}
        >
          <p className="m-3 font-extrabold text-white text-2xl">
            Connect Metamask 🦊
          </p>
        </button>
      );
    default:
    case "init":
      return (
        <div>
          <button
            onClick={() => setStatus("create-message")}
            className="p-2 text-center  rounded-full "
            style={{ backgroundColor: "#003BFF" }}
          >
            <p className="m-3 font-extrabold text-white text-2xl">
              Send a Wave 👋
            </p>
          </button>
          <p className="text-white text-xl font-light italic mt-2">
            Only one wave per 15 min
          </p>
        </div>
      );
    case "create-message":
      return (
        <>
          <input
            onKeyDown={onEnter}
            className="p-6 h-14 w-full mr-6 rounded-full text-gray-700"
          />
          <button
            disabled={status === "loading"}
            className="text-center  rounded-full  bg-gray-400"
          >
            <p
              style={{ height: 32, width: 32 }}
              className="m-3 font-extrabold text-white text-2xl"
            >
              🕰
            </p>
          </button>
        </>
      );
    case "loading":
      return (
        <>
          <button
            disabled
            style={{ backgroundColor: "#DFFFE7" }}
            className="text-center  rounded-full"
          >
            <p
              style={{ height: 32, width: 32 }}
              className="m-3 font-extrabold text-white text-2xl"
            >
              💚
            </p>
          </button>
        </>
      );
  }
};
