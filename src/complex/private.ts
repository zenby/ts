// ts v.3.8

class Someone {
  #name: string

  constructor(name: string) {
    this.#name = name
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}!`)
  }
}

let jeremy = new Someone('Jeremy Bearimy')

// Property '#name' is not accessible outside class 'Person' because it has a private identifier.
jeremy.#name
