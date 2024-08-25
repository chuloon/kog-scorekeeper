import { Pair } from '@/classes/Pair';
import { Button, Group, Input, TextInput } from '@mantine/core';
import { createFormActions, useForm } from '@mantine/form';

export function AddNewPair({ handleAddNewPair }: AddNewPairProps) {
    const form = useForm({
        mode: 'uncontrolled',
        name: 'new-pair-form'
    })

    const addPairClick = (values: any) => {
        const newPair: Pair = new Pair(values?.player1Name, values?.player2Name)
        handleAddNewPair(newPair);
        createFormActions('new-pair-form').reset();
    }

    return (
        <>
            <form onSubmit={form.onSubmit((values) => addPairClick(values))}>
                <Group gap={'xs'}>
                    <TextInput
                        withAsterisk
                        placeholder='Player 1 name'
                        key={form.key('player1Name')}
                        {...form.getInputProps('player1Name')}
                    />

                    <TextInput
                        withAsterisk
                        placeholder='Player 2 name'
                        key={form.key('player2Name')}
                        {...form.getInputProps('player2Name')}
                    />

                    <Button type="submit">Add Pair</Button>
                </Group>
            </form>
        </>
    )
}

interface AddNewPairProps {
    handleAddNewPair: (newPair: Pair) => void
}