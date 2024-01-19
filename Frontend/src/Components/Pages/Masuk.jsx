import React from 'react';
import AuthLayout from '../Layout/AuthLayouts'
import FormLogin from '../Fragments/FormLogin'

const Masuk = () => {
  return (
    <>
      <AuthLayout title="Masuk" type="login">
        <FormLogin />
      </AuthLayout>
    </>
  );
};

export default Masuk;
