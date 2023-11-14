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
import { ThumbsUp, CurrencyDollar } from "phosphor-react";
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoadingContainer } from "../login/styles";
import loading from "../../assets/loading.gif";
import { prisma } from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { Expense, Income } from "@prisma/client";
import { NumberFormat } from "../../utils/numberFormat";

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

  const countTotalNetWorth = () => {
    let totalNetWorth = 0;
    totalNetWorth += countTotalIncomes() - countTotalExpenses();
    return totalNetWorth;
  };

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

          <ButtonSignOut onClick={() => signOut()}>Sair</ButtonSignOut>
        </ButtonHeaderContainer>
      </Header>

      <CardsContainer>
        <Card>
          <div>
            Entradas <ThumbsUp color="#00B37E" size={25} />
          </div>
          <h1>{NumberFormat.format(countTotalIncomes())}</h1>
        </Card>

        <Card>
          <div>
            Saídas <ThumbsUp color="#F75A68" size={25} />
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
