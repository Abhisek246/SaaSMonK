import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="bg-gray-200 h-16 flex justify-between px-16 items-center">
      <div className="text-lg font-bold ">MOVIECRITIC</div>
      <div className="flex gap-4">
        <Link to='/movie'><button className="bg-white border text-violet-600 font-medium px-4 py-2 rounded-md">Add new movie</button></Link>
        <Link to='/review'><button className="bg-violet-600 text-white font-medium px-4 py-2 rounded-md">Add new review</button></Link>
      </div>
    </div>
  )
}

export default Navbar