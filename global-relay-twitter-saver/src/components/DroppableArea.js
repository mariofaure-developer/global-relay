import { Droppable, Draggable } from 'react-beautiful-dnd';
import './DroppableArea.css';

export const DroppableArea = ({ items, getItemStyle, getListStyle, id, isDragDisabled = false, isDropDisabled = false }) => {

    return(
        <div className="TweetContainer">
            <Droppable isDropDisabled={isDropDisabled} droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {items.map((item, index) => (
                            <Draggable
                                isDragDisabled={isDragDisabled}
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        <span>
                                            <img alt="" width={50} className="ProfileImage" src={item.profilePic}></img>
                                        </span>
                                        <div className="TweetBlock">
                                            <div className="TweetDate">{item.date}</div>
                                            <div>
                                                <span className="TweetUser">{item.user}</span>
                                                <span className="TweetHandle">{item.handle}</span>
                                            </div>
                                            <div className="TweetText">{item.tweet}</div>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
} 