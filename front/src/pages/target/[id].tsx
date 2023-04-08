import Head from 'next/head';
import { ReactElement } from 'react';
import DashboardLayout from '@/components/common/dashboard/DashboardLayout';
import { useRouter } from 'next/router';
import { useGetObjectByIdQuery } from '@/redux/services/objects';
import Object from '@/components/object/Object';
import { useGetTargetQuery } from '@/redux/services/target';
import TargetView from '@/components/target/TargetView';

const TargetPage = () => {
	const {
		query: { id },
	} = useRouter();
	const { data } = useGetTargetQuery(id as string, { skip: true });

	return (
		<>
			<Head>
				<title>Объект {id}</title>
			</Head>
			<TargetView />
		</>
	);
};

TargetPage.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

TargetPage.auth = true;

export default TargetPage;
