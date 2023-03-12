import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';

const Loading: FC = () => {
    return (
        <ActivityIndicator style={{
            flex: 1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center", margin: 5
        }} color={'blue'} size="large" />
    );
};

export default Loading;