export const addLayoutItem = (layoutItems) => {
    return [...layoutItems, {
        Icon: "",
        Path: "",
        Label: "Mon Label",
        Position: "Top",
        Action: ""
    }]
}

export const editLayoutItem = (layoutItems, payload) => {
    let success = false;
    return layoutItems.map(item => {
        const name = payload.name;
        if (item.Label === payload.label) {
            success = true;
            item[name] = payload.value;
            if (item.hasOwnProperty('MenuSubItems')) {
                item.MenuSubItems.forEach(subItem => {
                    subItem['Position'] = item['Position'];
                })
            }
        }
        if (success === false && item.hasOwnProperty('MenuSubItems')) {
            item.MenuSubItems.forEach(subItem => {
                if (subItem.Label === payload.label) {
                    subItem[name] = payload.value
                }
            })
        }
        return item;
    });
}

export const deleteLayoutItem = (layoutItems, itemToDelete) => {
    return layoutItems.filter(item => {
        if (item.Label === itemToDelete) {
            return false;
        }
        if (item.hasOwnProperty('MenuSubItems')) {
            item.MenuSubItems = item.MenuSubItems.filter(subItem => subItem.Label !== itemToDelete);
            return true;
        }
        return true;
    })
}

