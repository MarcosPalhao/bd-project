import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
    min-width: 32rem;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background: #202024;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    form {
        margin-top: 2rem;
        
        display: flex;
        flex-direction: column;
        gap: 1rem;

        input {
            border-radius: 6px;
            border: 0;
            background: #121214;
            color: #7C7C8A;
            padding: 1rem;
        }

        select {
            border-radius: 6px;
            border: 0;
            background: #121214;
            color: #7C7C8A;
            padding: 1rem;
        }

        button[type="submit"] {
            height: 58px;
            border: 0;
            background: #00875F;
            color: #fff;
            font-weight: bold;
            padding: 0 1.25rem;
            border-radius: 6px;
            margin-top: 1.5rem;
            cursor: pointer;
        }
    }
`;

export const CloseButton = styled(Dialog.Close)`
    position: absolute;
    background: transparent;
    border: 0;
    top: 1.5rem;
    right: 1.5rem;
    cursor: pointer;
    color: #7C7C8A;
`;

export const InputError = styled('div')`
    margin-top: 1rem;
    color: #F75A68;
`;