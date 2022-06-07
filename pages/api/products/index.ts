// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../interfaces/products/Product";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Products {
  products: Product[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Products | string | any>
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const products = await prisma.products.findMany();
        return res.json(products);
      } catch (error) {
        return res.status(404).json(error);
      }
    case "POST":
      try {
        const product = await prisma.products.create({
          data: {
            name: body.name,
            slug: body.slug,
            category: body.category,
            image: body.image,
            price: body.price,
            brand: body.brand,
            rating: body.rating,
            numReviews: body.numReviews,
            countInStock: body.countInStock,
            description: body.description,
          },
        });
        return res.json('ok')
      } catch (error: any) {return res.status(404).json(error);}
    default:
      res.status(400).json('invalid method')
      break;
  }
}
