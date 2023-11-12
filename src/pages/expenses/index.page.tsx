import { ButtonBack, ButtonContainer, Container, Content, ContentContainer, Header } from "./styles";
import logo from '../../assets/logo.png';
import { GetServerSideProps } from "next";
import { CaretLeft } from 'phosphor-react';
import Image from "next/image";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { prisma } from "../../lib/prisma";
import { Category } from "@prisma/client";

interface CategoriesProps {
    categories: Category[]
}

const createNewExpense = z.object({
	description: z.string(),
	price: z.number(),
	type_transaction: z.string(),
	category_id: z.string()
});

type CreateNewExpense= z.infer<typeof createNewExpense>

export default function Expenses({categories}: CategoriesProps) {
    console.log(categories);

    const { 
		register,
		handleSubmit,
		formState: { isSubmitting, errors }
	} = useForm<CreateNewExpense>({
		resolver: zodResolver(createNewExpense)
	});

	async function handleCreateNewExpense(data: CreateNewExpense) {
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
                    <form onSubmit={handleSubmit(handleCreateNewExpense)}>
                        <input 
                            type="text" 
                            placeholder="Descrição" 
                            required 
                            {...register('description')}
                        />
                        <input 
                            type="number" 
                            placeholder="Preço" 
                            required 
                            {...register('price')}
                        />

                        <select {...register('type_transaction')}>
                            <option selected value="" disabled>Selecione o tipo da transação</option>
                        </select>

                        <select {...register('category_id')}>
                            <option selected value="" disabled>Selecione uma categoria</option>
                        </select>

                        <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                    </form>
                </Content>
            </ContentContainer>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const categories = await prisma.category.findMany();

    const data = categories.map(category => {
        return {
            id: category.id,
            name: category.name,
        }
    })

    return {
        props: {
            categories: data
        }
    }
}