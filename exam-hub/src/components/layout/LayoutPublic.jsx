import { Outlet } from 'react-router-dom'
const LayoutPublic = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <Outlet />
    </div>
  )
}
export default LayoutPublic
