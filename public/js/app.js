const timeform = document.querySelector('form')
const search = document.querySelector('input')
const msgone = document.querySelector('#msg1')
const msgtwo = document.querySelector('#msg2')

timeform.addEventListener('submit',(e)=>{
    e.preventDefault()
    msgone.textContent =''
    msgtwo.textContent =''   
    
    const location = search.value
    msgone.textContent = "Loading..."
    fetch('/timezone?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                msgone.textContent = data.error
            }
            else
            {
                msgone.textContent = data.Location,
                msgtwo.textContent = data.DateTime
            }
        })
    })
})