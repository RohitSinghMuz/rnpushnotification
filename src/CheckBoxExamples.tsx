import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';

interface Item {
  id: number;
  label: string;
  isChecked: boolean;
}

const data: Item[] = [
  {id: 1, label: 'Item 1', isChecked: false},
  {id: 2, label: 'Item 2', isChecked: false},
  {id: 3, label: 'Item 3', isChecked: false},
  {id: 4, label: 'Item 4', isChecked: false},
];

const CheckBoxExamples: React.FC = () => {
  const [items, setItems] = useState<Item[]>(data);

  const toggleCheckBox = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].isChecked = !updatedItems[index].isChecked;
    setItems(updatedItems);
  };

  const selectAll = () => {
    const updatedItems = items.map(item => {
      return {...item, isChecked: true};
    });
    setItems(updatedItems);
  };

  const unselectAll = () => {
    const updatedItems = items.map(item => {
      return {...item, isChecked: false};
    });
    setItems(updatedItems);
  };

  return (
    <View>
      {items.map((item, index) => (
        <View
          key={item.id}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            checked={item.isChecked}
            onPress={() => toggleCheckBox(index)}
          />
          <Text>{item.label}</Text>
        </View>
      ))}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={selectAll}>
          <Text>Select All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={unselectAll}>
          <Text>Unselect All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckBoxExamples;
