// import React from 'react';
// import { CartItem } from '../../types/Cart';

// interface ProductItemProps {
//     item: CartItem;
//     onRemove: (productId: number) => void;
//     onQuantityChange: (productId: number, quantity: number) => void;
// }

// const ProductItem: React.FC<ProductItemProps> = ({
//                                                      item,
//                                                      onRemove,
//                                                      onQuantityChange
//                                                  }) => {
//     const handleIncrement = () => {
//         const newQuantity = item.quantity + 1;
//         onQuantityChange(item.id, newQuantity); // ✅ dùng item.id
//     };

//     const handleDecrement = () => {
//         if (item.quantity > 1) {
//             const newQuantity = item.quantity - 1;
//             onQuantityChange(item.id, newQuantity); // ✅ dùng item.id
//         }
//     };

//     return (
//         <tr className="border-b border-[#a48c8ca8]">
//             <td className="py-4 border-r border-[#a48c8ca8] w-[124px] text-center">
//                 <button
//                     onClick={() => onRemove(item.id)} // ✅ Dùng id, không phải productId
//                     className="w-10 h-10 rounded-full border border-[#cccccc] inline-flex items-center justify-center text-[#cccccc] text-3xl font-bold"
//                 >
//                     ×
//                 </button>

//             </td>

//             <td className="py-4 border-r border-[#a48c8ca8] w-[124px] text-center">
//                 <img
//                     src={item.thumbnail || "/default-image.png"}
//                     alt={item.name || "Sản phẩm"}
//                     className="w-[92px] h-[116px] object-contain mx-auto"
//                     onError={(e) => {
//                         e.currentTarget.src = "/default-image.png";
//                     }}
//                 />
//             </td>

//             <td className="py-4 border-r border-[#a48c8ca8] px-4">
//                 <p className="text-[#334862] text-xl">{item.name}</p>
//             </td>

//             <td className="py-4 border-r border-[#a48c8ca8] w-[124px] text-center">
//                 <p className="text-base font-bold text-[#111111]">
//                     {item.price.toLocaleString()} ₫
//                 </p>
//             </td>

//             <td className="py-4 border-r border-[#a48c8ca8] w-[124px] text-center">
//                 <div className="flex items-center justify-center">
//                     <button
//                         onClick={handleDecrement}
//                         className="w-9 h-9 bg-[#00000007] border border-[#00000016] rounded-tl-[14px] rounded-bl-[14px] flex items-center justify-center"
//                     >
//                         <span className="text-xl">-</span>
//                     </button>
//                     <div className="w-9 h-9 bg-[#00000007] border-t border-b border-[#00000016] flex items-center justify-center">
//                         <span className="text-xl">{item.quantity}</span>
//                     </div>
//                     <button
//                         onClick={handleIncrement}
//                         className="w-9 h-9 bg-[#00000007] border border-[#00000016] rounded-tr-[14px] rounded-br-[14px] flex items-center justify-center"
//                     >
//                         <span className="text-xl">+</span>
//                     </button>
//                 </div>
//             </td>

//             <td className="py-4 w-[124px] text-center">
//                 <p className="text-base font-bold text-[#111111]">
//                     {(item.price * item.quantity).toLocaleString()} ₫
//                 </p>
//             </td>
//         </tr>
//     );
// };

// export default ProductItem;
