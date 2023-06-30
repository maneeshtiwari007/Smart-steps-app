import { Component } from "react";
import { func, string, any, number } from 'prop-types';
import { Text, View } from "react-native";

export default class SuccessMessage extends Component<{}> {
    static propTypes = {
        subMessage: string,
        title: string,
        isDisabled: any,
        style: any,
       // hideAuto: false,
       // hideAfter: number
    };
    static defaultProps = {
        title: 'Message',
        subMessage: '',
        style: {},
       // hideAuto: false,
       // hideAfter: 3000
    };
    state = {
        isVisible: true
    };
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //if (this.props?.hideAuto) {
            setTimeout(() => {
                this.setState({ isVisible: false })
            }, 3000)
       // }
    }
    render() {
        return (
            <>
                {this.state.isVisible &&
                    <View style={{ width: '100%', height: 'auto', position: 'absolute', top: 20, alignItems: 'center', zIndex: 1 }}>
                        <View style={{ width: '80%', backgroundColor: '#8AFF8A', borderLeftColor: '#007500', borderLeftWidth: 8, padding: 10 }}>
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontSize: 20 }}>{this.props?.title}</Text>
                                <Text style={{ fontSize: 14 }}>{this.props?.subMessage}</Text>
                            </View>
                        </View>
                    </View>
                }
            </>
        )
    }
}