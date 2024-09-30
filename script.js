const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
    button.addEventListener('click', (event) => {

        const buttonValue = event.target.innerText;
        
        if(buttonValue == "AC"){
            document.getElementById("op").innerHTML = "";
            document.getElementById("res").innerHTML = "";
        }

        

    });
});
