import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../style'
import { storefront,productsQuery, search } from '../../utils'
import SEO from 'react-seo-component';
import { FaSearch } from 'react-icons/fa'

const Products = () => {

  const [products, setProducts] = useState([]);
  const [prodsSearch, setProdsSearch] = useState([]);

  const getProducts = async () => {
    const {data} =  await storefront(productsQuery, {first: 50});
    setProducts(data.products.edges);
    setProdsSearch(data.products.edges);
    console.log(data.products.edges[0].node.variants.nodes[0]);  
  }

  useEffect(() => {
    getProducts();
  }, [])


  return (
    <div id="products" className={`${styles.boxWidth} ${styles.padding} xl:px-0`}>
      <div className='flex flex-col sm:flex-row justify-between items-center pt-4 sm:pt-0 pb-4'>
        <h1 className="text-white text-3xl sm:text-4xl font-semibold font-poppins pb-2 sm:pb-0">Productos <small className='text-dimWhite text-[15px] sm:text-[20px]'>( {products.length} productos )</small></h1>
        <div className='relative w-[300px]'>
          <input 
            type="text" 
            className='focus:outline focus:outline-dimWhite focus:outline-offset-4 font-poppins p-2 text-white text-lg bg-transparent border-b-2 border-b-secondary w-[100%]'
            onChange={(e) => {
              setProducts(search(prodsSearch, e.target.value))
            }}
          />
          <span className="text-white absolute top-[20%] right-0 text-2xl"><FaSearch /></span>
        </div>
      </div>
      <div className="my-6 grid grid-cols-1 gap-y-10 gap-x-6 ss:grid-cols-2 md:grid-cols-3 xl:gap-x-8">
        {products.map((product, index) => (
          <Link to={`${product.node.handle}`}  key={index} className="my-4 sm:my-2">
            <div className="overflow-hidden w-[100%] h-[100%]">
              <img src={product.node.images.edges[0].node.transformedSrc} alt="" className='w-[100%] h-[100%] object-cover overflow-hidden hover:scale-105 transition-all duration-500' />
            </div>
            <div>
              <h2 className="text-white text-normal font-poppins">{product.node.title}</h2>
              <p className="text-white text-normal font-poppins">{product.node.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <SEO
          title='Productos'
          titleTemplate='Rancho Guadalupe'
          titleSeparator=' - '
          description='Aqui puedes encontrar todos los productos de rancho guadalupe'
          pathname={window.location.href}
          siteLanguage='es'
          siteLocale='ES'
          twitterUsername='@ranchoguadaluperg'
        />
    </div>
  )
}

export default Products