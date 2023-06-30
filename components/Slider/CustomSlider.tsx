import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import CircularProgress from "../CircularProgress";
import Colors from "../../utilty/Colors";
import styles from "./styles";
import React, { useRef, useState } from "react";
import CustomPaging from "./CustomPaging";

const { width } = Dimensions.get("window");
export default function CustomSlider({ data }) {
    const carouselRef = useRef(null);
    const [slideIndex, setSlideIndex] = useState(0);


    const CarouselCardItem = ({ item, index }) => {
        return (
            <View style={[styles.container,{alignItems:'center'}]} key={index}>
                <View>
                    <CircularProgress
                        percent={80}
                        percentChild={20}
                        size={300}
                        ParamsParent={{ inactiveColor: Colors.CircularProgressCoinInActiveColor, activeColor: Colors.light_crystal_blue }}
                        ParamsChild={{ inactiveColor: Colors.CircularProgressStepsInActiveColor, activeColor: Colors.white, size: 245 }}
                    />
                </View>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: 20, marginBottom: 20 }}>
                        <View>
                            <Text>0.00 Km</Text>
                        </View>
                        <View>
                            <Text>0.00 coins</Text>
                        </View>
                        <View>
                            <Text>0 Cal</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    const settings = {
        onSnapToItem: (index) => setSlideIndex(index),
        sliderWidth: width,
        sliderHeight: width,
        itemWidth: width - 10,
        data: data,
        renderItem: CarouselCardItem,
        hasParallaxImages: true,
    };
    return (
        <View style={styles.container}>
            <Carousel
                    ref={carouselRef}
                    {...settings}
                />
            <CustomPaging data={data} activeSlide={slideIndex} />
        </View>
    )
}