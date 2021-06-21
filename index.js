//Array vacio para el listado 
let myLeads = []
//Tomamos los elementos del html
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
//Tomamos elementos "stringifeados" del almacenaje local y los volvemos elementos de array
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

//Si hay valores en el almacenaje local se renderizan
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

//Boton de guardar pestaña 
tabBtn.addEventListener("click", function(){ 
    /*Metodo de chrome para habilitar el guardado de la pestaña activa y actual */   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        //pusheamos las pestañas al array
        myLeads.push(tabs[0].url)
        //llevamos el elemento en la variable al almacena local "stringifeada"
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

/*Renderizado de los elementos dentro de la lista no enumerada
se va pasando por los elementos y se los agrega a la lista
en formato url*/

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
//Boton de borrado, limpia el almacenaje local del navegador con dbclick
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

//Guarda valor del imput en la lista
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})