import { styled } from "../../styles";
import * as Dialog from "@radix-ui/react-dialog";

export const Container = styled('div', {
    height: '100vh',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1.5rem 0'
})

export const Header = styled('header', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
})

export const ImageContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',

    h1: {
        fontSize: '1.3rem',
    }
})

export const NewTransactionButton = styled('button', {
    padding: '1rem',
    border: '0',
    borderRadius: '8px',
    fontWeight: '500',
    background: '#F75A68',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer'
})

export const NewTransactionButtonIncomes = styled('button', {
    padding: '1rem',
    border: '0',
    borderRadius: '8px',
    fontWeight: '500',
    background: '#00875F',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer'
})

export const NewTransactionButtonCategory= styled('button', {
    padding: '1rem',
    border: '0',
    borderRadius: '8px',
    fontWeight: '500',
    background: '#323238',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer'
})

export const CardsContainer = styled("div", {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '2rem',
})

export const Card = styled("div", {
    background: '#323238',
    padding: '1.6rem',
    flexBasis: '31%',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',

    div: {
        fontSize: '1.2rem',
        color: '#C4C4CC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export const TotalCard = styled("div", {
    background: '#015F43',
    padding: '1.6rem',
    flexBasis: '31%',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',

    div: {
        fontSize: '1.2rem',
        color: '#C4C4CC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export const ListContainer = styled("div", {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '3rem',
    gap: '0.7rem',

    div: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
        padding: '1.5rem 2rem',
        background: '#29292E',
        borderRadius: '8px',

        div: {
            flexBasis: '25%',
            padding: '0',
        },

        h2: {
            fontSize: '1.1rem',
        }
    }
})

export const Expense = styled("p", {
    color: '#F75A68'
})

export const Income = styled("p", {
    color: '#00B37E'
})

export const ButtonSignOut = styled("button", {
    border: '0',
    background: 'none',
    color: '#fff',
    cursor: 'pointer',
    textDecoration: 'underline',
})

export const ButtonHeaderContainer = styled("div", {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
});