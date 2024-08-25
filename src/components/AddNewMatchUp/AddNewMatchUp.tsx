import { Button, Flex, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form"

export function AddNewMatchUp() {
    const form = useForm({
        mode: 'uncontrolled',
        name: 'new-match-up-form'
    })

    const addMatchUpClick = (values: any) => {
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
                        <TextInput
                            withAsterisk
                            placeholder="Court"
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