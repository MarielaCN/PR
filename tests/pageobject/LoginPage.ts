import { Locator, Page } from "@playwright/test"

//creo una clase con el mismo nombre del archivo
export class LoginPage{
    checkSuccessfulLogin() {
        throw new Error("Method not implemented.")
    }
    // creo variables de tipo Locator 
    private readonly usernameTexbox: Locator
    private readonly passwordTexbox: Locator
    private readonly loginButton: Locator

    // En el constructor le asigno valores a esas variables (uso los locator de los elementos en la pagina)
    constructor(page:Page){
        this.usernameTexbox = page.getByRole ('textbox', {name:'Username'})
        this.passwordTexbox = page.getByRole ('textbox', {name:'Password'})
        this.loginButton=page.getByRole ('button', {name:'Login'})
    }

     // Creo metodos para interactuar con esos elementos a trav'es de las variables creadas (estos son llamados desde el test)
     // Tambien aprovechamos para sacar el dato hardcode y hacer uso de variables pasadas por parámetro en la función 
    async fillUsername(username:string){
       await this.usernameTexbox.fill(username)
    }

    async fillPassword(pass:string ){
       await this.passwordTexbox.fill(pass)
    }
       
    async clickOnLogin(){
        await this.loginButton.click()
}
    async loginWithCredentials (username:string ,password:string){
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickOnLogin()
    }
}    

