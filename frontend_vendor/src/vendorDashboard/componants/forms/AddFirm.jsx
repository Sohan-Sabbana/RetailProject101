import React,{useState} from 'react'
import { API_URL } from '../../data/apipath';

const AddFirm=()=> {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleImageUpload = (e)=>{
const image = e.target.files[0];
setFile(image);
  }

  const handleCategoryChange=(e)=>{
    const value=e.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value));
    }else{
      setCategory([...category,value]);
    }
  }

  const handleFirmSubmit = async(e)=>{
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if(!loginToken){
        console.log("User not authenticated");
      }
      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append('offer',offer);
      formData.append('file',file);
      category.forEach((value)=>{
        formData.append('category',value);
      });  
     const response = await fetch(`${API_URL}/firm/add-firm`,{
      method:'POST',
      headers:{
        'token':`${loginToken}`
      },
      body: formData

     });
     const data = await response.json();
     if(response.ok){
      console.log(data);
      setFirmName("");
      setArea("")
      setCategory([]);
      setOffer("");
      setFile(null)
      alert("firm added successfully");

     }
     else if(data.message==="vendor can have only one firm"){
      alert("vendor can have only one firm");
     }else{
      alert("Failed to add firm");
     }
     const firmId = data.firmId;
     const vendorShop = data.vendorFirmName

     localStorage.setItem('firmId', firmId);

    } catch (error) {
      console.log("Failed ",error);
      
    }
  }


  return (
    <div className='firmSection'>
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
        <label htmlFor="">Firm Name</label>
        <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)} /><br />
        <label htmlFor="">Area</label>
        <input type="text" name='area' value={area} onChange={(e)=>setArea(e.target.value)}/><br />
        {/* <label htmlFor="">Category</label>
        <input type="text" /><br /> */}
        <div className="checkInp">
            <label htmlFor="">Category :</label>
           <div className="inputsContainer">
           <div className="checkboxContainer">
                <label htmlFor="">Clothing</label>
                <input type="checkbox" value="Clothing" checked={category.includes('Clothing')}  onChange={handleCategoryChange}/>
          
            </div>
            <div className="checkboxContainer">
            <label htmlFor="">Electronics</label>
            <input type="checkbox" value="Electronics" checked={category.includes('Electronics')} onChange={handleCategoryChange} />
            </div>
            <div className="checkboxContainer">
            <label htmlFor="">Beauty Products</label>
            <input type="checkbox" value="Beauty Products" checked={category.includes('Beauty Products')} onChange={handleCategoryChange} />
            </div>
            <div className="checkboxContainer">
            <label htmlFor="">Footwear</label>
            <input type="checkbox" value="Footwear" checked={category.includes('Footwear')} onChange={handleCategoryChange} />
            </div>
           </div>
        </div>
                   
        <label htmlFor="">Offer</label>
        <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/><br />
        <label htmlFor="">Firm Image</label>
        <input type="file" onChange={handleImageUpload}/><br />

        <div className="btnSubmit">
        <button type= 'submit'>Submit</button>
    </div>
      </form>
    </div>
  )
}

export default AddFirm
