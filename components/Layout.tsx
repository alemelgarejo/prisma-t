import * as React from 'react'
import Footer from './navigation/footer'
import Nav from './navigation/nav'

interface LayoutProps {
  children: React.ReactNode | any
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div>
      <Nav/>
      {children}
      <Footer/>
    </div>
  )
}

export default Layout