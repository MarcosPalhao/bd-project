import { Container, Form, FormContainer } from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";
import bcrypt from "bcryptjs-react";
import { AxiosError } from "axios";
import { useAlert } from "einer-alerts";
import { useRouter } from "next/router";

const createNewUser = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateNewUser = z.infer<typeof createNewUser>;

export default function Register() {
  const trigger = useAlert();
  const router = useRouter();

  const fireAlert = () => {
    trigger({
      text: "Cadastro realizado com sucesso!",
      title: "Usuário",
      type: "Success",
      duration: 3000,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  async function handleCreateNewUser(data: CreateNewUser) {
    try {
      const hashPassword = await bcrypt.hash(data.password, 12);

      const response = await api.post("/users/create", {
        name: data.name,
        email: data.email,
        password: hashPassword,
      });

      reset();

      if (response.status == 201) {
        fireAlert();
        router.push("/login");
      }
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        console.log(err.response.data.message);
      }
    }
  }

  return (
    <Container>
      <h1>Criar uma conta</h1>

      <FormContainer>
        <Form onSubmit={handleSubmit(handleCreateNewUser)}>
          <div>
            <label>Nome</label>
            <input
              type="text"
              placeholder="Insira seu nome"
              {...register("name")}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Insira seu email"
              {...register("email")}
            />
          </div>

          <div>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Insira sua senha"
              {...register("password")}
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Criar
          </button>
        </Form>
      </FormContainer>
    </Container>
  );
}
