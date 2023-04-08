import React from 'react';
import { Navbar } from '@mantine/core';

import Filters from '@/components/board/Filters';

const DashboardSidebar = ({ opened }: { opened: boolean }) => {
	return (
		<Navbar hidden={!opened} p="sm" hiddenBreakpoint="sm" width={{ sm: 324 }}>
			<Navbar.Section grow mt="xs">
				<Filters />
			</Navbar.Section>
		</Navbar>
	);
};

export default DashboardSidebar;
