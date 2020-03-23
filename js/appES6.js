// Clases-----------------------------------------------------------------------
// Cotizador Constructor

class Seguro {
    constructor(marca, anio, tipo) {
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }
    cotizarSeguro() {
        /*
            1 = americano 1.15
            2 = asiatico 1.05
            3 = europeo 1.35
        */
        const base = 2000;
        let cantidad;

        switch (this.marca) {
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;
        }
        // leer el año
        const diferencia = new Date().getFullYear() - this.anio;
        // cada año de difeenia se debe reducir un 3% el valor del seguro
        cantidad -= (diferencia * 3) * cantidad / 100;

        /*
            Si el seguro es basico es 30% mas
            si el seguro es completo es 50% mas
        */
        if (this.tipo === 'basico') {
            cantidad *= 1.3;
        } else {
            cantidad *= 1.5;
        }
        cantidad = Math.round(cantidad)
        return cantidad;

    };
}

// interfaz todo lo que se muestra
class Interfaz {

    //mensaje que se muestra en el html
    mostrarMensaje(mensaje, tipo) {
            const div = document.createElement('div');

            if (tipo === 'error') {
                div.classList.add('mensaje', 'error');
            } else {
                div.classList.add('mensaje', 'correcto');
            }
            div.innerHTML = `${mensaje}`;
            formulario.insertBefore(div, document.querySelector('.form-group'));

            setTimeout(function() {
                document.querySelector('.mensaje').remove();
            }, 2000);
        }
        //Imprime el resuldao de la cotizxacion en el DOM
    mostrarResultado(seguro, total) {
        const resultado = document.getElementById('resultado');

        let marca;

        switch (seguro.marca) {
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
        }
        //crear div
        const div = document.createElement('div');
        // insertar informacion
        div.innerHTML = `
            <p class='header'>Tu resumen:</p>
            <p>Marca: ${marca}</p>
            <p>Año: ${seguro.anio}</p>
            <p>Tipo: ${seguro.tipo}</p>
            <p>Total: $${total}</p>
        `;
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function() {
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 2000);

    };
}


// Event Listeners---------------------------------------------------------------------------------------
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    // Leer marca seleccionada
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    // leer año seleccionado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;


    //lee el valor del radio buton 
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //crear instancia de interfaz
    const interfaz = new Interfaz();

    //verificar campos que no esten vacios
    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {
        //imprimir un error
        interfaz.mostrarMensaje('Faltan Datos, revizar que los campo esten llenos', 'error');

    } else {
        //Limpioar resuldos anteriores
        const resultados = document.querySelector('#resultado div');
        if (resultados != null) {
            resultados.remove();
        }
        //Instanciar Seguro
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);

        const cantidad = seguro.cotizarSeguro(seguro);
        //Mostart el resultao
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando...', 'exito');
    }
});

const max = new Date().getFullYear(),
    min = max - 20,
    selecYear = document.getElementById('anio');

for (let i = max; i >= min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selecYear.appendChild(option);
}