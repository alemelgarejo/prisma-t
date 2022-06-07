import { GetServerSideProps } from 'next';
import * as React from 'react';
import { Product } from '../interfaces/products/Product';
import { PrismaClient } from "@prisma/client";
import Layout from '../components/Layout';
import ProductCard from '../components/products/ProductCard';

const prisma = new PrismaClient()

interface Products {
  products: Product[];
}

const Products: React.FunctionComponent<Products> = ({products}) => {
    
  return <>
    <Layout>
    <div className='grid xl:grid-cols-2 md:grid-cols-1 xl:ml-14'>
      {
        products.map((p) => (
          <ProductCard key={p.name} product={p} />
        ))
      }
    </div>
    </Layout>
  </>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.products.findMany()
  return {
    props: {
      products: JSON.parse(JSON.stringify(data))
    }
  }
}

export default Products