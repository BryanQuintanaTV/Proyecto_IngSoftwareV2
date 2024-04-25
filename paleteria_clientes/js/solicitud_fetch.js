const fetchSynchronousGET = async(url, init) =>{
    const response = await fetch(url, init);
    const json = await response.json();
    return await json;
}


const fetchSynchronousPOST = async(url, init) =>{
	    const response = await fetch(url, init);
	    const json = await response.json();
	    return await json;		
} 

const fetchSynchronousPUT = async(url, init) =>{
    const response = await fetch(url, init);
    const json = await response.json();
    return await json;
} 

const fetchSynchronousDELETE = async(url, init) =>{
    const response = await fetch(url, init);
    const json = await response.json();
    return await json;
}