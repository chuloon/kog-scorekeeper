import { MatchUp } from "@/classes/MatchUp";
import { Button, Flex, Group, Select, Text, TextInput } from "@mantine/core";
import { createFormActions, useForm } from "@mantine/form"

export function AddNewMatchUp({ handleAddNewMatchUp }: AddNewMatchUpProps) {
    const form = useForm({
        mode: 'uncontrolled',
        name: 'new-match-up-form'
    })

    const addMatchUpClick = (values: any) => {
        const newMatchUp: MatchUp = new MatchUp(values?.pair1, values?.pair2, values?.pair3, values?.pair4, values?.court);
        handleAddNewMatchUp(newMatchUp);
        createFormActions('new-match-up-form').reset();
    }

    return (
        <>
            <form onSubmit={form.onSubmit((values) => addMatchUpClick(values))}>
                <Flex gap={'xs'} mb={'15px'} direction="column">
                    <Group>
                        <TextInput
                            withAsterisk
                            placeholder='Pair 1'
                            key={form.key('pair1')}
                            {...form.getInputProps('pair1')}
                        />
                        <TextInput
                            withAsterisk
                            placeholder='Pair 2'
                            key={form.key('pair2')}
                            {...form.getInputProps('pair2')}
                        />
                    </Group>
                    <Group>
                        <Text>vs</Text>
                    </Group>
                    <Group>
                        <TextInput
                            withAsterisk
                            placeholder='Pair 3'
                            key={form.key('pair3')}
                            {...form.getInputProps('pair3')}
                        />
                        <TextInput
                            withAsterisk
                            placeholder='Pair 4'
                            key={form.key('pair4')}
                            {...form.getInputProps('pair4')}
                        />
                    </Group>
                    <Group>
                        <Select
                            placeholder="Court Number"
                            data={["1", "2", "3", "4"]}
                            key={form.key('court')}
                            {...form.getInputProps('court')}
                        />
                    </Group>
                </Flex>
                <Button type="submit">Add Match Up</Button>
            </form>
        </>
    )
}

interface AddNewMatchUpProps {
    handleAddNewMatchUp: (newMatchUp: MatchUp) => void;
}