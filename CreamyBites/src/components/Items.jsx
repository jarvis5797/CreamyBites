import { useNavigate } from "react-router-dom";
import ItemForm from "./ItemForm";
import { useEffect, useRef, useState } from "react";
import { getAllItems, getItemById } from "../services/item-service";
import AdminItemOverview from "./AdminItemOverview";


const Items = ({isAdmin}) =>{

    const [item, setItem] = useState(null);
    const [items , setItems] = useState([{}]);

    const getItems = ()=>{
      getAllItems().then((data)=>{
        const ItemsArray=data.map((item)=>{
          const weight = giveValueforWeight(item.weight);
          return{
            id: item.itemId,
            flavour: item.flavour,
            imageSrc: item.imageSrc,
            weight: weight,
            price:item.price
          };
        });
        setItems(ItemsArray);
      })
    }

    const [user ,setUser] = useState('User');

    const giveValueforWeight=(weight)=>{
      if(weight==="HALF"){
        return "0.5 kg"
      }else if(weight==="ONE"){
        return "1.0 kg"
      }else if(weight==="TWO"){
        return "2.0 kg"
      }
    }

    useEffect(() => {
      getItems();
      if(isAdmin){
        setUser('Admin')
      }
    }, [])

      const [isModalOpen, setIsModalOpen] = useState(false);

      const handleAddItemClick = () => {
          setIsModalOpen(true);
      };
  
      const closeModal = () => {
          setIsModalOpen(false);
      };

      const [isOverviewOpen, setIsOverviewOpen] = useState(false);


      const closeItemHover = () =>{
        setIsOverviewOpen(false);
      };

      const handleViewItem =async (id) =>{
        await getItemById(id).then((data)=>{
          setItem(data);
        })
        setIsOverviewOpen(true);
      }

      const [isEditOpen , setIsEditOpen] = useState(false);

      const handleEditOpen = () =>{
        setIsOverviewOpen(false);
        setIsEditOpen(true);
      }
      
      const closeEdit = () =>{
        setIsEditOpen(false);
      }

      const [showDropdown, setShowDropdown] = useState(false);

      const [type , setType] = useState(null);

      const toggleDropdown = () => {
        setShowDropdown(true);
      };

      const handleOptionClick = (option) => {
        setShowDropdown(false);
        setType(option)
        handleAddItemClick();
      };


    return(
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Items</h2>
        {isAdmin && (
        <div className="relative inline-block">
          {/* Add Item Button */}
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={toggleDropdown}
          >
            + Add Item
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute left-full top-0 ml-2 w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-700">
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <button
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleOptionClick('CAKE')}
                  >
                    Cake
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleOptionClick('PIZZA')}
                  >
                    Pizza
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items.map((item) => (
            <a key={item.id} href={items.href} className="group" onClick={(e)=>handleViewItem(item.id)}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={item.imageSrc}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-lg font-large text-gray-700">Flavour : {item.flavour}</h3>
              <h5 className="mt-1 text-lg font-large text-gray-700">Weight : {item.weight}</h5>
              <p className="mt-2 text-lg font-medium text-gray-900">Price : {item.price}</p>
            
            </a>
          ))}
        </div>
        {isModalOpen && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-full max-w-5xl p-8 rounded-lg relative overflow-auto max-h-[90vh]">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
                        <ItemForm formName={"Add Item"} type = {type}/>
                    </div>
                </div>
            )}
            {isOverviewOpen && item &&(
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white w-full max-w-5xl p-8 rounded-lg relative overflow-auto max-h-[90vh]">
                <button onClick={closeItemHover} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                            <AdminItemOverview item={item} onEdit={handleEditOpen} onClose={closeEdit} user={user}/>
                    </div>
                    </div>
            )}{isEditOpen && item && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white w-full max-w-5xl p-8 rounded-lg relative overflow-auto max-h-[90vh]">
                <button onClick={closeEdit} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                            <ItemForm itemDetails={item} formName={"Edit Item"} type={item.type}/>
                        </div>
                    </div>
            )}
      </div>

    );

}

export default Items;