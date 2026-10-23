import { login } from "./login"

describe('login', () => {

    const mockEmail = 'nath@dio.bank'
    const mockSenha = '123456'

    it('Deve exibir um alert com boas vindas caso o email e senha sejam válidos', async() => {
        const response = await login(mockEmail, mockSenha)
        expect(response).toBeTruthy()
    })

    it('Deve exibir um erro caso o email seja inválido', async() => {
        const response = await login('email@invalido.com', mockSenha)
        expect(response).toBeFalsy()
    })

	it('Deve exibir um erro caso a senha seja inválida', async() => {
		const response = await login(mockEmail, 'senha invalida')
        expect(response).toBeFalsy()
	})
})