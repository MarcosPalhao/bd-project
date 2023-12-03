import {
  Container,
  Header,
  NewTransactionButton,
  ImageContainer,
  CardsContainer,
  Card,
  TotalCard,
  ListContainer,
  Expense as Expenses,
  Income as Incomes,
  ButtonSignOut,
  ButtonHeaderContainer,
  NewTransactionButtonIncomes,
  NewTransactionButtonCategory,
} from "./styles";
import Image from "next/image";

import logo from "../../assets/logo.png";
import { ThumbsUp, CurrencyDollar, ThumbsDown } from "phosphor-react";
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoadingContainer } from "../login/styles";
import loading from "../../assets/loading.gif";
import { prisma } from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { Expense, Income } from "@prisma/client";
import { NumberFormat } from "../../utils/numberFormat";
import { ModalConfirmation } from "../../components/modalConfirmation";
import { AxiosError } from "axios";
import { api } from "../../lib/axios";
import { useAlert } from "einer-alerts";
import { SignOut } from "phosphor-react";

interface Props {
  incomes: Income[];
  expenses: Expense[];
}

export default function Home({ incomes, expenses }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, []);

  const trigger = useAlert();

  const expenseDeleteFireAlert = () => {
    trigger({
      text: "Deletado com sucesso!",
      title: "Despesa",
      type: "Success",
      duration: 3000,
    });
  };

  const incomeDeleteFireAlert = () => {
    trigger({
      text: "Deletado com sucesso!",
      title: "Receita",
      type: "Success",
      duration: 3000,
    });
  };

  const countTotalIncomes = () => {
    let totalEntries = 0;
    for (let index = 0; index < incomes.length; index++) {
      totalEntries += incomes[index].price;
    }
    return totalEntries;
  };

  const countTotalExpenses = () => {
    let totalExpenses = 0;
    for (let index = 0; index < expenses.length; index++) {
      totalExpenses += expenses[index].price;
    }
    return totalExpenses;
  };

  const countMedia = () => {
    let totalExpenses = 0;
    let media = 0;
    for (let index = 0; index < expenses.length; index++) {
      totalExpenses += expenses[index].price;
    }
    media = totalExpenses / expenses.length;
    console.log(media);
    return media;
  };

  const countMediana = () => {
    let mediana = 0;
    let tamanho = expenses.length;
    let values = [];
    expenses.forEach((element) => {
      values.push(element.price);
    });
    let arraySorted = values.sort();

    if (tamanho % 2 == 0) {
      tamanho = tamanho / 2;
      mediana = (arraySorted[tamanho - 1] + arraySorted[tamanho]) / 2;
    } else {
      tamanho = (tamanho + 1) / 2;
      mediana = arraySorted[tamanho - 1];
    }
    return mediana;
  };

  const adjustArray = () => {
    let values = [];
    expenses.forEach((element) => {
      values.push(element.price);
    });
    console.log(values + "valor array");
    return values;
  };
  console.log(adjustArray());

  function findMode(array) {
    // Verificar se o array está vazio
    if (array.length === 0) {
      return null; // Retorna null se o array estiver vazio
    }
    var contagem = {};
    array.forEach(function (elemento) {
      if (contagem[elemento] === undefined) {
        contagem[elemento] = 1;
      } else {
        contagem[elemento]++;
      }
    });

    var valorMaisRepetido;
    var contagemMaxima = 0;

    for (var elemento in contagem) {
      if (contagem[elemento] > contagemMaxima) {
        contagemMaxima = contagem[elemento];
        valorMaisRepetido = elemento;
      }
    }
    console.log(valorMaisRepetido + "Valor esperado");
    return valorMaisRepetido;
  }
  const countTotalNetWorth = () => {
    let totalNetWorth = 0;
    totalNetWorth += countTotalIncomes() - countTotalExpenses();
    return totalNetWorth;
  };

  async function handleDeleteExpense(expenseId: string) {
    try {
      const response = await api.delete(`/expenses/${expenseId}/delete`);

      await router.reload();

      if (response.status == 200) {
        expenseDeleteFireAlert();
      }
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        throw new Error(err.message);
      }
    }
  }
  async function handleDeleteIncome(incomeId: string) {
    try {
      const response = await api.delete(`/incomes/${incomeId}/delete`);

      await router.reload();

      if (response.status == 200) {
        incomeDeleteFireAlert();
      }
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        throw new Error(err.message);
      }
    }
  }
  if (!session)
    return (
      <LoadingContainer>
        <Image src={loading} height={75} quality={100} alt="Logo" />
      </LoadingContainer>
    );

  return (
    <Container>
      <Header>
        <ImageContainer>
          <Image src={logo} height={75} quality={100} alt="Logo" />
          <h1>DespesaControl</h1>
        </ImageContainer>

        <ButtonHeaderContainer>
          <a href="/expenses">
            <NewTransactionButton>Nova Despesa</NewTransactionButton>
          </a>

          <a href="/incomes">
            <NewTransactionButtonIncomes>
              Nova Receita
            </NewTransactionButtonIncomes>
          </a>

          <a href="/categories">
            <NewTransactionButtonCategory>
              Nova Categoria
            </NewTransactionButtonCategory>
          </a>

          <ButtonSignOut onClick={() => signOut()}>
            <SignOut size={30} />
          </ButtonSignOut>
        </ButtonHeaderContainer>
      </Header>

      <CardsContainer>
        <Card>
          <div>
            Entradas <ThumbsUp color="#00B37E" size={25} />
          </div>
          <h1>{NumberFormat.format(countTotalIncomes())}</h1>
          <h1>{countMedia().toFixed(2)}</h1>
          <h1>{countMediana()}</h1>
          <h1>{findMode(adjustArray())}</h1>
        </Card>

        <Card>
          <div>
            Saídas <ThumbsDown color="#F75A68" size={25} />
          </div>
          <h1>{NumberFormat.format(countTotalExpenses())}</h1>
        </Card>

        <TotalCard>
          <div>
            Total <CurrencyDollar color="#fff" size={25} />
          </div>
          <h1>{NumberFormat.format(countTotalNetWorth())}</h1>
        </TotalCard>
      </CardsContainer>

      <ListContainer>
        {expenses.map((expense) => {
          return (
            <div key={expense.id}>
              <div>
                <h2>{expense.description}</h2>
              </div>
              <div>
                <Expenses>{NumberFormat.format(expense.price)}</Expenses>
              </div>
              <div>
                <p>{expense.category_name}</p>
              </div>
              <div>
                <p>{expense.created_at}</p>
              </div>
              <div>
                <ModalConfirmation
                  deleteFunction={() => handleDeleteExpense(expense.id)}
                />
              </div>
            </div>
          );
        })}

        {incomes.map((incomes) => {
          return (
            <div key={incomes.id}>
              <div>
                <h2>{incomes.description}</h2>
              </div>
              <div>
                <Incomes>{NumberFormat.format(incomes.price)}</Incomes>
              </div>
              <div>
                <p>{incomes.category_name}</p>
              </div>
              <div>
                <p>{incomes.created_at}</p>
              </div>
              <div>
                <ModalConfirmation
                  deleteFunction={() => handleDeleteIncome(incomes.id)}
                />
              </div>
            </div>
          );
        })}
      </ListContainer>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const userExists = await prisma.user.findFirst({
    where: { email: session.user.email },
  });

  const incomes = await prisma.income.findMany({
    where: {
      user_id: userExists?.id,
    },
  });

  const expenses = await prisma.expense.findMany({
    where: {
      user_id: userExists?.id,
    },
  });

  const dataExpenses = expenses.map((expense) => {
    return {
      id: expense.id,
      description: expense.description,
      price: expense.price,
      created_at: expense.created_at,
      category_name: expense.category_name,
    };
  });

  const data = incomes.map((income) => {
    return {
      id: income.id,
      description: income.description,
      price: income.price,
      created_at: income.created_at,
      category_name: income.category_name,
    };
  });
  return {
    props: {
      incomes: data,
      expenses: dataExpenses,
    },
  };
};
