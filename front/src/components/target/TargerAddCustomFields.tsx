import {
    Button,
    Center,
    Checkbox,
    CloseButton,
    Divider,
    NumberInput,
    Popover,
    Select,
    Stack,
    Text,
    TextInput,
    UnstyledButton
} from "@mantine/core";
import {useState} from "react";
import {BsChevronCompactLeft} from "react-icons/bs";
import {FiLayers} from "react-icons/fi";
import {BiPlus} from "react-icons/bi";
import {IoAlbumsOutline} from "react-icons/io5";
import {createStyles} from "@mantine/styles";

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

const FieldButton = ({field, onClick}: { field: Field }) => {
    return (
        <Button
            onClick={onClick}
            variant="light"
            color="gray"
            leftIcon={<IoAlbumsOutline/>}
            rightIcon={<IoAlbumsOutline/>}
            styles={{inner: {justifyContent: 'flex-start'}}}
        >
            {field.name}
        </Button>
    )
}

type FieldType = 'text' | 'number' | 'checkbox' | 'select'

type Field = {
    id: number
    name: string | undefined,
    type: FieldType,
    value: any
}

const initialFields = [
    {
        id: 1,
        name: 'Поле1',
        type: "text",
        value: 'Значение поля1'
    }
] satisfies Field[]

type State = 'none' | 'editing' | 'creating'

const fieldTypes = [
    {
        value: 'checkbox',
        label: 'Галочка',
    },
    {
        value: 'select',
        label: 'Выпадающий список',
    },
    {
        value: 'text',
        label: 'Текст',
    },
    {
        value: 'number',
        label: 'Число',
    }
]

const values = {
    'text': (value, setValue) => <TextInput
        label='Введите значение'
        placeholder='Начните вводить здесь'
        value={value}
        onChange={event => setValue(event?.target?.value)}
    />,
    'number': (value, setValue) => <NumberInput
        label='Введите значение'
        placeholder='Начните вводить здесь'
        value={value}
        onChange={setValue}
    />,
    'checkbox': (value, setValue) => <Checkbox
        label='Выберите значение'
        checked={value}
        onChange={(event) => setValue(event.currentTarget.checked)}
    />
}

const defaultValues = {
    'text': '',
    'number': '',
    'checkbox': false
}

export default function TargetAddCustomFields() {
    const {classes} = useStyles()

    const [opened, setOpened] = useState<boolean>(false)
    const [state, setState] = useState<State>('none')
    const [currentEditableField, setCurrentEditableField] = useState<Field>()

    const [customFields, setCustomFields] = useState<Field[]>(initialFields)

    const onCreateField = (field) => {
        //TODO отправить поле на бэк
        setCustomFields(prev => [...prev, field])
    }

    const states = {
        'none': <>
            <Divider my={8}/>
            <Stack className={classes.members}>
                {customFields.map((field, index) => {
                        return (
                            <FieldButton field={field} key={field.name + index} onClick={
                                () => {
                                    setState('editing')
                                    setCurrentEditableField(field)
                                }
                            }/>
                        )
                    }
                )}
            </Stack>
            <Divider my={8}/>
            <Button
                leftIcon={<BiPlus/>}
                onClick={() => setState('creating')}
            >
                Добавить поле
            </Button>
        </>,
        'creating': <>
            <>
                <TextInput
                    value={currentEditableField?.name}
                    onChange={(e) => setCurrentEditableField( {
                        ...currentEditableField, name: e.currentTarget.value
                    } as Field)}
                    placeholder='Введите название поля'
                    label='Название поля'
                />
                <Select
                    value={currentEditableField?.type || null}
                    onChange={(e) => setCurrentEditableField( {
                        ...currentEditableField, type: e, value: defaultValues[e],
                    } as Field)}
                    data={fieldTypes}
                    placeholder='Выберите тип поля'
                    label='Тип поля'
                />
                {
                    values[currentEditableField?.type]?.(currentEditableField?.value, (value) => setCurrentEditableField(
                        {...currentEditableField, value} as Field
                    ))
                }
                <Button
                    leftIcon={<BiPlus/>}
                    onClick={() => {
                        setCustomFields(prev => [...prev, currentEditableField] as Field[])
                        setState('none')
                    }}
                >
                    Добавить поле
                </Button>
            </>
        </>,
        'editing': <>
            <TextInput
                value={currentEditableField?.name}
                onChange={(e) => setCurrentEditableField( {
                    ...currentEditableField, name: e.currentTarget.value
                } as Field)}
                placeholder='Введите название поля'
                label='Название поля'
            />
            <Select
                value={currentEditableField?.type || null}
                onChange={(e) => setCurrentEditableField( {
                   ...currentEditableField, type: e, value: defaultValues[e],
                } as Field)}
                data={fieldTypes}
                placeholder='Выберите тип поля'
                label='Тип поля'
            />
            {
                values[currentEditableField?.type]?.(currentEditableField?.value, (value) => setCurrentEditableField(
                    {...currentEditableField, value} as Field
                ))
            }
            <Button
                leftIcon={<BiPlus/>}
                onClick={() => {
                    // проходим по всем кастомным полям и ищем изменяемое
                    setCustomFields(fields => (fields.map(field => (
                        field.id === currentEditableField?.id ? {...field, ...currentEditableField} : field
                    ))))
                    setState('none')
                }}
            >
                Завершить изменения
            </Button>
        </>
    }

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
                    onClick={() => setState('none')}
                >
                    <BsChevronCompactLeft/>
                </UnstyledButton>
                <Center>
                    <Text>Поля пользователя</Text>
                </Center>
                <CloseButton
                    className={classes.close}
                    onClick={() => setOpened(false)}
                />
                {states[state]}
            </Stack>
        </Popover.Dropdown>
    </Popover>
}