import React, { Component } from 'react';
import { TextField, Paper, Box } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { DroppableArea } from './components/DroppableArea';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { saveTweet, getTweets, searchTwitter } from './actions/TweetSaverActions';
import { connect } from 'react-redux';
import './App.css';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};


const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 8,
    margin: `0 0 0 0`,
    borderBottomStyle:'solid',
    borderBottomWidth:1,
    borderBottomColor:'grey',
    color: isDragging ? 'white' : '#221F1F',
    // change background colour if dragging
    background: isDragging ? '#221F1F' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#D9222E' : 'lightgrey',
    padding: 0,
    width: 350,
});

class App extends Component {
  constructor(props)
    {
        super(props);
        this.state = {
            searchTerm: ''
        }
    }

  componentDidMount(){
    //this.props.getTweets();
  }

  searchTwitter = () => {
    alert("this.props.searchTwitter('" + this.state.searchTerm + "');");
    //this.props.searchTwitter(this.state.searchTerm);
  }

  handleSearchTermChange = (e) => {
    this.setState({searchTerm: e.target.value});
 }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'tweets',
        droppable2: 'savedTweets'
    };

    getList = id => this.props[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId !== destination.droppableId) {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.props.saveTweet({
                tweets: result.droppable,
                savedTweets: result.droppable2
             });
        }
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Box width={800} margin={'auto'}>
                <Paper>
                  <div className="TweetSaver">
                  <div className="TweetSaverHeader">Tweet Saver</div>
                    <div className="TwitterSearchContainer">
                      <div className="TwitterSearchBlock">
                        <form onSubmit={this.searchTwitter}>
                          <div className="TwitterSearchInputContainer">
                            <TextField id="outlined-basic" value={this.state.searchTerm} onChange={this.handleSearchTermChange} color="secondary" label="Search Twitter" fullWidth size="small" variant="outlined" />
                          </div>
                          <div className="TwitterSearchButtonContainer">
                            <IconButton onClick={this.searchTwitter} aria-label="search">
                              <SearchIcon fontSize="small" />
                            </IconButton>
                          </div>
                        </form>
                      </div>
                      <DroppableArea
                        id="droppable"
                        isDropDisabled={true}
                        items={this.props.tweets}
                        getItemStyle={getItemStyle}
                        getListStyle={getListStyle}
                      ></DroppableArea>
                    </div>
                    <div className="SavedTweetContainer">
                      <div className="SavedTweetHeader">Saved Tweets</div>
                      <DroppableArea
                        id="droppable2"
                        isDragDisabled={true}
                        items={this.props.savedTweets}
                        getItemStyle={getItemStyle}
                        getListStyle={getListStyle}
                      ></DroppableArea>
                    </div>
                  </div>
                </Paper>
                <div style={{textAlign:'center',marginTop:20, fontSize:14}}>
                Wasn't sure how to connect/authentiate with Twitter api...<br/>
                (One way to get through authentication is with this library: https://www.npmjs.com/package/twit) <br/><br/>
                Code placeholders developed, ready to connect up!
                </div>
              </Box>
            </DragDropContext>
        );
    }
}


const mapStateToProps = ({ tweetSaver }) => {
  return {
    savedTweets: tweetSaver.savedTweets,
    tweets: tweetSaver.tweets
  }
}

export default connect(mapStateToProps, {
  saveTweet,
  getTweets,
  searchTwitter
})(App);

