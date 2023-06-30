import React, { FC, ReactElement, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';

interface Props {
  label?: string;
  data?: Array<{ label: string; value: string }>;
  onSelect?: (item: { label: string; value: string }) => void;
  style?: any;
  containerstyle?: any,
  dropDownItemStyle?: any,
  value?
}

const Dropdown: FC<Props> = ({ label, data, onSelect, style = {}, containerstyle = {}, dropDownItemStyle = {},value=null }: Props) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState((value!==null)?value:undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    console.log(label);
    DropdownButton.current.measure((_fx: number, _fy: number, _w: number, h: number, _px: number, py: number) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = (item: any): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }: any): ReactElement<any, any> => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item.label}{(item?.alldata?.amount)?" - "+item?.alldata?.amount:''}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop, width: (dropDownItemStyle?.width) ? dropDownItemStyle?.width : 'auto', left: (dropDownItemStyle?.left) ? dropDownItemStyle?.left : 10 }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={[styles.button, containerstyle]}>
      <TouchableOpacity
        ref={DropdownButton}
        style={[styles.button, style]}
        onPress={() => toggleDropdown()}
      >
        {renderDropdown()}
        <Text style={styles.buttonText}>
          {(!!selected && selected.label) || label}
        </Text>
        <Icon style={styles.icon} type="font-awesome" name="chevron-down" size={13} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    zIndex: 1,
    position: 'relative'
  },
  buttonText: {
    
    textAlign: 'center',
    width:'90%'
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 'auto',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    left: '25%',
    top: 0,
    minWidth: 120
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default Dropdown;