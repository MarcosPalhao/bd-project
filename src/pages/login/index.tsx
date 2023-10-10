import { Container, Form, FormContainer } from "./styles";

export default function Login() {
  return (
    <Container>
      <h1>Bem-vindo</h1>

      <FormContainer>
        <Form>
          <div>
            <label>Email</label>
            <input type="email" placeholder="Insira seu email" />
          </div>

          <div>
            <label>Senha</label>
            <input type="password" placeholder="Insira sua senha" />
          </div>

          <button>Entrar</button>
        </Form>
      </FormContainer>
    </Container>
  )
}
