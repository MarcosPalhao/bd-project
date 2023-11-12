import { Container, Header, NewTransactionButton, ImageContainer, CardsContainer, Card, TotalCard, ListContainer, Expense, Income, ButtonSignOut, ButtonHeaderContainer, NewTransactionButtonIncomes, NewTransactionButtonCategory } from "./styles";
import Image from "next/image";

import logo from '../../assets/logo.png';
import { ThumbsUp, CurrencyDollar } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../../components/NewTransactionModal";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoadingContainer } from "../login/styles";
import loading from '../../assets/loading.gif';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push("/login")
    }
  }, [])
  
  if (!session) 
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
      <Header>
        <ImageContainer>
          <Image 
            src={logo}
            height={75}
            quality={100} 
            alt="Logo" 
          />
          <h1>DespesaControl</h1>
        </ImageContainer>

        <ButtonHeaderContainer>
          <a href="/expenses">
            <NewTransactionButton>Nova Despesa</NewTransactionButton>
          </a>

          <a href="/incomes">
            <NewTransactionButtonIncomes>Nova Receita</NewTransactionButtonIncomes>
          </a>

          <a href="/categories">
            <NewTransactionButtonCategory>Nova Categoria</NewTransactionButtonCategory>
          </a>

          {/* <ButtonSignOut onClick={() => signOut()}>Sair</ButtonSignOut> */}
        </ButtonHeaderContainer>
      </Header>

      <CardsContainer>
        <Card>
          <div>Entradas <ThumbsUp color="#00B37E" size={25} /></div>
          <h1>R$ 17.758,00</h1>
        </Card>

        <Card>
          <div>Saídas <ThumbsUp color="#F75A68" size={25} /></div>
          <h1>R$ 5.758,00</h1>
        </Card>

        <TotalCard>
          <div>Total <CurrencyDollar color="#fff" size={25} /></div>
          <h1>R$ 5.758,00</h1>
        </TotalCard>
      </CardsContainer>

      <ListContainer>
        <div>
          <h2>Desenvolvimento de software</h2>
          <Expense>12.000</Expense>
          <p>Educação</p>
          <p>26/10/2023</p>
        </div>

        <div>
          <h2>Desenvolvimento de software</h2>
          <Income>12.000</Income>
          <p>Educação</p>
          <p>26/10/2023</p>
        </div>
      </ListContainer>
    </Container>
  )
}