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
  res: NextApiResponse<Product | string | any>
) {
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        const product = await prisma.products.findUnique({
          where: {
            slug: String(query.slug)
          }
        });
        return res.json(product);
      } catch (error) {
        return res.status(404).json(error);
      }
    case "PUT":
      try {
        const product = await prisma.products.update({
          where: {
            slug: String(query.slug)
          }, 
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
          }
        })
        return res.json(product);
      } catch (error) {
        return res.status(404).json(error);
      }
    case "DELETE":
      try {
        const product = await prisma.products.delete({
          where: {
            slug: String(query.slug)
          }
        });
        return res.json('ok')
      } catch (error: any) {return res.status(404).json(error);} 
    default:
      res.status(400).json('invalid method')
      break;
  }
}
