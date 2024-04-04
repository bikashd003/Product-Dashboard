import moment from "moment";

const Navbar = () => {
    
  return (
    <>
      <div className="flex justify-between bg-yellow-400 px-4 py-2 font-abc">
        <h1>Product Dashboard</h1>
        <h1>{moment(Date.now()).format("DD-MMM-YYYY")}</h1>
      </div>
    </>
  );
};

export default Navbar;
