Promise.all([
   d3.csv('datasets/cleaned_states_tran_all.csv')
]).then(ready);

function ready(data){
    let allowhover = true;
    document.addEventListener('mouseover', function(event){
        let name = event.target.getAttribute('data-name');
        if(name != null && allowhover){
            document.getElementById('displayName').innerHTML = "<strong>States: </strong>" + name;
            var result = data[0].filter(obj => {
                return obj["State Name"] === name;
            });
            console.log(result);
        }
    })
    
    document.addEventListener('click', function(event){
        if(event.target.getAttribute('data-name') != null){
            var states = document.querySelectorAll("[id^='state-map']");
                for (var i = 0; i < states.length; i++) {
                    states[i].style.fill = "";
                }
            event.target.style.cssText += 'fill: yellow;';
            document.getElementById('displayName').innerHTML = "<strong>States: </strong>" + event.target.getAttribute('data-name');
            allowhover = false;
        }
    })
};


