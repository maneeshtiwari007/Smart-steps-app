import { Component, ReactNode } from "react";
import { Text, View } from "react-native";
import { Constant } from "../../utilty/Constant";

export default class ServerErrorMessage extends Component<{}>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <View style={{ width: '100%', height: 500, flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: 'red', width: '100%', textAlign: 'center', marginTop: 20 }}>{Constant.SERVER_ERROR_MESSAGE}</Text>
            </View>
        );
    }
}