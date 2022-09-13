import './style.css'
import setup from './cart'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <div id="cart"></div>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setup(document.querySelector<HTMLDivElement>('#cart')!)
