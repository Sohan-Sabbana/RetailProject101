import React, {useState} from 'react'
import { API_URL } from '../../data/apipath';
import { ThreeCircles } from 'react-loader-spinner';


const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState([]);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); 


    const handleCategoryChange = (event)=>{
      const value = event.target.value;
        if(category.includes(value)){
          setCategory(category.filter((item)=> item !== value));
        }else{
          setCategory([...category, value])
        }
  }


  const handleImageUpload =(event)=>{
    const selectedImage = event.target.files[0];
    setImage(selectedImage)
}

  const handleAddProduct = async(e)=>{
      e.preventDefault()
    setLoading(true); 

      try {
        const loginToken = localStorage.getItem('loginToken');
          const firmId = localStorage.getItem('firmId')

          if(!loginToken || !firmId){
              console.error("user not authenticated")
          }
          
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image)
        category.forEach((value)=>{
          formData.append('category', value)
        });
   
          const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
            method:'POST',
            body: formData
          })
            const data = await response.json()

            if(response.ok){
              alert('Product added succesfully')
            }
            setProductName("")
            setPrice("");
            setCategory([])
            setImage(null);
            setDescription("")

      } catch (error) {
          alert('Failed to add Product')
      }finally {
        setLoading(false); 
      }
  }

    return (
    <div className="firmSection">
{loading &&         <div className="loaderSection">
        <ThreeCircles
          visible={loading}
          height={100}
          width={100}
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p>Please wait, your product is being added...</p>
      </div>}
  {!loading && 
    <form className="tableForm" onSubmit={handleAddProduct}>
    <h3>Add Product</h3>
        <label >Product Name</label>
        <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)} /><br/>
        <label >Price</label>
        <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/><br/>
        <div className="checkInp">
     <label >Category</label>
         <div className="inputsContainer">
         <div className="checboxContainer">
                 <label>Clothing</label>
                 <input type="checkbox" value="Clothing" checked ={category.includes('Clothing')}  onChange={handleCategoryChange}/>
               </div>
               <div className="checboxContainer">
                 <label>Electronics</label>
                 <input type="checkbox" value="Electronics" checked ={category.includes('Electronics')} onChange={handleCategoryChange} />
               </div>
               <div className="checboxContainer">
                 <label>Beauty Products</label>
                 <input type="checkbox" value="Beauty Products" checked ={category.includes('Beauty Products')} onChange={handleCategoryChange} />
               </div>
               <div className="checboxContainer">
                 <label>Footwear</label>
                 <input type="checkbox" value="Footwear" checked ={category.includes('Footwear')} onChange={handleCategoryChange} />
               </div>
         </div><br/>

   </div>
       
        <label >Description</label>
        <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} /><br/>
        <label >Firm Image</label>
        <input type="file" onChange={handleImageUpload} />
        <br />
    <div className="btnSubmit">
<button type='submit'>Submit</button>
</div>
   </form>
  }
 </div>
  )
}

export default AddProduct
