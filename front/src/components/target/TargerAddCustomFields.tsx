import {
    Avatar,
    Button,
    Center, Checkbox,
    CloseButton, createStyles,
    Divider, NumberInput,
    Popover, Select,
    Stack,
    Text,
    TextInput,
    UnstyledButton
} from "@mantine/core";
import {useState} from "react";
import {BsChevronCompactLeft} from "react-icons/bs";
import {FiLayers} from "react-icons/fi";
import {BiPlus} from "react-icons/bi";

const useStyles = createStyles(theme => ({
    members: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    field: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: 4,
        borderRadius: 4,
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[2],
        },
    },

    close: {
        position: 'absolute',
        right: 14,
        top: 14,
    },
}));




export default function TargetAddCustomFields() {
    const {classes} = useStyles()
    const [opened, setOpened] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [customFields, setCustomFields] = useState<string[]>(['asdasd'])
    const [fieldName, setFieldName] = useState<string>('')
    const [fieldValue, setFieldValue] = useState<string>('')
    const [fieldType, setFieldType] = useState<string>('')

    const onCreateField = (name, value, type) => {
        //TODO отправить поле на бэк
        setCustomFields(prev => [...prev, name])
    }

    const fieldTypes = [
        {
            value: 'checkbox',
            label: 'Галочка',
            element: <TextInput
                value={fieldValue}
                onChange={e => setFieldValue(e.currentTarget.value)}
                label='Значение поля'
                placeholder='Введите значение поля'
            />
        },
        {
            value: 'select',
            label: 'Выпадающий список',
            element: <TextInput
                value={fieldValue}
                onChange={e => setFieldValue(e.currentTarget.value)}
                label='Значение поля'
                placeholder='Введите значение поля'
            />
        },
        {
            value: 'text',
            label: 'Текст',
            element: <TextInput
                value={fieldValue}
                onChange={e => setFieldValue(e.currentTarget.value)}
                label='Значение поля'
                placeholder='Введите значение поля'
            />
        },
        {
            value: 'number',
            label: 'Число',
            element: <TextInput
                value={fieldValue}
                onChange={e => setFieldValue(e.currentTarget.value)}
                label='Значение поля'
                placeholder='Введите значение поля'
            />
        }
    ]

    return <Popover
        width={300}
        trapFocus
        position="bottom-end"
        shadow="md"
        opened={opened}
        onChange={setOpened}
    >
        <Popover.Target>
            <Button
                variant="light"
                color="gray"
                leftIcon={<FiLayers/>}
                styles={{inner: {justifyContent: 'flex-start'}}}
                onClick={() => setOpened(o => !o)}
            >
                Поля пользователя
            </Button>
        </Popover.Target>
        <Popover.Dropdown
            p="xs"
            sx={theme => ({
                background:
                    theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            })}
        >
            <Stack>
            <UnstyledButton
                onClick={() => setIsEditing(false)}
            >
                <BsChevronCompactLeft size="1.05rem"  />
            </UnstyledButton>
            <Center>
                <Text>Поля пользователя</Text>
            </Center>
            <CloseButton
                className={classes.close}
                onClick={() => setOpened(false)}
            />
            {isEditing ? (
                    <>
                        <TextInput
                            value={fieldName}
                            onChange={(e) => setFieldName(e.currentTarget.value)}
                            placeholder='Введите название поля'
                            label='Название поля'
                        />
                        <Select
                            onChange={(value) => {
                                console.log(value)
                                setFieldType(value)
                            }}
                            data={fieldTypes}
                            placeholder='Выберите тип поля'
                            label='Тип поля'
                        />
                        {

                        }
                        <Button
                            leftIcon={<BiPlus/>}
                            onClick={() => {
                                setIsEditing(false)
                                onCreateField(fieldName, fieldValue, fieldType)
                            }}
                        >
                            Добавить поле
                        </Button>
                    </>

            ) : (
                <>
                    <Divider my={8}/>
                    <Stack className={classes.members}>
                        {customFields.map((field) => {
                                return (
                                    <UnstyledButton className={classes.field} key={field}>
                                        <Avatar color="blue" variant="filled" size={32} radius="xl">
                                            MK
                                        </Avatar>
                                        <Text size="sm">Поле {field}</Text>
                                    </UnstyledButton>
                                )
                            }
                        )}
                    </Stack>
                    <Divider my={8}/>
                    <Button
                        leftIcon={<BiPlus/>}
                        onClick={() => setIsEditing(true)}
                    >
                        Добавить поле
                    </Button>
                </>
            )}
            </Stack>
        </Popover.Dropdown>
    </Popover>
}