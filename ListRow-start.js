import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const ROW_HEIGHT = 70;

class ListRow extends Component {
  onRemove = () => {
    const { onRemove } = this.props;
    if (onRemove) {
      onRemove();
    }
  };

  render() {
    const { name, picture, email } = this.props;

    const rowStyles = [
      styles.row,
    ];

    return (
      <TouchableOpacity onPress={this.onRemove}>
        <Animated.View style={rowStyles}>
          <Image
            style={styles.image}
            source={{ uri: picture.thumbnail}}
          />
          <View>
            <Text style={styles.name}>{name.first} {name.last}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    height: ROW_HEIGHT,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  email: {
    fontSize: 14,
  },
});

export default ListRow;
