class CustomComponent extends HTMLElement {
  constructor() {
    super()

    // this.attachShadow会自动将生成的shadowDom赋值给this.shadowRoot(仅读)
    // 也可以自定义保存shadowRoot
    // 对shadowDom中的所有节点操作，需要通过attachShadow返回的对象（类似document）
    this.root = this.attachShadow({ mode: 'open' })

    this.style()
    this.render()
  }

  style() {
    const style = document.createElement('style')
    style.textContent = `
      .title {
        color: red;
        font-size: 20px;
      }
    `

    this.root.appendChild(style)
  }

  render() {
    const template = document.createElement('template')
    template.innerHTML = `<div class="title" id="c1">Hello</div>`

    this.root.appendChild(template.content)
  }
}

customElements.define('c-c', CustomComponent)
