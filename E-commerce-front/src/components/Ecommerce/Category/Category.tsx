import type { TCategory } from '@/types/Category';
import './Category.css'
import { Link } from 'react-router-dom';

const Category = ({ title, img, prefix }: TCategory) => {
    return (
      <Link to={`/categories/products/${prefix}`}>
        <div className='Category'>
          <div className='categoryImg'>
            <img
              src={img}
              alt={title}
            />
            <div className='categoryOverlay'>
              <span className='categoryPrefix'>{prefix}</span>
            </div>
          </div>
          <div className='categoryContent'>
            <h4 className='categoryTitle'>{title}</h4>
            <div className='categoryArrow'>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    );
  };    
  
  export default Category;
