// selecionando todos os elementos necessários
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; // esta é uma variável global e vamos usá-la dentro de várias funções

button.onclick = ()=>{
  input.click(); // se o usuário clicar no botão, a entrada também clicou
}

input.addEventListener("change", function(){
  // obtendo o arquivo de seleção do usuário e [0] isso significa que se o usuário selecionar vários arquivos, selecionaremos apenas o primeiro
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


// Se o usuário arrastar arquivo sobre DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); // impedindo o comportamento padrão
  dropArea.classList.add("active");
  dragText.textContent = "ReleasePara Fazer Upload de Arquivo";
});

// Se o usuário sair do arquivo arrastado de DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop Para Fazer Upload de Arquivo";
});

// Se o usuário soltar o arquivo no DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); // impedindo o comportamento padrão
  // obtendo o arquivo de seleção do usuário e [0] isso significa que se o usuário selecionar vários arquivos, selecionaremos apenas o primeiro
  file = event.dataTransfer.files[0];
  showFile(); // chamando a função
});

function showFile(){
  let fileType = file.type; // obtendo o tipo de arquivo selecionado
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; // adicionando algumas extensões de imagem válidas na matriz
  if(validExtensions.includes(fileType)){ // se o arquivo selecionado pelo usuário for um arquivo de imagem
    let fileReader = new FileReader();// criando novo objeto FileReader
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; // passando a fonte do arquivo do usuário na variável fileURL
      let imgTag = `<img src="${fileURL}" alt="">`; // criando uma tag img e passando a fonte do arquivo selecionado pelo usuário dentro do atributo src
      dropArea.innerHTML = imgTag; // adicionando a tag img criada dentro do contêiner dropArea
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop Para Fazer Upload de Arquivo";
  }
}
