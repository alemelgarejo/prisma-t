import { GetServerSideProps } from 'next';
import * as React from 'react';
import { Product } from '../../interfaces/products/Product';
import { PrismaClient } from "@prisma/client";
import Layout from '../../components/Layout';
import UpdateProductForm from '../../components/products/UpdateForm';

const prisma = new PrismaClient()

const Products: React.FunctionComponent<Product | any> = ({product}) => {

  return <>
    <Layout>
      <div className='flex justify-center'>
        <UpdateProductForm product={product} />
      </div>
    </Layout>
  </>
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const data = await prisma.products.findUnique({
    where: {
      slug: String(params?.slug)
    }
  })/* .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) */
  return {
    props: {
      product: JSON.parse(JSON.stringify(data))
    }
  }
}

export default Products