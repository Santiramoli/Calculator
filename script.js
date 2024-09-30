const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Obtenemos el texto del botón presionado
        const buttonValue = event.target.innerText;
        
        // Mostramos el valor del botón en la consola
        console.log('Botón presionado:', buttonValue);
        
        if(buttonValue == "AC"){
            document.getElementById("op").innerHTML = "";
            document.getElementById("res").innerHTML = "";
        }
        // Aquí puedes agregar lógica adicional para manejar las operaciones de la calculadora
    });
});
