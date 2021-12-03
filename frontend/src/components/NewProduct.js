import React, {useState} from "react";
import { useHistory} from "react-router-dom";



const NewProduct = () => {
    const [credentials, setCredentials] = useState({productCondition: "",title:"",description: "", images: []}) 
    let history=useHistory();
    const handleSubmit = async (e) => {
    e.preventDefault();
    const{productCondition,title,description, images} = credentials;
    const response = await fetch("http://localhost:3000/product/newProduct", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productCondition,title,description,images
      })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
        console.log("successfull")
      // Save the auth token and redirect
    //   localStorage.setItem('token', json.token);
    //   history.push("/");


    } else {
      alert("Invalid credentials");
    }
  }

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }
    
    return (
    // <h1>Hello This is the new Product Page</h1>
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div id="dropdown-basic-button" title="Dropdown button">
            {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
        </div>
        <input
            type="text"
            placeholder="name"
        />
    </form>
    )
};
export default NewProduct;