import NAV from './Navbar' 
import Header from './Header'


export default function AdminPanel() {
  return (
    <>
    <div className="flex w-full flex-col xl:flex-row">
    <NAV />
      <div className='flex flex-col h-[100vh] w-full gap-6 items-center overflow-y-auto p-4 bg-gray-100 sm:p-6'>
        <h1>Welcome Admin</h1>
      </div>
    </div>

    </>
  )
}