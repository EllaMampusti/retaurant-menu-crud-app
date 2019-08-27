import React, { Component } from 'react'

export default class AddMenu extends Component {
    state = {
        file: 'default.jpg', // Deafult photo if none is selected
        title: '',
        email: '',
        role: null,
        team: null,
        address: ''
    }

    handleChangePhoto = (e) => {
        this.setState({
            file: e.target.value
        })
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addMenu(this.state);
        this.setState({
            file: 'default.jpg',
            title: '',
            email:'',
            role: null,
            team: null,
            address: ''
        })
    }

    render() {
        return (
            <div className="shadow container bg-white rounded pt-3 pb-3 pl-5 pr-5">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row m-2">
                        <label className="">Profile Image</label>
                        <select className="custom-select" value={this.state.file} onChange={this.handleChangePhoto}>
                            <option value="default">Please select a profile image</option>
                            <option>andy.png</option>
                            <option>donna.png</option>
                            <option>jack.png</option>
                            <option>mary.png</option>
                            <option>victoria.png</option>
                        </select>
                        <label className="mt-2">Name</label>
                        <input className="form-control" required  placeholder="Enter name" type="text" value={this.state.title} onChange={this.handleChangeTitle}></input>
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
                        <input className="form-control" placeholder="Enter address" type="text" required value={this.state.address} onChange={this.handleChangeAddress}></input>
                    </div>
                    <div className="form-group row m-2">
                        <button type="submit" onChange={this.handleChange} className="btn block-lg btn-success col-12 rounded-6">ADD NEW EMPLOYEE</button>
                    </div>
                </form>
            </div>
        )
    }
}


