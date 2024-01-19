import React from 'react'
import AuthLayout from '../Layout/AuthLayouts'
import FormRegister from '../Fragments/FormRegister'
const Daftar = () => {
  return (
    <>
      <AuthLayout title="Daftar" type="register">
        <FormRegister />
      </AuthLayout>
    </>
  )
}

export default Daftar