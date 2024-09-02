import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface UserList {
  name: string;
  id: number;
}

interface UserDropdownProps {
  users: UserList[];
  selectedUser: UserList | undefined;
  onChange: (item: UserList) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ users, selectedUser, onChange }) => {
  return (
    <Dropdown
      style={[styles.dropdown]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      itemTextStyle={{ color: 'gray' }}
      data={users}
      maxHeight={300}
      labelField='name'
      valueField='id'
      placeholder='Select a user'
      value={selectedUser}
      onChange={onChange}
    />
  );
};

export default UserDropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'gray',
  },
});
