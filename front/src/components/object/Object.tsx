import {
    Checkbox,
    Container,
    createStyles,
    Divider,
    FileInput,
    Paper,
    Select,
    Stack,
    TextInput,
    Title
} from "@mantine/core";
import {useState} from "react";
import CustomMap, {Position} from "@/components/map/Map";
import AreaInput from "@/components/common/input/AreaInput";

const useStyles = createStyles(theme => ({
    stack: {
        padding: '10px'
    }
}))

type ObjectProps = {
    id: string,
    data: any //TODO
}

const district = [
    {
        value: '1',
        label: 'Округ 1'
    }
]

const rayon = [
    {
        value: '1',
        label: 'Район 1'
    }
]

const types = [
    {
        value: '1',
        label: 'Дом'
    }
]

const status = [
    {
        value: '1',
        label: 'Под снос'
    }
]

const owners = [
    {
        value: '1',
        label: 'Иванов Иван Иванович'
    }
]

const MAX_FILES = 10

const Object = ({data, id, mapPosition} : ObjectProps) => {
    const { classes } = useStyles()
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [isAddressProvided, setIsAddressProvided] = useState<boolean>(false)
    const [currentPosition, setCurrentPosition] = useState<Position>(mapPosition)

    return (<Container>
        <Paper p="lg" withBorder miw={880}>
                <Title>
                    Объект {id}
                </Title>
                <Divider size='sm'/>
                <Stack spacing={10} className={classes.stack}>
                    <Select
                        placeholder='Округ'
                        searchable
                        data={district}
                        label='Округ'
                    />
                    <Select
                        placeholder='Район'
                        searchable
                        data={rayon}
                        label='Район'
                    />

                    <Select
                        label='Тип объекта'
                        placeholder='Выберите тип объекта'
                        data={types}
                    />
                    <TextInput
                        label='Состояние объекта'
                        placeholder='Выберите текущее состояние объекта'
                        disabled
                        data={status}
                    />
                    <AreaInput
                        label='Площадь объекта'
                    />
                    <Select
                        value={owners[0].value}
                        label='Собственник'
                        disabled
                        data={owners}
                    />
                    <Select
                        value={owners[0].value}
                        label='Фактический пользователь'
                        disabled
                        data={owners}
                    />
                    <Checkbox
                        label='Добавить адрес'
                        checked={isAddressProvided}
                        onChange={event => setIsAddressProvided(event.currentTarget.checked)}
                    />
                    {isAddressProvided &&
                            <CustomMap
                                position={currentPosition}
                                setPosition={setCurrentPosition}
                            />
                    }
                    <FileInput
                        label='Добавить вложения'
                        value={uploadedFiles}
                        onChange={setUploadedFiles}
                        placeholder={'Нажмите сюда, чтобы прикрепить файлы'}
                        multiple
                        accept={'image/png, image/jpg, video/mp4, video/avi'}
                    />
                </Stack>
        </Paper>
    </Container>)
}

export default Object