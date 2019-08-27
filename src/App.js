import React, {Component} from 'react';
import './App.css';
import './components/Menus'
import Menus from './components/Menus';
import DisplayCard from './components/DisplayCard';
import { withRouter } from "react-router";


class App extends Component {
  // Ella  - Initialise dummy data
  constructor(props) {
    super(props);
    this.state = {
      menus: [
        { id: 1, email: 'jack@affinity.co.nz' , title: 'Jack Jackson', role:'Admin', team: "Management", address: 'College Hill, Freemans Bay, Auckland', file: 'jack.png' },
        { id: 2, email: 'mary@affinity.co.nz' , title: 'Mary Long', role:'Employee', team: "Management", address: 'College Hill, Auckland', file: 'mary.png' },
        { id: 3, email: 'donna@affinity.co.nz' , title: 'Donna Hicks', role:'Employee', team: "Finance & Admin", address: 'College Hill, Auckland', file: 'donna.png' }
      ],
      selectedmenu: [
        { id: 1, email: 'jack@affinity.co.nz' , title: 'Jack Jackson', role:'Admin', team: "Management", address: 'College Hill, Freemans Bay, Auckland', file: 'jack.png' },
      ],
      filteredMenus: [
        { id: 1, email: 'jack@affinity.co.nz' , title: 'Jack Jackson', role:'Admin', team: "Management", address: 'College Hill, Freemans Bay, Auckland', file: 'jack.png' },
        { id: 2, email: 'mary@affinity.co.nz' , title: 'Mary Long', role:'Employee', team: "Management", address: 'College Hill, Auckland', file: 'mary.png' },
        { id: 3, email: 'donna@affinity.co.nz' , title: 'Donna Hicks', role:'Employee', team: "Finance & Admin", address: 'College Hill, Auckland', file: 'donna.png' }
      ],
      searchKeyword: '',
      mode: 'detail',
      url: ''
    }
  }
  
    // Ella  - Display details of employee when clicked
  showMenu = (id) => {
    const selectedmenu = this.state.menus.filter(function(menu) {
      return menu.id === id;
    });
    let menu = [...selectedmenu]
    this.setState({
      mode: "detail",
      selectedmenu: menu, //Short notation of employees:employees
      url: 'http://localhost:3000/detail?id=' + id
    }, () => {
      // Ella push current URL to history
      // TODO: Route using params
      this.props.history.push(`/detail?id=${id}`)
    })
  }

  deleteMenu = (id) => {
    const menus = this.state.menus.filter(menus => {
      return menus.id !== id;
    });
    this.setState({
      menus, //Short notation of menus:menus
      filteredMenus: menus,
      mode: "add"
    })
  }

  editMenu = (menu) => {
    let updatedMenus = [...this.state.menus];
    let index = updatedMenus.findIndex(el => {
      return el.id === menu.id}
      );
    updatedMenus[index] = menu;                  
    this.setState({ 
      menus: updatedMenus,
      filteredMenus: updatedMenus,
      mode: "add"
     }); 
  }

  addMenu = (menu) => {
    // Generate random int id 0-10000
    menu.id = Math.floor(Math.random() * 10000);
    let menus = [...this.state.menus, menu];
    this.setState({
      menus, //Short notation of menus:menus
      filteredMenus: menus
    })
  }

  handleAddMode = () => {
    this.setState({
      mode: "add"
    })
  }

  handleEditMode = (id, menu) => {
    this.setState({
        mode: "edit",
        selectedmenu: menu
    })
}

  // Ella - filterList for searching
  filterList = (e) => {
    var keyword = e.target.value.toString().toLowerCase()
    var updatedList = this.state.menus;
    updatedList = updatedList.filter(function(item){
      return item.title.toString().toLowerCase().search(
       keyword ) !== -1;
    });
    this.setState({
      filteredMenus: updatedList,
      searchKeyword: keyword
    });
  }

  render() { 
    return (
      <div className="App container mt-2 pb-6">
        <div className="row pt-5 pb-5">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 ">
            <img alt="" src={"/img/affinityid-logo.svg"} className="center" />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <button onClick={() => this.handleAddMode()} className="btn block-lg btn-block btn-dark flex-row mt-3 rounded-6">CREATE NEW EMPLOYEE</button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            
            <input className="form-control mb-3 block-lg rounded-6" 
              type="text" 
              value={this.state.searchKeyword} 
              onChange={this.filterList}
              placeholder="Search:"></input>
            
            <Menus menus={this.state.filteredMenus} 
              deleteMenu={this.deleteMenu} 
              showMenu={this.showMenu}/>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <DisplayCard 
              mode={this.state.mode}
              addMenu={this.addMenu}
              editMenu={this.editMenu} 
              deleteMenu={this.deleteMenu} 
              selectedmenu={this.state.selectedmenu}
              handleEditMode={this.handleEditMode}
              url={this.props.history}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
