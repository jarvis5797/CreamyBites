import { useEffect, useState } from "react";
import { addItem, editItem } from "../services/admin-service";
import { toast } from "react-toastify";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const ItemForm = ({itemDetails , formName}) =>{

  const s3 = new S3Client({
    region: 'us-east-1', 
    endpoint: 'https://blr1.digitaloceanspaces.com', 
    credentials: {
      accessKeyId: 'DO00L7DTUF4MR4E2HP67', 
      secretAccessKey: 'nDuommlrmgejWXZBnKhmGKVexATPCcawLrIFL2kkFLg', 
    },
  });

  const[item , setItem]=useState({
    flavour:'',
    description:'',
    image1:'',
    image2:'',
    image3:'',
    image4:'',
    weight:'',
    price:0.0,
    add_ons:[],
    variant:'',
    type:'',
  });

  useEffect(() => {
    if (itemDetails) {
      setItem({
        flavour: itemDetails.flavour || '',
        price: itemDetails.price || 0.0,
        description: itemDetails.description || '',
        image1:itemDetails.image1 || '',
        image2:itemDetails.image2 || '',
        image3:itemDetails.image3 || '',
        image4:itemDetails.image4 || '',
        type: itemDetails.type || '',
        add_ons:itemDetails.add_ons || [],
        variant: itemDetails.variant || '',
        weight: itemDetails.weight || '',
      });
    } else {
      setItem({
        flavour: '',
        price: 0.0,
        description: '',
        image1:'',
        image2:'',
        image3:'',
        image4:'',
        type: '',
        add_ons:[],
        variant: '',
        weight: '',
      });
    }
  }, [itemDetails]);

  const handleChange=(event , propertry)=>{
    if (event.target.type === 'checkbox') {
      const { id, checked } = event.target;
      setItem(prevState => {
        const updatedAddOns = checked
          ? [...prevState.add_ons, id]  
          : prevState.add_ons.filter(addOn => addOn !== id); 
          console.log(updatedAddOns) 
        return { ...prevState, add_ons: updatedAddOns };
      });
    }
    else if (propertry === 'price') {
      const value = parseFloat(event.target.value);
      setItem(prevState => ({ ...prevState, [propertry]: isNaN(value) ? 0.0 : value }));
    } 
    else {
      setItem(prevState => ({ ...prevState, [propertry]: event.target.value }));
    }
  }

  const uploadImageToSpaces = (file) => {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: 'items-image',  
        Key: `prod-images/${Date.now()}-${file.name}`,  
        Body: file,
        ACL: 'public-read',  
        ContentType: file.type, 
      };

      const command = new PutObjectCommand(params);

      s3.send(command)
        .then((data) => {
          resolve(`https://blr1.digitaloceanspaces.com/${params.Bucket}/${params.Key}`);  
        })
        .catch((err) => {
          reject('Error uploading image: ' + err);
        });
    });
  };

  const handleImageChange = async (event, imageField) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const uploadedUrl = await uploadImageToSpaces(file);
        console.log(uploadedUrl)
        setItem(prevState => ({ ...prevState, [imageField]: uploadedUrl }));
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleSubmit= async (event)=>{
    event.preventDefault();
    console.log(item)
    const requiredFields = ['flavour', 'description', 'image1','image2','image3','image4','weight', 'price', 'variant', 'type'];

  const emptyFields = requiredFields.filter(field => {
    const value = item[field];
    return (field === 'price' ? isNaN(parseFloat(value)) || parseFloat(value) <= 0 : !value.trim());
  });

  if (emptyFields.length > 0) {
    emptyFields.forEach(field => {
      toast.error(`Kindly fill the ${field}`);
    });
    return;
  }
  try {
    if(formName==="Add Item"){
    await addItem(item);
    toast.success("Item added successfully!");
  }else{
    console.log(item);
    await editItem(itemDetails.itemId,item);
    toast.success("Item updated successfully!");
  }} catch (error) {
    toast.error("There is some problem with adding the item!!");
  }
  }

    return (
        <>
        <form>
  <div class="space-y-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">{formName}</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed to the user</p>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="flavour" class="block text-sm font-medium leading-6 text-gray-900">Flavour</label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input type="text" name="flavour" id="flavour" autocomplete="flavour" 
                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                placeholder="Choclate"
                onChange={(e)=>handleChange(e,'flavour')}
                value={item.flavour}
                />
            </div>
          </div>
        </div>

        <div class="col-span-full">
          <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
          <div class="mt-2">
            <textarea id="description" name="description" rows="3" 
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=>handleChange(e,'description')} value={item.description}>

            </textarea>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">Write few sentences about Item.</p>
        </div>
      </div>
    </div>

    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Other Information</h2>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div class="sm:col-span-3">
          <label for="weight" class="block text-sm font-medium leading-6 text-gray-900">Weight</label>
          <div class="mt-2">
            <select id="weight" name="weight" autocomplete="weight" 
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" onChange={(e)=>handleChange(e,'weight')} value={item.weight}>
              <option value="">select weight</option>
              <option value="HALF">0.5 kg</option>
              <option value="ONE">1.0 kg</option>
              <option value="TWO">2.0 kg</option>
            </select>
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="variant" class="block text-sm font-medium leading-6 text-gray-900">Variant</label>
          <div class="mt-2">
            <select id="variant" name="variant" autocomplete="variant-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" onChange={(e)=>handleChange(e,'variant')} value={item.variant}>
            <option value="">select variant</option>
              <option value="EGGLESS">Eggless</option>
              <option value="WITHEGG">With egg</option>
            </select>
          </div>
        </div>
        <div class="sm:col-span-4">
          <label for="image" class="block text-sm font-medium leading-6 text-gray-900">Image Link</label>
          <div class="mt-2">
            <input id="image" name="image" type="file" autocomplete="image" accept="image/*" 
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>handleImageChange(e,'image1')}
            />
            {item.image1 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Uploaded Image: <a href={item.image1} target="_blank" rel="noopener noreferrer" className="text-indigo-600">{item.image1}</a></p>
              </div>
            )}
          </div>
          <div class="mt-2">
          <input id="image" name="image" type="file" autocomplete="image" accept="image/*" 
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>handleImageChange(e,'image2')}
            value={item.image2}
            />
            {item.image2 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Uploaded Image: <a href={item.image2} target="_blank" rel="noopener noreferrer" className="text-indigo-600">{item.image2}</a></p>
              </div>
            )}
          </div>
          <div class="mt-2">
          <input id="image" name="image" type="file" autocomplete="image" accept="image/*" 
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>handleImageChange(e,'image3')}
            />
            {item.image3 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Uploaded Image: <a href={item.image3} target="_blank" rel="noopener noreferrer" className="text-indigo-600">{item.image3}</a></p>
              </div>
            )}
          </div>
          <div class="mt-2">
          <input id="image" name="image" type="file" autocomplete="image" accept="image/*" 
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>handleImageChange(e,'image4')}
            />
            {item.image4 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Uploaded Image: <a href={item.image4} target="_blank" rel="noopener noreferrer" className="text-indigo-600">{item.image4}</a></p>
              </div>
            )}
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="type" class="block text-sm font-medium leading-6 text-gray-900">Type</label>
          <div class="mt-2">
            <select id="type" name="type" autocomplete="type-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" onChange={(e)=>handleChange(e,'type')} value={item.type}>
            <option value="">select Type</option>

              <option value="CREAM">Cream</option>
              <option value="COOKIE">Cookie</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="border-b border-gray-900/10 pb-12">
      <div class="mt-10 space-y-10">
        <fieldset>
          <legend class="text-sm font-semibold leading-6 text-gray-900">ADD ONs</legend>
          <div class="mt-6 space-y-6">
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input id="Knife" name="knife" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                checked={item.add_ons.includes('Knife')}
                onChange={(e) => handleChange(e, 'add_ons')}
                />
              </div>
              <div class="text-sm leading-6">
                <label for="Knife" class="font-medium text-gray-900">Knife</label>
              </div>
            </div>
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input id="Cream" name="cream" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                checked={item.add_ons.includes('Cream')}
                onChange={(e) => handleChange(e, 'add_ons')}
                />
              </div>
              <div class="text-sm leading-6">
                <label for="Cream" class="font-medium text-gray-900">Cream</label>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
        <div class="sm:col-span-4">
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input type="text" name="price" id="price" autocomplete="price" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="400"
              onChange={(e) => handleChange(e, 'price')}
              value={item.price}
              />
            </div>
          </div>
        </div>
          
        </fieldset>
      </div>
    </div>
  </div>

  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    onClick={handleSubmit}
    >Save</button>
  </div>
</form>
        </>
    );
}


export default ItemForm;