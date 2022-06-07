import { GetServerSideProps } from 'next';
import * as React from 'react';
import { Product } from '../interfaces/products/Product';
import { PrismaClient } from "@prisma/client";
import Layout from '../components/Layout';
import ProductDetailCard from '../components/products/ProductDetailCard'

const prisma = new PrismaClient()

interface Products {
  products: Product[];
}

const Products: React.FunctionComponent<Products | any> = ({product}) => {
    
  return <>
    <Layout>
      <div className=''>
        <ProductDetailCard product={product} />
      </div>
    </Layout>
  </>
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const data = await prisma.products.findUnique({
    where: {
      slug: String(params?.slug)
    }
  })
  return {
    props: {
      product: JSON.parse(JSON.stringify(data))
    }
  }
}

export default Products