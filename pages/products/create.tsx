import * as React from 'react';
import Layout from '../../components/Layout';
import CreateProductForm from '../../components/products/CreateProductForm';


const Products: React.FunctionComponent = () => {

  return <>
    <Layout>
      <div className='flex justify-center'>
        <CreateProductForm />
      </div>
    </Layout>
  </>
}
export default Products