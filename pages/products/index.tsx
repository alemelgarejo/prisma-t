import { GetServerSideProps } from "next";
import * as React from "react";
import { Product } from "../../interfaces/products/Product";
import { PrismaClient } from "@prisma/client";
import Layout from "../../components/Layout";
import ProductTable from "../../components/products/ProductTable";

const prisma = new PrismaClient();

interface Products {
  products: Product[];
}

const Products: React.FunctionComponent<Products> = ({ products }) => {
  return (
    <>
      <Layout>
        <div className="mt-4 flex flex-column justify-center">
          <ProductTable products={products} />
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.products.findMany(); 
  /* const data = await fetch("http://localhost:3000/api/products/")
  const products = await data.json(); */

  return {
    props: {
      products: JSON.parse(JSON.stringify(data)),
    },
  };
};

export default Products;
