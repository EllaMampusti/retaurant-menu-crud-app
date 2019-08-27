import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes} from '@fortawesome/free-solid-svg-icons';
import EditMenu from './EditMenu';
import { withRouter } from "react-router";

class MenuDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
            edit: props.mode,
            currMenu: props.selectedmenu,
            url: props.url
        }
    }

    // TODO: Change implementation - componentWillReceiveProps is deprecated
    UNSAFE_componentWillReceiveProps({mode, selectedmenu}) {
        this.setState({
            edit: mode,
            currMenu: selectedmenu,
            url: 'http://localhost:3000/detail'+ selectedmenu.id
        })
      }

    showConfirmation = () => {
        this.setState({
            isHidden: false
        })
    }

    hideConfirmation = () => {
        this.setState({
            isHidden: true
        })
    }
    handleCancelEdit = (menu) => {
        this.setState({
            edit: "detail",
            currMenu: menu
        })
    }

    handleEdit = (id, menu) => {       
        this.setState({
            edit: "edit",
            currMenu: menu
        })
    }

    handleShare = () => {
        var link = window.location.href
        console.log(link)
        // Create dummy element to prepare for copy to clipboard
        var dummy = document.createElement("input");

        //Append to document
        document.body.appendChild(dummy);
        dummy.setAttribute("id", "dummy_id");

        // Assign link value
        document.getElementById("dummy_id").value=link;

        // Select value
        dummy.select();

        // Copy to clipboard
        document.execCommand('copy')

        // Remove element from document
        document.body.removeChild(dummy);
    }

    render() {
        const menuList = this.state.currMenu.length ? (
            this.state.currMenu.map((menu, index) => {
    
                const divClass = this.state.isHidden ? 
                ( "bg-danger rounded confirm-delete pt-2 rounded-6 display-none" )
                :
                ( "bg-danger rounded confirm-delete pt-2 align-middle rounded-6 display" )

                // TODO: Check Address is city is available
                var addresses = menu.address.split(',')
                const city = (addresses[addresses.length-1])
    
                return (
                    <div className="card-body" key={index}>
                    <img alt="" src={"/img/" + menu.file} className="avatar" width="104" height="104" />
                    <p className="card-title-lg mt-5 h4">{menu.title}</p>
                    <p className="card-text">{menu.email}</p>
                    <div className="mb-3 mt-3">
                        <div className="buttons-div">
                            <button className="btn m-2 fa-pen" onClick={() => this.handleEdit(menu.id, menu)}><FontAwesomeIcon icon={faPen}/></button>
                            <button className="btn fa-times m-2" onClick={() => this.showConfirmation()}><FontAwesomeIcon icon={faTimes}/></button>
                        </div>
                        <div className={divClass}>
                            <p className="float-left mt-1 ml-4">Are you sure?</p>
                            <div className="float-right">
                                <button className="btn" onClick={() => this.props.handleDelete(menu.id)}>YES</button>
                                <button className="btn" onClick={this.hideConfirmation}>NO</button>
                            </div>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-6">
                                <p className="text-muted text-left content-label"><strong>Role</strong></p>
                                    <p className="card-text text-left content-text"><span>{menu.role}</span></p>
                                </div>
                                <div className="col-6">
                                <p className="text-muted text-left content-label"><strong>Team</strong></p>
                                    <p className="card-text text-left content-text"><span>{menu.team}</span></p>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-6">
                                    <p className="text-muted text-left content-label"><strong>Address</strong></p>
                                    <p className="card-text text-left content-text"><span>{menu.address}</span></p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-left content-label"><strong>City</strong></p>
                                    <p className="card-text text-left content-text"><span>{city}</span></p>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="row">
                                <button className="btn block-lg btn-block btn-light rounded-6"
                                    onClick={this.handleShare}
                                    data-toggle="tooltip" 
                                    data-placement="left" 
                                    title="Click to copy deep link">
                                    SHARE
                                    </button>
                            </div>
                        </li>
                    </ul>
                    </div>
                )
            } )
        ) : (
            <div className="card-body">Nothing is selected.</div>
        )

        let card;
        switch(this.state.edit){
            case "detail": 
                card = menuList
            break;
            case "edit": 
                card =  <EditMenu 
                selectedmenu={this.props.selectedmenu} 
                handleCancelEdit={this.handleCancelEdit}
                editMenu={this.props.editMenu} />
            break;
            default: { card=<div></div>}

        }

        
        return (
            <div>
                <div className="shadow bg-white rounded mt-5">
                    {card}
                </div>
            </div>
        )
    }
}

export default withRouter(MenuDetail)
