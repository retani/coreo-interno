export default {
  "key": "Welcome",
  "value": `
<p class="sup">
  conjuro de proxémica virtual
</p>

<h1>
  grillo_conejo_salvia
</h1>

<p>
  Antes de continuar verifica
</p>
<ol>
  <li>
  Estar viendo esto en tu compu y tener tu teléfono a la mano
  </li>
  <li>
  Usar Firefox fox o Chrome en ambos dispositivos (NO uses Safari)
  </li>
  <li>
  Contar con lector de código QR en tu teléfono
  </li>
  <li>
  Saber poner tu teléfono en rotación horizontal 
  </li>
  <li>
  Estar en un lugar tranquilo, donde puedas sentarte frente a tu computadora a realizar este trabajo
  </li>
</ol>

<p class="button">
  <button on:click={next}>COMENZAR</button>
</p>

<style>
  .sup, h1, h2, .button {
    text-align: center;
  }
  button {
    border-radius: 1ex;
    cursor: pointer;
  }
</style>

<script>
  export let next = () => {}

  export let texts = []

  const headline1 = texts.find(text => text.key === 'headline1').value
  const headline2 = texts.find(text => text.key === 'headline2').value
  
</script>

`};