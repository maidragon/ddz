import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
const getItems = () => {
  return [
    // 大王
    { id: 1, value: 0x01, image: "./Atlas/LJoker.png" },
    // 小王
    { id: 2, value: 0x02, image: "./Atlas/SJoker.png" },

    // 梅花
    { id: 3, value: 0x13, image: "./Atlas/ClubThree.png" },
    { id: 4, value: 0x14, image: "./Atlas/ClubFour.png" },
    { id: 5, value: 0x15, image: "./Atlas/ClubFive.png" },
    { id: 6, value: 0x16, image: "./Atlas/ClubSix.png" },
    { id: 7, value: 0x17, image: "./Atlas/ClubSeven.png" },
    { id: 8, value: 0x18, image: "./Atlas/ClubEight.png" },
    { id: 9, value: 0x19, image: "./Atlas/ClubNine.png" },
    { id: 10, value: 0x1A, image: "./Atlas/ClubTen.png" },
    { id: 11, value: 0x1B, image: "./Atlas/ClubJack.png" },
    { id: 12, value: 0x1C, image: "./Atlas/ClubQueen.png" },
    { id: 13, value: 0x1D, image: "./Atlas/ClubKing.png" },
    { id: 14, value: 0x1E, image: "./Atlas/ClubOne.png" },
    { id: 15, value: 0x1F, image: "./Atlas/ClubTwo.png" },

    // 方片
    { id: 16, value: 0x23, image: "./Atlas/DiamondThree.png" },
    { id: 17, value: 0x24, image: "./Atlas/DiamondFour.png" },
    { id: 18, value: 0x25, image: "./Atlas/DiamondFive.png" },
    { id: 19, value: 0x26, image: "./Atlas/DiamondSix.png" },
    { id: 20, value: 0x27, image: "./Atlas/DiamondSeven.png" },
    { id: 21, value: 0x28, image: "./Atlas/DiamondEight.png" },
    { id: 22, value: 0x29, image: "./Atlas/DiamondNine.png" },
    { id: 23, value: 0x2A, image: "./Atlas/DiamondTen.png" },
    { id: 24, value: 0x2B, image: "./Atlas/DiamondJack.png" },
    { id: 25, value: 0x2C, image: "./Atlas/DiamondQueen.png" },
    { id: 26, value: 0x2D, image: "./Atlas/DiamondKing.png" },
    { id: 27, value: 0x2E, image: "./Atlas/DiamondOne.png" },
    { id: 28, value: 0x2F, image: "./Atlas/DiamondTwo.png" },

    // 红桃
    { id: 29, value: 0x33, image: "./Atlas/HeartThree.png" },
    { id: 30, value: 0x34, image: "./Atlas/HeartFour.png" },
    { id: 31, value: 0x35, image: "./Atlas/HeartFive.png" },
    { id: 32, value: 0x36, image: "./Atlas/HeartSix.png" },
    { id: 33, value: 0x37, image: "./Atlas/HeartSeven.png" },
    { id: 34, value: 0x38, image: "./Atlas/HeartEight.png" },
    { id: 35, value: 0x39, image: "./Atlas/HeartNine.png" },
    { id: 36, value: 0x3A, image: "./Atlas/HeartTen.png" },
    { id: 37, value: 0x3B, image: "./Atlas/HeartJack.png" },
    { id: 38, value: 0x3C, image: "./Atlas/HeartQueen.png" },
    { id: 39, value: 0x3D, image: "./Atlas/HeartKing.png" },
    { id: 40, value: 0x3E, image: "./Atlas/HeartOne.png" },
    { id: 41, value: 0x3F, image: "./Atlas/HeartTwo.png" },

    // 黑桃
    { id: 42, value: 0x43, image: "./Atlas/SpadeThree.png" },
    { id: 43, value: 0x44, image: "./Atlas/SpadeFour.png" },
    { id: 44, value: 0x45, image: "./Atlas/SpadeFive.png" },
    { id: 45, value: 0x46, image: "./Atlas/SpadeSix.png" },
    { id: 46, value: 0x47, image: "./Atlas/SpadeSeven.png" },
    { id: 47, value: 0x48, image: "./Atlas/SpadeEight.png" },
    { id: 48, value: 0x49, image: "./Atlas/SpadeNine.png" },
    { id: 49, value: 0x4A, image: "./Atlas/SpadeTen.png" },
    { id: 50, value: 0x4B, image: "./Atlas/SpadeJack.png" },
    { id: 51, value: 0x4C, image: "./Atlas/SpadeQueen.png" },
    { id: 52, value: 0x4D, image: "./Atlas/SpadeKing.png" },
    { id: 53, value: 0x4E, image: "./Atlas/SpadeOne.png" },
    { id: 54, value: 0x4F, image: "./Atlas/SpadeTwo.png" },
  ]
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  console.log('startIndex: ', startIndex);
  console.log('endIndex: ', endIndex);
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  // userSelect: 'none',
  // padding: grid * 2,
  marginLeft: `-40px`,

  // // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  flexWrap: 'warp',
  padding: grid,
  // overflow: 'auto',
});

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(32),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <img src={item.image} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}