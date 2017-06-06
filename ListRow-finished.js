import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const ANIMATION_DURATION = 250;
const ROW_HEIGHT = 70;

class ListRow extends Component {
  constructor(props) {
    super(props);

    this._animated = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this._animated, {
      toValue: 1,
      duration: ANIMATION_DURATION,
    }).start();
  }

  onRemove = () => {
    const { onRemove } = this.props;
    if (onRemove) {
      Animated.timing(this._animated, {
        toValue: 0,
        duration: ANIMATION_DURATION,
      }).start(() => onRemove());
    }
  };

  render() {
    const { name, picture, email } = this.props;

    const rowStyles = [
      styles.row,
      {
        height: this._animated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, ROW_HEIGHT],
          extrapolate: 'clamp',
        }),
      },
      { opacity: this._animated },
      {
        transform: [
          { scale: this._animated },
          {
            rotate: this._animated.interpolate({
              inputRange: [0, 1],
              outputRange: ['35deg', '0deg'],
              extrapolate: 'clamp',
            })
          }
        ],
      },
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
