import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import RegisterForm from '../../components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <RegisterForm />
      <Footer />
    </div>
  )
}
