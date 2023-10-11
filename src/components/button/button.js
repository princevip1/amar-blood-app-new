import React from 'react';
import { Button, Text } from 'native-base'
import { colors } from '../../theme/color';

const Cbutton = ({
    onPress,
    title,
    primary,
    secondary,
    white,
    ...props
}) => {
    return (
        <>
            {primary && <Button
                style={{
                    backgroundColor: colors.primary,
                    borderColor: colors.white,
                    borderWidth: 1,
                }}
                onPress={onPress}
                isLoading={props?.isLoading}
            >
                <Text
                    style={{
                        color: colors.white,
                        fontSize: 16,
                    }}
                >{title}</Text>
            </Button>
            }
            {secondary && <Button
                style={{
                    backgroundColor: "transparent",
                    borderColor: '#fff',
                    borderWidth: 1,
                }}
                onPress={onPress}
                isLoading={props?.isLoading}
            >
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 16,
                    }}
                >{title}</Text>
            </Button >}
            {white && <Button
                style={{
                    backgroundColor: colors.white,
                    borderColor: colors.primary,
                    borderWidth: 1,
                }}
                onPress={onPress}
                isLoading={props?.isLoading}
            >
                <Text
                    style={{
                        color: colors.primary,
                        fontSize: 16,
                    }}
                >{title}</Text>
            </Button >}
        </>
    );
};

export default Cbutton;