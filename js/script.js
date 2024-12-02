let imgURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/AJAX_logo_by_gengns.svg/1200px-AJAX_logo_by_gengns.svg.png";
let baseURL = "https://test-node-server-n86p3o8hk-pffranco.vercel.app"
let content = document.getElementById("container");
let btnImg = document.getElementById("btnImg");
let btnJson = document.getElementById("btnJson");

const createImgFromBlob = blob => {
    const img = new Image();  

    img.src = URL.createObjectURL(blob);

    return img;
} 
    
const addToContent = element => {
    content.appendChild(element);
}

const addTextToContent = text => {
    content.innerHTML = text;
}

const post = (url, body, headers = {}) => fetch(url, {method: 'POST', body, headers})

btnImg.addEventListener("click", function (){
    fetch(imgURL)
        .then(response => response.blob())        
        .then(createImgFromBlob)      
        .then(addToContent)
})

btnJson.addEventListener("click", function (){
    const body = JSON.stringify({fruits: "[Mango, Orange, Strawberries]", extras: "[Milk]" });

    post(`${baseURL}/save-json`, body, {'Content-Type': 'application/json'})        
    .then(e=>e.json())    
    .then(({fruits}) => fruits)        
    .then(addTextToContent)   

})