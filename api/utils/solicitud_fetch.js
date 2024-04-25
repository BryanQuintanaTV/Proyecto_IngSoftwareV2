// Se encarga de realizar las peticiones fetch de manera sincrona (GET)
const fetchSynchronousGET = async(url, init) =>{
    const response = await fetch(url, init);
    const json = await response.json();
    return await json;
}

// Se encarga de realizar las peticiones fetch de manera sincrona (POST)
const fetchSynchronousPOST = async(url, init) =>{
	    const response = await fetch(url, init);
	    const json = await response.json();
	    return await json;		
} 

// Se encarga de realizar las peticiones fetch de manera sincrona (PUT)
const fetchSynchronousPUT = async(url, init) =>{
    const response = await fetch(url, init);
    const json = await response.json();
    return await json;
} 

// Se encarga de realizar las peticiones fetch de manera sincrona (DELETE)
const fetchSynchronousDELETE = async(url, init) =>{
    const response = await fetch(url, init);
    const json = await response.json();
    return await json;
}