import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import LoginForm from '../../components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <LoginForm />
      <Footer />
    </div>
  )
}
