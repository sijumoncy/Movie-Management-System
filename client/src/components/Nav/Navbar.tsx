const navItems = [
    {id:1, name:'movies', link:'#'},
    {id:2, name:'dashboard', link:'#'},
]

function Navbar() {
  return (
    <div className="w-full max-w-4xl mx-auto h-16 flex items-center justify-between px-5 shadow-md rounded-md">
        <div className="text-xl font-semibold cursor-pointer">Movie World</div>
        <div className="">
            <ul className="flex gap-5">
                {navItems.map((item) => (
                    <li key={item.id} className="cursor-pointer">{item.name}</li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Navbar