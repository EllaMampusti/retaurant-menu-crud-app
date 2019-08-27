import React from 'react'

const Menus = ({menus, showMenu})  => {

    // Ella  - Regroup array by category
    // TODO: Use reduce function
    function groupBy(arr, key) {
        var newArr = [],
            types = {},
            i, j, cur;
        for (i = 0, j = arr.length; i < j; i++) {
            cur = arr[i];
            if (!(cur[key] in types)) {
                types[cur[key]] = { role: cur[key], data: [] };
                newArr.push(types[cur[key]]);
            }
            types[cur[key]].data.push(cur);
        }
        return newArr;
    }

    let groupMenus = groupBy(menus,'role');

    // const categ = menus.reduce((item, curr) => {
    //     (item[curr[item.team]] = item[curr[item.team]] || []).push(curr);
    //     return item;
    //   }, {});

    const menuList = groupMenus.length ? (
        groupMenus.map((menu, i) => {
            return (
                <div key={i}>
                    <p className="text-left team-category">{menu.role}</p>
                    {
                        menu.data.map(item => {
                            return(
                                <div key={item.id}>
                                    <div className='shadow mb-4 bg-white rounded' key={item.id} onClick={() => showMenu(item.id)}>
                                        <div className="emp-card">
                                            <img alt="" src={"/img/" + item.file} className="float-left img-rounded" />
                                            <div className="emptext-card">
                                                <p className="card-title text-muted m-0">{item.title}</p>
                                                <p className="card-subtitle text-muted m-0">{item.role}</p>
                                                <p className="card-text m-0">{item.team}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                            
                        })
                    }
                    
                </div>
                    
            )
        } )
    ) : (
        <div className="shadow p-4 bg-white rounded">No employee with that name here.</div>
    )

    return (
        <div>
            {menuList}
        </div>
    )
}

export default Menus