import Head from "next/head";
import {ReactElement} from "react";
import DashboardLayout from "@/components/common/dashboard/DashboardLayout";
import {useRouter} from "next/router";
import {useGetObjectByIdQuery} from "@/redux/services/objects";
import Object from "@/components/object/Object";

const ObjectPage = () => {
    const { query: { id }} = useRouter()
    const { data } = useGetObjectByIdQuery(id)

    return <>
        <Head>
            <title>Объект {id}</title>
        </Head>
        <Object id={id} data={data}/>
    </>
}

ObjectPage.getLayout = function getLayout(page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

ObjectPage.auth = true;

export default ObjectPage