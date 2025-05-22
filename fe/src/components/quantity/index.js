import {AiOutlineEye, AiOutlineShoppingCart} from "react-icons/ai";
import {formatter} from "../../utils/fomater";
import {memo} from "react";
import "./style.scss"
import {ROUTERS} from "../../utils/router";
import {generatePath, Link} from "react-router-dom";

const Quantity = ({hasAddToCart = true}) => {

    return (
       <div className="quantity-container">
           <div className="quantity">
               <span className="qtybtn">-</span>
               <input type="number" defaultValue={1}/>
               <span className="qtybtn">+</span>
           </div>
           {
               hasAddToCart && (
                   <button type="submit" className="button-submit">
                       Thêm giỏ hàng
                   </button>
               )
           }
       </div>
    );
};
export default memo(Quantity);