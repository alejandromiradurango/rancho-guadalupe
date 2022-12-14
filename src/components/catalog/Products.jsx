import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../style'
import { storefront,productsQuery, search } from '../../utils'
import SEO from 'react-seo-component';
import { FaSearch } from 'react-icons/fa'
import { ImSpinner9 } from 'react-icons/im'

const Products = () => {

  const [products, setProducts] = useState([]);
  const [prodsSearch, setProdsSearch] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    const {data} =  await storefront(productsQuery, {first: 50});
    setProducts(data.products.edges);
    setProdsSearch(data.products.edges);
    console.log(data.products.edges);  
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div id="products" className={`${styles.boxWidth} ${styles.padding} xl:px-0`}>
      <div className='flex flex-col sm:flex-row justify-between items-center pt-4 sm:pt-0 pb-4'>
        <h1 className=" text-3xl sm:text-4xl font-semibold font-primary pb-2 sm:pb-0">Productos <small className='text-[15px] sm:text-[20px]'>( {products.length} productos )</small></h1>
        <div className='relative w-[300px]'>
          <input 
            type="text" 
            className='focus:outline focus:outline-dimWhite focus:outline-offset-4 font-primary p-2 text-primary text-lg bg-transparent border-b-2 border-b-secondary w-[100%]'
            placeholder="Buscar..."
            onChange={(e) => {
              setProducts(search(prodsSearch, e.target.value))
            }}
          />
          <span className="text-secondary absolute top-[20%] right-0 text-2xl"><FaSearch /></span>
        </div>
      </div>
      <div className="mb-6 px-2 grid grid-cols-1 gap-y-10 gap-x-6 ss:grid-cols-2 md:grid-cols-3 xl:gap-x-8 bg-gray-200">
        {products.map((product, index) => (
          <Link to={product.node.handle} id={product.node.handle} key={index} className="my-4 sm:my-2">
            <div className="overflow-hidden w-[100%] h-[100%]">
              <img src={product.node.images.edges[0].node.transformedSrc} alt="" className='w-[100%] h-[100%] object-contain overflow-hidden hover:opacity-60 transition-all duration-500' />
            </div>
            <div>
              <h2 className="text-primary font-semibold font-primary uppercase">{product.node.title}</h2>
            </div>
          </Link>
        ))}
      </div>
      {loading && <div className="text-primary h-[45vh] mx-auto flex justify-center animate-spin items-center"><ImSpinner9 className='animate-spin text-4xl'/></div>}
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