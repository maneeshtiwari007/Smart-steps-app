import { Component, Key } from "react";
import MainLayout from "../../Layout/Index";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../utilty/Colors";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Theming from "../../utilty/styling/theming";
import CardComponent from "../../components/Common/CardComponent";
import { connect } from "react-redux";

class CustomerProductScreen extends Component<{}> {
    state = {
        selectedIndex: '',
        selectedIndeBuy: 0,
        productData: {},
        loader: false,
        selectedPrice: {},
        allCategory: []
    }
    constructor(props: {} | Readonly<{}>) {
        super(props);
    }
    handleSelectIndex(index) {
        this.setState({ selectedIndex: index });
    }
    handleSelectIndexBuy(index) {
        this.setState({ selectedIndeBuy: index });
    }
    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.getCustomerProduct();
        });
       this.getCustomerProduct();
    }
    getCustomerProduct(){
        this.setState({ loader: true });
        CommonApiRequest.customerProduct({}).then((response) => {
            if (response?.success) {
                this.setState({ selectedIndex: response?.data?.[0]?.category });
                response?.data?.forEach((entry) => {
                    if (!this.state.allCategory?.find(item => item.label === entry?.category)) {
                        this.state.allCategory.push({ label: entry?.category, value: entry?.category });
                        this.setState({ allCategory: this.state.allCategory });
                    }
                });
                this.setState({ productData: response?.data })
                this.setState({ loader: false });
            } else {
                this.setState({ productData: [] })
            }
        });
    }
    setSelected(ele) {
    }
    render() {
        return (
            <MainLayout loaderVisible={this.state.loader} scrollEnable={true}>
                <View style={{ justifyContent: 'center', marginBottom: 20, alignItems: 'center', width: '100%', borderRadius: 12, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    
                </View>
                <View style={{ height: '100%', flex: 1 }}>
                    <View style={[Theming.cardContainer,{height:'100%'}]}>
                        {this.state.productData?.[0] && this.state?.productData?.map((item: any, index: Key) => {
                            return (
                                <CardComponent key={index + '_ card'} item={item} navigation={this.props?.navigation} isBuyButton={false}></CardComponent>
                            );
                        })}
                        {!this.state.productData?.[0] &&
                            <View style={{ width:'100%',minHeight:500,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{ color:Colors.white,fontSize:20 }}>No Recod Found!</Text>
                            </View>
                        }

                    </View>
                </View>
            </MainLayout>
        );
    }
}

const mapStateToState = state => ({
    user: state.errors,
})
export default connect(mapStateToState, null)(CustomerProductScreen)