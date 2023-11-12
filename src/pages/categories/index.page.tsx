import { ButtonBack, ButtonContainer, Container, Content, ContentContainer, Header } from "./styles";
import Image from "next/image";
import logo from '../../assets/logo.png';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretLeft } from 'phosphor-react';

const createNewCategory = z.object({
	name: z.string()
});

type CreateNewCategory= z.infer<typeof createNewCategory>

export default function Categories() {
    const { 
		register,
		handleSubmit,
		formState: { isSubmitting, errors }
	} = useForm<CreateNewCategory>({
		resolver: zodResolver(createNewCategory)
	});

	async function handleCreateNewCategory(data: CreateNewCategory) {
		console.log(data);
	}

    return (
        <Container>
            <Header>
                <ButtonContainer>
                    <ButtonBack><CaretLeft /> <span>Voltar</span></ButtonBack>
                </ButtonContainer>

                <Image 
                    src={logo}
                    height={75}
                    quality={100} 
                    alt="Logo" 
                />
                <h1>DespesaControl</h1>
            </Header>


            <ContentContainer>
                <Content>
                    <form onSubmit={handleSubmit(handleCreateNewCategory)}>
                        <input 
                            type="text" 
                            placeholder="Descrição" 
                            required 
                            {...register('name')}
                        />

                        <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                    </form>
                </Content>
            </ContentContainer>
        </Container>
    )
}