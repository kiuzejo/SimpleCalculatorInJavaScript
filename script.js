
const estadoCalculadora = {
    caracteres: []
};


function insert(caracter){
    estadoCalculadora.caracteres.push(caracter);
    display();
}

function delete_caracter(){
    estadoCalculadora.caracteres.pop();
    display();
}

function delete_all(){
    estadoCalculadora.caracteres.length = 0;
    display();
}


function calcularResultado() {
    // 1. Juntamos o array em uma única string (ex: "2,5+3*4")
    let expressao = estadoCalculadora.caracteres.join('');

    // Se não houver nada para calcular, saímos da função para evitar erros
    if (expressao === '') {
        return; 
    }

    // 2. TRADUÇÃO: Trocamos todas as vírgulas por pontos (ex: "2.5+3*4")
    // Usamos replaceAll para garantir que todas as vírgulas mudem, caso haja mais de um número
    let expressaoParaCalculo = expressao
    .replaceAll(',', '.')
    .replaceAll('×','*')
    .replaceAll('÷','/');


    try {
        // 3. O CÁLCULO: A função mágica 'eval' lê a string e resolve a matemática dela
        let resultado = eval(expressaoParaCalculo);

        // 4. TRADUÇÃO DE VOLTA: Transformamos o resultado em texto e voltamos o ponto para vírgula
        let resultadoFormatado = String(resultado).replace('.', ',');

        // 5. Atualizamos o "cérebro" (array) com o novo resultado
        // O método .split('') quebra a string "14,5" de volta em um array: ['1', '4', ',', '5']
        estadoCalculadora.caracteres = resultadoFormatado.split('');

        // 6. Atualizamos o monitor para mostrar o resultado final
        display();

    } catch (erro) {
        // O bloco 'catch' captura erros matemáticos (ex: se o usuário digitar "5++5" ou "2*/3")
        // Sem isso, a calculadora travaria completamente.
        estadoCalculadora.caracteres = ['E', 'r', 'r', 'o'];
        display();
        
        // (Opcional) Limpa a tela de erro automaticamente após 1.5 segundos
        setTimeout(() => {
            estadoCalculadora.caracteres.length = 0;
            display();
        }, 1500);
    }
}


function display(){
    let textoParaMostrar = estadoCalculadora.caracteres.join('');
    if(textoParaMostrar === ''){
        textoParaMostrar = 0;
    }
    document.getElementById("tela").textContent = textoParaMostrar;
}

document.addEventListener('DOMContentLoaded', () => {
    display();
});


