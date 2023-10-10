import { styled } from "../../styles";

export const Container = styled('div', {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#121214',
    gap: '1.5rem'
})

export const FormContainer = styled('div', {
    border: '2px solid #323238',
    borderRadius: '9px',
    background: '#202024',
    width: '40%',
    maxWidth: '40%',
    padding: '2rem'
})

export const Form = styled('form', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',

    div: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',

        label: {
            color: 'white',
            fontSize: '1.1rem'        
        },

        input: {
            background: '#121214',
            border: '0',
            padding: '1rem',
            outline: 'none',
            color: '#fefefe',
            fontSize: '1rem',
            borderRadius: '9px',
        }
    },

    button: {
        padding: '0.9rem',
        borderRadius: '9px',
        background: '#00875F',
        border: 'none',
        color: 'white',
        fontSize: '1rem',
        fontWeight: '500',
        cursor: 'pointer',
    }
})