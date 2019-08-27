import React, { Component } from 'react'
import AddMenu from './AddMenu';
import MenuDetail from './MenuDetail';

class DisplayCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: props.mode,
            currMenu: props.selectedmenu
        }
    }
    
    // TODO: Change implementation - componentWillReceiveProps is deprecated
    UNSAFE_componentWillReceiveProps({mode, selectedmenu}) {
        this.setState({
            edit: mode,
            currMenu: selectedmenu
        })
      }

    handleDelete = (id) => {
        this.props.deleteMenu(id);
    }

    render() {
        var card
        switch(this.state.edit){
            case "detail": 
                card = <MenuDetail 
                selectedmenu={this.state.currMenu} 
                handleEditMode={this.props.handleEditMode}
                handleCancelEdit={this.handleCancelEdit}
                handleDelete={this.handleDelete}
                editMenu={this.props.editMenu}
                mode={this.state.edit}
                url={this.props.url}/>
            break;
            case "add": 
                card = <AddMenu addMenu={this.props.addMenu}/>
            break;
            default: { card=<div></div>}

        }

        return (
            <div>
               {card}
            </div>
        )
    }
}

export default DisplayCard
