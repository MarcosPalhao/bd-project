import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Container, Form, FormContainer, LoadingContainer, RegisterContainer } from "./styles";
import bcrypt from "bcryptjs-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import loading from '../../assets/loading.gif';

const loginUser = z.object({
  email: z.string().email(),
  password: z.string()
});

type LoginUser = z.infer<typeof loginUser>;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default function Login({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { 
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm();

  async function handleLogin(data: LoginUser) {
    console.log("info:", data)
    signIn("credentials", data)
  }

  const { data: session, status } = useSession()
  console.log(session);
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push("/")
    }
  }, [session])

  if (status == "loading" || session) 
    return <LoadingContainer>
      <Image 
        src={loading} 
        height={75}
        quality={100} 
        alt="Logo"  
      /> 
    </LoadingContainer>
  
  return (
    <Container>
      <h1>Entrar</h1>
      <FormContainer>
        <Form onSubmit={handleSubmit(handleLogin)}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          
          <div>
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              id="email"
              placeholder="Insira seu email" 
              {...register('email')}
            />
          </div>
      
          <div>
            <label>Senha</label>
            <input 
              type="password"
              name="password"
              id="password"
              placeholder="Insira sua senha" 
              {...register('password')}
            />
          </div>
          

          <button type="submit">Entrar</button>
        </Form>
      </FormContainer>
      <RegisterContainer>
        <a href="/register">Criar uma conta</a>
      </RegisterContainer>
    </Container>
  )
}
