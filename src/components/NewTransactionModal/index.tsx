import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { CloseButton, Content, InputError, Overlay } from "./styles";

const createNewTransaction = z.object({
	description: z.string(),
	price: z.number(),
	type_transaction: z.string(),
	category_id: z.string()
});

type CreateNewTransaction = z.infer<typeof createNewTransaction>

export function NewTransactionModal() {
	const { 
		register,
		handleSubmit,
		formState: { isSubmitting, errors }
	} = useForm<CreateNewTransaction>({
		resolver: zodResolver(createNewTransaction)
	});

	async function handleCreateNewTransaction(data: CreateNewTransaction) {
		console.log(data);
	}

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
              <Dialog.Title>Nova Transação</Dialog.Title>

				<CloseButton>
					<X size={24} />
				</CloseButton>

				<form onSubmit={handleSubmit(handleCreateNewTransaction)}>
					<input 
						type="text" 
						placeholder="Descrição" 
						required 
						{...register('description')}
					/>
					{errors.description && <InputError>{errors.description.message}</InputError>}
					<input 
						type="number" 
						placeholder="Preço" 
						required 
						{...register('price')}
					/>
					{errors.price && <InputError>{errors.price.message}</InputError>}

					<select {...register('type_transaction')}>
						<option selected value="" disabled>Selecione o tipo da transação</option>
					</select>
					{errors.type_transaction && <InputError>{errors.type_transaction.message}</InputError>}

					<select {...register('category_id')}>
						<option selected value="" disabled>Selecione uma categoria</option>
					</select>
					{errors.category_id && <InputError>{errors.category_id.message}</InputError>}

					<button type="submit" disabled={isSubmitting}>Cadastrar</button>
				</form>

            </Content>
        </Dialog.Portal>
    )
}