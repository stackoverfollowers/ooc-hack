import {ReactElement} from "react";
import DashboardLayout from "@/components/common/dashboard/DashboardLayout";
import {useRouter} from "next/router";
import {Container, Paper, Stack, Text} from "@mantine/core";
import Logo from "@/components/ui/Logo";
import {useGetObjectByIdQuery} from "@/redux/services/objects";


const ObjectPage = () => {

    const { query: { id }} = useRouter()
    const { data } = useGetObjectByIdQuery(id)

    return <Container>
        <Paper p="lg" withBorder miw={880}>
            <Stack align="center" spacing={0}>
                <Text size={28} fw={500} ta="center" mb={24}>
                    Объект {id}
                </Text>
                <Text size={16} fw={400} >
                    Данные объекта
                    {JSON.stringify(data)}
                </Text>
            </Stack>
        </Paper>
    </Container>
}

ObjectPage.getLayout = function getLayout(page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

ObjectPage.auth = true;

export default ObjectPage