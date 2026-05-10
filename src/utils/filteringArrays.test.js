import { describe, test, expect } from "bun:test"
import { filteringArrays } from "./filteringArrays.js"
describe("filteringArrays",()=>{
  test("Mueve productos en oferta al final", ()=>{
    const products = [1,2,3,4,5].map(id=>({id,category:"beauty",price:10}))
    const hotDeals = [3,5].map(id=>({id,category:"beauty",price:10}))
    const {normalProducts,hotDealProducts} = filteringArrays(products,hotDeals)
    const productsFiltered = normalProducts.concat(hotDealProducts)
    expect(productsFiltered).toEqual([
      {id:1,category:"beauty",price:10},
      {id:2,category:"beauty",price:10},
      {id:4,category:"beauty",price:10},
      {id:3,category:"beauty",price:10},
      {id:5,category:"beauty",price:10}
    ])
  })
  test("Sin ofertas",()=>{
    const products = [1,2,3,4,5].map(id=>({id,category:"beauty",price:10}))
    const hotDeals = []
    const {normalProducts,hotDealProducts} = filteringArrays(products,hotDeals)
    const productsFiltered = normalProducts.concat(hotDealProducts)
    expect(productsFiltered).toEqual(products)
  })
  test("Todos los productos en oferta, se mantiene el orden",()=>{
    const products = [1,2,3,4,5].map(id=>({id,category:"beauty",price:10}))
    const hotDeals = [1,2,3,5,4].map(id=>({id,category:"beauty",price:10}))
    const {normalProducts,hotDealProducts} = filteringArrays(products,hotDeals)
    const productsFiltered = normalProducts.concat(hotDealProducts)
    expect(productsFiltered).toEqual(products)
  })
  test("Ignora productos que no están en oferta",()=>{
    const products = [1,2,3].map(id => ({id,category:"beauty",price:10}))
    const hotDeals = [{id:999, category:"beauty", price:10}]
    const {normalProducts,hotDealProducts} = filteringArrays(products,hotDeals)
    const productsFiltered = normalProducts.concat(hotDealProducts)
    expect(productsFiltered).toEqual(products)
  })
  test("Respeta el orden original de productos en oferta (filteredB)",()=>{
    const products = [1,2,3,4,5].map(id=>({id,category:"beauty",price:10}))
    const hotDeals = [5,3].map(id=>({id,category:"beauty",price:10}))
    const {normalProducts,hotDealProducts} = filteringArrays(products,hotDeals)
    const productsFiltered = normalProducts.concat(hotDealProducts)
    expect(productsFiltered).toEqual([
      {id:1,category:"beauty",price:10},
      {id:2,category:"beauty",price:10},
      {id:4,category:"beauty",price:10},
      {id:3,category:"beauty",price:10},
      {id:5,category:"beauty",price:10}
    ])
  })
})