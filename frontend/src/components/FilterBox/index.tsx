
// type FilterBoxProps = {
//   filtro: string
//   options: []
//   name: string
//   required: boolean
//   id: string
//   value?: string
//   onChange: string
// }

// export function FilterBox({ filtro, options, name, id, required=true, value, onChange, ...props }: FilterBoxProps) {

//   return (
//     <div className="mb-3 w-full">
//       <label
//         htmlFor={id}
//         className="block mb-2 text-sm font-medium text-[#c4d3e6]"
//       >
//         {filtro}
//       </label>
//       <OpSelect
//         name={name}
//         id={id}
//         required={required}
//         className={
//           "w-full px-2 py-1 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-sm transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30"
//         }
//         options={options}
//         value={value}
//         onChange={onChange}
//         {...props}
//       ></OpSelect>
//     </div>
//   );
// }
// // className={
// //           "w-full px-2 py-1 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-sm transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30"
// //         }