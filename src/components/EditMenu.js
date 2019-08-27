import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons'

export default class EditMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.selectedmenu[0].id,
            email: props.selectedmenu[0].email,
            title: props.selectedmenu[0].title,
            role: props.selectedmenu[0].role,
            team: props.selectedmenu[0].team,
            address: props.selectedmenu[0].address,
            file: props.selectedmenu[0].file,
            selectedmenu: props.selectedmenu
        }
    }
    

    handleChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handleChangeRole = (e) => {
        this.setState({
            role: e.target.value || null
        })
    }
    handleChangeTeam = (e) => {
        this.setState({
            team: e.target.value || null
        })
    }
    handleChangeAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }
    handleChangePhoto = (e) => {
        this.setState({
            file: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editMenu(this.state);
        this.setState({
            title: '',
            email: '',
            role: null,
            team: null,
            address: ''
        })
    }

    render() {
        return (
            <div className="container pt-3 pb-3 pl-5 pr-5">
                <i className="btn btn-corner m-2" onClick={() => this.props.handleCancelEdit(this.props.selectedmenu)}>
                    <FontAwesomeIcon className="btn-dark" icon={faTimes} style={{color:"#FFFFFF"}}/>
                </i>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row m-2">
                    <label className="">Profile Image</label>
                        <select className="custom-select" value={this.state.file} onChange={this.handleChangePhoto}>
                            <option>Please select a profile image</option>
                            <option>andy.png</option>
                            <option>donna.png</option>
                            <option>jack.png</option>
                            <option>mary.png</option>
                            <option>victoria.png</option>
                        </select>
                        <label className="mt-2">Name</label>
                        <input className="form-control" required placeholder="Enter name" type="text" value={this.state.title} onChange={this.handleChangeTitle}></input>
                        <label className="mt-2">Email Address</label>
                        <input className="form-control" required placeholder="Enter email" type="email" value={this.state.email} onChange={this.handleChangeEmail}></input>
                        <label className="mt-2">Role</label>
                        <select required className="custom-select" value={this.state.role || ''} onChange={this.handleChangeRole}>
                            <option value="">Please select a role</option>
                            <option value="Admin">Admin</option>
                            <option value="Employee">Employee</option>
                        </select>
                        <label className="mt-2">Team</label>
                        <select required className="custom-select" value={this.state.team || ''} onChange={this.handleChangeTeam}>
                            <option value="">Please select a team</option>
                            <option value="Creative">Creative</option>
                            <option value="Finance &amp; Admin">Finance &amp; Admin</option>
                            <option value="Management">Management</option>
                        </select>
                        <label className="mt-2">Address</label>
                        <input className="form-control" required placeholder="Enter address" type="text" value={this.state.address} onChange={this.handleChangeAddress}></input>
                    </div>
                    <div className="form-group row m-2">
                        <button type="submit" onChange={this.handleChange} className="btn block-lg btn-block btn-success rounded-6 col-12">UPDATE EMPLOYEE</button>
                    </div>
                </form>
            </div>
        )
    }
}


