import {
    ButtonBack,
    ButtonContainer,
    Container,
    Content,
    ContentContainer,
    Header,
  } from "./styles";
  import logo from "../../assets/logo.png";
  import { GetServerSideProps } from "next";
  import { CaretLeft } from "phosphor-react";
  import Image from "next/image";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { prisma } from "../../lib/prisma";
  import { Category } from "@prisma/client";
  import { useRouter } from "next/router";
  import { api } from "../../lib/axios";
  import { AxiosError } from "axios";
  import { useSession } from "next-auth/react";
  import { useAlert } from "einer-alerts";
  
  interface CategoriesProps {
    categories: Category[];
  }
  
  const numberSchema = z.preprocess(Number, z.number()); // converts string -> number and validates
  
  const createNewIncome = z.object({
    description: z.string(),
    price: numberSchema,
    category_id: z.string(),
  });
  
  type CreateNewIncome = z.infer<typeof createNewIncome>;
  
  export default function Expenses({ categories }: CategoriesProps) {
    const router = useRouter();
  
    const trigger = useAlert();
  
    const fireAlert = () => {
      trigger({
        text: "Cadastro realizado com sucesso!",
        title: "Despesa",
        type: "Success",
        duration: 3000,
      });
    };
  
    function handleBackPage() {
      router.back();
    }
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting, errors },
    } = useForm<CreateNewIncome>({
      resolver: zodResolver(createNewIncome),
    });
  
    async function handleCreateNewExpense(data: CreateNewIncome) {
      try {
        const response = await api.post("/incomes/create", {
          description: data.description,
          price: data.price,
          category_id: data.category_id,
        });
  
        reset();
  
        if (response.status == 201) {
          fireAlert();
        }
      } catch (err) {
        console.log(err);
        if (err instanceof AxiosError && err?.response?.data?.message) {
          console.log(err.response.data.message);
        }
      }
    }
  
    return (
      <Container>
        <Header>
          <ButtonContainer>
            <ButtonBack onClick={handleBackPage}>
              <CaretLeft /> <span>Voltar</span>
            </ButtonBack>
          </ButtonContainer>
  
          <Image src={logo} height={75} quality={100} alt="Logo" />
          <h1>DespesaControl</h1>
        </Header>
  
        <ContentContainer>
          <Content>
            <form onSubmit={handleSubmit(handleCreateNewExpense)}>
              <input
                type="text"
                placeholder="Descrição"
                required
                {...register("description")}
              />
  
              <input
                type="number"
                placeholder="Preço"
                required
                {...register("price")}
              />
  
              <select {...register("category_id")}>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>

              
  
              <button type="submit">Cadastrar</button>
            </form>
          </Content>
        </ContentContainer>
      </Container>
    );
  }
  
  export const getServerSideProps: GetServerSideProps = async () => {
    const categories = await prisma.category.findMany();
  
    const data = categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
      };
    });
  
    return {
      props: {
        categories: data,
      },
    };
  };
  