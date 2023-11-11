import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Container, Form, FormContainer, RegisterContainer } from "./styles";
import bcrypt from "bcryptjs-react";
import { api } from "../../lib/axios";

const loginUser = z.object({
  email: z.string().email(),
  password: z.string()
});

type LoginUser = z.infer<typeof loginUser>;

export default function Login() {
  const { 
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm();

  async function handleLogin(data: LoginUser) {
    const hashPassword = await bcrypt.hash(data.password, 12);
    data.password = hashPassword;
    
    const response = await api.post('/users/find', {
      email: data.email,
      password: hashPassword
    });

    console.log(response);
  }

  return (
    <Container>
      <h1>Bem-vindo</h1>

      <FormContainer>
        <Form onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Insira seu email" 
              {...register('email')}
            />
          </div>

          <div>
            <label>Senha</label>
            <input 
              type="password" 
              placeholder="Insira sua senha" 
              {...register('password')}
            />
          </div>

          <button type="submit" disabled={isSubmitting}>Entrar</button>

          <RegisterContainer>
            <a href="/register">Criar uma conta</a>
          </RegisterContainer>
        </Form>
      </FormContainer>
    </Container>
  )
}
