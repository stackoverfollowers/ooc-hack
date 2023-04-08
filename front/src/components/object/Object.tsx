import {
    Checkbox,
    Container,
    createStyles,
    Divider,
    FileInput,
    Grid,
    MultiSelect,
    Paper,
    Select,
    Stack,
    Text,
    Title
} from "@mantine/core";
import {useState} from "react"
import dynamic from "next/dynamic";

const DynamicMap = dynamic( ( ) => import('../map/Map'), {
    ssr: false
})

const useStyles = createStyles(theme => ({
    stack: {
        padding: '10px'
    }
}))

type ObjectProps = {
    id: string,
    data: any //TODO
}

const d = [
    {
        value: 'a',
        label: 'a'
    }
]

const MAX_FILES = 10

const Object = ({data, id} : ObjectProps) => {
    const { classes } = useStyles()
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [isAddressProvided, setIsAddressProvided] = useState<boolean>(false)

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
                        data={d}
                        label='Округ'
                    />
                    <Select
                        placeholder='Район'
                        searchable
                        data={d}
                        label='Район'
                    />
                    <Checkbox
                        label='Добавить адрес'
                        checked={isAddressProvided}
                        onChange={event => setIsAddressProvided(event.currentTarget.checked)}
                    />
                    {isAddressProvided && <Container>
                        <DynamicMap />
                    </Container>}
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