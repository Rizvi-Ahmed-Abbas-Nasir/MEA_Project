import NAV from './Navbar' 
import Header from './Header'


export default function AdminPanel() {
  return (
    <>
    <div className="flex w-full h-screen flex-col md:mt-10 lg:flex-row text-xl">
    <NAV />
      <div className='flex flex-col w-full gap-5 h-screen justify-center items-center'>
        <h1>Welcome Admin</h1>
      </div>
    </div>

    </>
  )
}
