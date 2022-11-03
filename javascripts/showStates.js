document.addEventListener('click', function(event){
    let name = event.target.getAttribute('data-name');
    if(name != null){
        document.getElementById('displayName').innerHTML = "<strong>States: </strong>" + name;
    }
    console.log(name);
})