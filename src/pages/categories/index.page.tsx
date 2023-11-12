import { ButtonBack, ButtonContainer, Container, Content, ContentContainer, Header, Label } from "./styles";
import Image from "next/image";
import logo from '../../assets/logo.png';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from "../../lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretLeft } from 'phosphor-react';
import { AxiosError } from "axios";
import { useRouter } from "next/router";

const createNewCategory = z.object({
	name: z.string()
});

type CreateNewCategory= z.infer<typeof createNewCategory>

export default function Categories() {
    const router = useRouter();

    function handleBackPage() {
        router.back();
    }

    const { 
		register,
		handleSubmit,
        reset,
		formState: { isSubmitting, errors }
	} = useForm<CreateNewCategory>({
		resolver: zodResolver(createNewCategory)
	});

	async function handleCreateNewCategory(data: CreateNewCategory) {
		try {
            const response = await api.post('/categories/create', {
              name: data.name,
            });
      
            reset();
      
            if (response.status == 201) {
              console.log('categoria cadastrada');
            }
      
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                console.log(err.response.data.message);
            } 
        }
	}

    return (
        <Container>
            <Header>
                <ButtonContainer>
                    <ButtonBack onClick={handleBackPage}><CaretLeft /> <span>Voltar</span></ButtonBack>
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
                        <Label>Nome da Categoria</Label>
                        <input 
                            type="text" 
                            placeholder="Nome da categoria" 
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