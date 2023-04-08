import {
    Avatar,
    Button,
    Center,
    CloseButton, createStyles,
    Divider,
    Popover,
    Stack,
    Text,
    TextInput,
    UnstyledButton
} from "@mantine/core";
import {useState} from "react";
import {IoLocation} from "react-icons/io5";
import CustomMap, {Position} from "@/components/map/CustomMap";

const useStyles = createStyles(theme => ({
    stack: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box'
    },
    close: {
        position: 'absolute',
        right: 14,
        top: 14,
    },
}));

export default function TargetAddLocation() {
    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const [currentPosition, setCurrentPosition] = useState<Position>();

    return (
        <Popover
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
                    leftIcon={<IoLocation />}
                    styles={{ inner: { justifyContent: 'flex-start' } }}
                    onClick={() => setOpened(o => !o)}
                >
                    Место
                </Button>
            </Popover.Target>
            <Popover.Dropdown
                p="xs"
                sx={theme => ({
                    background:
                        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                })}
            >
                <Center>
                    <Text>Место</Text>
                </Center>
                <CloseButton
                    className={classes.close}
                    onClick={() => setOpened(false)}
                />

                <Divider my={8} />
                <Stack className={classes.stack}>
                    <CustomMap
                        position={currentPosition}
                        setPosition={setCurrentPosition}
                    />
                </Stack>
            </Popover.Dropdown>
        </Popover>
    )
}